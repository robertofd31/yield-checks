#!/usr/bin/env node
// Share-price check for the DeFiLlama-sourced yield rows of pharos-watch.
//
// For every DeFiLlama pool id referenced by the Pharos yield config it
//   1. resolves the pool to an on-chain vault address (DeFiLlama's own pool key
//      first, the Pharos coin file second, never a guess),
//   2. checks that the address is an ERC-4626 vault (asset / convertToAssets),
//   3. measures the realized APY from the share price over 7 and 30 days, at
//      blocks located by timestamp and annualized on real elapsed seconds,
//   4. compares it with what DeFiLlama published for the same days,
//   5. classifies the pool and writes <out>/<name>.{md,json}.
//
// Read-only. No dependencies. No API key. Node 20+ (built-in fetch).
//
// Usage:
//   node share-price-check.mjs [path-to-pharos-watch] [--out <dir>] [--name <basename>]
//        [--only <id-or-key,...>]      limit the run to some config pools
//        [--pools <uuid,...>]          also check DeFiLlama pools that are not in the config
//        [--pair <uuid>=<chain>:<0xaddr>]  compare a pool with an explicit address (repeatable)
//        [--prefer <substring>]        put RPC urls containing the substring first
//        [--no-config]                 skip the config scan (use with --pools / --pair)
//
// Optional: PHAROS_API_KEY in the environment adds Pharos's published apy30d as
// an extra column (GET https://api.pharos.watch/api/yield-rankings). The script
// never needs it and never prints it.

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// ---------------------------------------------------------------- arguments
const argv = process.argv.slice(2);
const flag = (name) => {
  const out = [];
  for (let i = 0; i < argv.length; i++) if (argv[i] === name) out.push(argv[i + 1]);
  return out;
};
const VALUE_FLAGS = new Set(["--out", "--tag", "--name", "--only", "--pools", "--pair", "--prefer"]);
const positional = argv.filter((a, i) => !a.startsWith("--") && !VALUE_FLAGS.has(argv[i - 1]));
const repo = resolve(positional[0] ?? "../pharos-watch");
const outDir = resolve(flag("--out")[0] ?? "out");
const tag = flag("--tag")[0] ? `-${flag("--tag")[0]}` : "";
const baseName = flag("--name")[0] ?? `share-price-check${tag}`;
const only = new Set(flag("--only").flatMap((s) => s.split(",")).filter(Boolean));
const extraPools = flag("--pools").flatMap((s) => s.split(",")).filter(Boolean);
const pairs = flag("--pair").map((s) => {
  const m = s.match(/^([0-9a-f-]{36})=([a-z]+):(0x[0-9a-fA-F]{40})$/);
  if (!m) throw new Error(`bad --pair ${s}`);
  return { id: m[1], chain: m[2], address: m[3] };
});
const prefer = flag("--prefer")[0];
const noConfig = argv.includes("--no-config");

// ---------------------------------------------------------------- constants
const CONFIG_DIR = join(repo, "worker/src/lib/yield-config");
const COINS_DIR = join(repo, "shared/data/stablecoins/coins");
const UA = { "User-Agent": "share-price-check" };
const DAY = 86_400;
const YEAR = 365 * DAY;

// Thresholds. All in one place so a reader can argue with them.
const MATCH_ABS_PP = 0.15; // |published - realized| on 30d, percentage points
const MATCH_REL = 0.05; // and relative to realized
const STEADY_SD = 0.03; // daily realized/published ratio: max standard deviation
const STEADY_OFFSET = 0.02; // and its mean at least this far from 1
const STEADY_MIN_DAYS = 20;
const RATIO_MIN_PUBLISHED = 0.05; // pp; skip days where published is ~0 (ratio undefined)
const FEE_TOLERANCE = 0.005; // |ratio - (1 - fee)| to call it "equals 1 - fee"
const EDGE_SHIFT_DAYS = 3; // window-edge sensitivity test
const MIN_GRID_DAYS = 8;

// Keyless public RPCs. Every url is probed at start (chain id + archive state
// 31 days back); urls that fail the probe are not used. Chains whose every url
// fails are reported as "no archive RPC", never estimated.
const CHAINS = {
  ethereum: { id: 1, dl: ["Ethereum"], pharos: ["ethereum"], urls: ["https://eth-mainnet.public.blastapi.io", "https://eth.drpc.org", "https://mainnet.gateway.tenderly.co"] },
  base: { id: 8453, dl: ["Base"], pharos: ["base"], urls: ["https://base.drpc.org", "https://mainnet.base.org", "https://base-rpc.publicnode.com"] },
  arbitrum: { id: 42161, dl: ["Arbitrum"], pharos: ["arbitrum"], urls: ["https://arbitrum-one.public.blastapi.io", "https://arbitrum.gateway.tenderly.co"] },
  bsc: { id: 56, dl: ["BSC", "Binance"], pharos: ["bsc"], urls: ["https://bsc-mainnet.public.blastapi.io", "https://bsc.drpc.org"] },
  gnosis: { id: 100, dl: ["Gnosis", "xDai"], pharos: ["gnosis"], urls: ["https://rpc.gnosischain.com", "https://gnosis.gateway.tenderly.co", "https://gnosis.drpc.org"] },
  avalanche: { id: 43114, dl: ["Avalanche"], pharos: ["avalanche", "avax"], urls: ["https://api.avax.network/ext/bc/C/rpc", "https://avalanche.gateway.tenderly.co", "https://avalanche.drpc.org"] },
  plasma: { id: 9745, dl: ["Plasma"], pharos: ["plasma"], urls: ["https://rpc.plasma.to", "https://plasma.gateway.tenderly.co", "https://9745.rpc.thirdweb.com"] },
  robinhood: { id: 4663, dl: ["Robinhood Chain", "Robinhood"], pharos: ["robinhood"], urls: ["https://robinhood.drpc.org", "https://robinhood-rpc.publicnode.com"] },
  fraxtal: { id: 252, dl: ["Fraxtal"], pharos: ["fraxtal"], urls: ["https://rpc.frax.com", "https://fraxtal.drpc.org"] },
  sonic: { id: 146, dl: ["Sonic"], pharos: ["sonic"], urls: ["https://rpc.soniclabs.com", "https://sonic.drpc.org"] },
};
const NON_EVM = new Set(["Solana", "Polkadot", "Stellar", "Tron", "Aptos", "Sui", "Ton", "Near", "Cardano", "Starknet", "Bitcoin", "Hedera", "Cosmos", "Osmosis", "Injective"]);
const dlChainKey = (name) => Object.keys(CHAINS).find((k) => CHAINS[k].dl.some((n) => n.toLowerCase() === String(name).toLowerCase()));

// Function selectors (first 4 bytes of keccak256 of the signature).
const SEL = {
  decimals: "0x313ce567", // decimals()
  symbol: "0x95d89b41", // symbol()
  totalSupply: "0x18160ddd", // totalSupply()
  asset: "0x38d52e0f", // asset()                     ERC-4626
  convertToAssets: "0x07a2d13a", // convertToAssets(uint256)    ERC-4626
  fee: "0xddca3f43", // fee()                       MetaMorpho (Morpho Vault V1), WAD
  performanceFee: "0x87788782", // performanceFee()            Morpho Vault V2, WAD
  managementFee: "0xa6f7f5d6", // managementFee()             Morpho Vault V2, WAD per second
};

// Hand-verified overrides. Empty on purpose: every pool below is resolved from
// DeFiLlama's own pool key or from the Pharos coin file. Add an entry only with
// a comment saying how it was verified.
//   "<pool uuid>": { chain: "ethereum", address: "0x...", why: "..." }
const ADDRESS_OVERRIDES = {};

// Non-ERC-4626 share-price getters. Empty on purpose: a getter such as
// pricePerShare() or exchangeRate() is only usable once its meaning (units,
// what it is quoted in, whether fees are netted) has been confirmed for that
// contract, and no pool in the config needed one.
//   "<chain>:<address lowercase>": { selector: "0x...", decimals: 18, why: "..." }
const GETTER_OVERRIDES = {};

// ---------------------------------------------------------------- helpers
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const iso = (sec) => new Date(sec * 1000).toISOString().replace(".000Z", "Z");
const round = (x, d = 3) => (x == null || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);
const sd = (xs) => {
  if (xs.length < 2) return null;
  const m = mean(xs);
  return Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / (xs.length - 1));
};
const median = (xs) => {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};
const fmt = (x, d = 2) => (x == null || !Number.isFinite(x) ? "-" : x.toFixed(d));
const usd = (x) => (x == null ? "-" : x >= 1e9 ? `$${(x / 1e9).toFixed(2)}B` : x >= 1e6 ? `$${(x / 1e6).toFixed(1)}M` : `$${Math.round(x / 1e3)}k`);

async function getJson(url, init) {
  let last;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await fetch(url, { ...init, headers: { ...UA, ...(init?.headers ?? {}) }, signal: AbortSignal.timeout(60_000) });
      if (res.ok) return await res.json();
      last = new Error(`${res.status} ${url}`);
      if (res.status !== 429 && res.status < 500) throw last;
    } catch (error) {
      last = error;
      if (/^4\d\d /.test(error.message) && !error.message.startsWith("429")) throw error;
    }
    await sleep(3000 * (attempt + 1));
  }
  throw last;
}

// ---------------------------------------------------------------- JSON-RPC
class RevertError extends Error {}
class NoArchiveError extends Error {}
const ARCHIVE_MSG = /missing trie node|state .*not available|no state available|unknown state|archive requests|historical state|pruned|header not found|block not found/i;
const RATE_MSG = /rate limit|too many requests|429|exceeded/i;
const REVERT_MSG = /revert|invalid opcode|out of gas|invalid jump|stack underflow/i;

class Chain {
  constructor(key) {
    this.key = key;
    this.cfg = CHAINS[key];
    this.urls = [...this.cfg.urls];
    if (prefer) this.urls.sort((a, b) => Number(b.includes(prefer)) - Number(a.includes(prefer)));
    this.good = []; // urls that passed the probe
    this.rejected = []; // { url, reason }
    this.known = []; // sorted [{ n, t }] block timestamps seen so far
    this.lastCall = new Map();
    this.calls = 0;
  }

  async raw(url, method, params) {
    const wait = (this.lastCall.get(url) ?? 0) + (url.includes("drpc.org") ? 260 : 110) - Date.now();
    if (wait > 0) await sleep(wait);
    this.lastCall.set(url, Date.now());
    this.calls++;
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
      signal: AbortSignal.timeout(20_000),
    });
    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      throw new Error(`http ${res.status} ${text.slice(0, 80)}`);
    }
    if (json.error) {
      const msg = typeof json.error === "string" ? json.error : `${json.error.code ?? ""} ${json.error.message ?? JSON.stringify(json.error)}`;
      if (json.error.code === 3 || (REVERT_MSG.test(msg) && !ARCHIVE_MSG.test(msg))) throw new RevertError(msg);
      throw new Error(msg);
    }
    return json.result;
  }

  // Call with retry and rotation. `urls` narrows the pool (used by the cross-check).
  async call(method, params, urls = this.good) {
    if (!urls.length) throw new NoArchiveError(`no usable RPC for ${this.key}`);
    let last;
    let archiveFails = 0;
    for (let attempt = 0; attempt < Math.max(8, 3 * urls.length + 2); attempt++) {
      const url = urls[(this.rr = ((this.rr ?? -1) + 1)) % urls.length];
      try {
        return await this.raw(url, method, params);
      } catch (error) {
        if (error instanceof RevertError) throw error;
        last = error;
        if (ARCHIVE_MSG.test(error.message)) archiveFails++;
        // Public endpoints rate-limit: back off for real instead of hammering.
        await sleep(RATE_MSG.test(error.message) ? 4000 * (attempt + 1) : 400 * (attempt + 1));
      }
    }
    if (archiveFails >= urls.length) throw new NoArchiveError(last.message);
    throw last;
  }

  async init(nowSec) {
    for (const url of this.urls) {
      try {
        const id = parseInt(await this.raw(url, "eth_chainId", []), 16);
        if (id !== this.cfg.id) throw new Error(`chain id ${id}, expected ${this.cfg.id}`);
        const head = await this.raw(url, "eth_getBlockByNumber", ["latest", false]);
        this.note(parseInt(head.number, 16), parseInt(head.timestamp, 16));
        this.good.push(url);
      } catch (error) {
        this.rejected.push({ url, reason: `probe failed: ${error.message.slice(0, 120)}` });
      }
    }
    if (!this.good.length) return;
    // Archive probe: state 31 days back must be readable on each url.
    const probeBlock = await this.blockAt(nowSec - 31 * DAY);
    const keep = [];
    for (const url of this.good) {
      let ok = false;
      let reason = "";
      for (let attempt = 0; attempt < 3 && !ok; attempt++) {
        try {
          await this.raw(url, "eth_getBalance", ["0x000000000000000000000000000000000000dEaD", "0x" + probeBlock.n.toString(16)]);
          ok = true;
        } catch (error) {
          reason = error.message.slice(0, 120);
          await sleep(800);
        }
      }
      if (ok) keep.push(url);
      else this.rejected.push({ url, reason: `no archive state at block ${probeBlock.n} (${iso(probeBlock.t)}): ${reason}` });
    }
    this.good = keep;
  }

  note(n, t) {
    let lo = 0;
    let hi = this.known.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.known[mid].n < n) lo = mid + 1;
      else hi = mid;
    }
    if (this.known[lo]?.n !== n) this.known.splice(lo, 0, { n, t });
  }

  async stamp(n, urls) {
    if (!urls) {
      const hit = this.known.find((k) => k.n === n);
      if (hit) return hit.t;
    }
    const block = await this.call("eth_getBlockByNumber", ["0x" + n.toString(16), false], urls);
    if (!block) throw new Error(`block ${n} not returned`);
    const t = parseInt(block.timestamp, 16);
    if (!urls) this.note(n, t);
    return t;
  }

  // Last block whose timestamp is <= ts. Search by timestamp only: block times
  // are not assumed constant (Base changed its block time on 2026-11-05).
  async blockAt(ts) {
    const head = this.known.at(-1);
    if (ts >= head.t) return head;
    // Bracket: lo.t <= ts < hi.t
    let hi = this.known.find((k) => k.t > ts);
    let lo = [...this.known].reverse().find((k) => k.t <= ts);
    let step = 50_000;
    while (!lo) {
      const n = Math.max(1, this.known[0].n - step);
      const t = await this.stamp(n);
      if (t <= ts) lo = { n, t };
      else {
        hi = { n, t };
        if (n === 1) throw new Error("timestamp before chain start");
        step *= 4;
      }
    }
    let useInterp = true;
    while (hi.n - lo.n > 1) {
      let mid;
      if (useInterp && hi.t > lo.t) {
        mid = lo.n + Math.floor(((ts - lo.t) / (hi.t - lo.t)) * (hi.n - lo.n));
        mid = Math.min(hi.n - 1, Math.max(lo.n + 1, mid));
      } else mid = (lo.n + hi.n) >> 1;
      useInterp = !useInterp; // alternate interpolation and bisection: fast and bounded
      const t = await this.stamp(mid);
      if (t <= ts) lo = { n: mid, t };
      else hi = { n: mid, t };
    }
    return lo;
  }

  async ethCall(to, data, blockN, urls) {
    return this.call("eth_call", [{ to, data }, blockN == null ? "latest" : "0x" + blockN.toString(16)], urls);
  }
}

const chains = new Map();
const nowSec = Math.floor(Date.now() / 1000);
async function getChain(key) {
  if (!chains.has(key)) {
    const chain = new Chain(key);
    chains.set(key, chain.init(nowSec).then(() => chain));
  }
  return chains.get(key);
}

const word = (hex, i = 0) => (hex && hex.length >= 2 + 64 * (i + 1) ? BigInt("0x" + hex.slice(2 + 64 * i, 2 + 64 * (i + 1))) : null);
const uintArg = (x) => x.toString(16).padStart(64, "0");
async function tryCall(chain, to, data, blockN, urls) {
  try {
    const out = await chain.ethCall(to, data, blockN, urls);
    return out && out !== "0x" ? out : null;
  } catch (error) {
    if (error instanceof RevertError) return null;
    throw error;
  }
}
function decodeString(hex) {
  if (!hex) return null;
  try {
    const bytes = Buffer.from(hex.slice(2), "hex");
    if (bytes.length === 32) return bytes.toString("utf8").replace(/\0+$/, "");
    const len = Number(BigInt("0x" + bytes.subarray(32, 64).toString("hex")));
    return bytes.subarray(64, 64 + len).toString("utf8");
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------- 1. config scan
const UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g;
const ROLE_BY_FILE = {
  "yield-config-pools.ts": "pinned",
  "yield-config-explicit-pools.ts": "explicit",
  "yield-config-weighted-pools.ts": "weighted",
  "yield-history-identity-transitions.ts": "history-handoff",
  "yield-opportunity-exclusions.ts": "exclusion",
};
const pins = new Map(); // uuid -> { roles:Set, keys:Set, files:Set, liveCode:boolean }
if (!noConfig) {
  if (!existsSync(CONFIG_DIR)) throw new Error(`no yield config at ${CONFIG_DIR}`);
  for (const file of readdirSync(CONFIG_DIR).filter((f) => f.endsWith(".ts"))) {
    let lastKey = null;
    for (const line of readFileSync(join(CONFIG_DIR, file), "utf8").split("\n")) {
      const isComment = /^\s*(\/\/|\*|\/\*)/.test(line);
      const keyHere = !isComment && line.match(/^\s*"([a-z0-9-]+)"\s*:/);
      if (keyHere) lastKey = keyHere[1];
      for (const m of line.matchAll(UUID)) {
        const entry = pins.get(m[0]) ?? { roles: new Set(), keys: new Set(), files: new Set(), liveCode: false };
        entry.files.add(file);
        if (isComment) entry.roles.add("comment-only");
        else {
          entry.liveCode = true;
          entry.roles.add(ROLE_BY_FILE[file] ?? "other");
          if (keyHere) entry.keys.add(keyHere[1]);
          else if (file === "yield-config-explicit-pools.ts" && lastKey) entry.keys.add(lastKey);
        }
        pins.set(m[0], entry);
      }
    }
  }
  for (const entry of pins.values()) if (entry.liveCode) entry.roles.delete("comment-only");
}
for (const id of extraPools) if (!pins.has(id)) pins.set(id, { roles: new Set(["extra"]), keys: new Set(), files: new Set(), liveCode: true });
for (const p of pairs) {
  const entry = pins.get(`pair:${p.id}:${p.address}`) ?? { roles: new Set(["pair"]), keys: new Set(), files: new Set(), liveCode: true, pair: p };
  pins.set(`pair:${p.id}:${p.address}`, entry);
}
console.error(`${pins.size} pool ids to check (${noConfig ? "config scan skipped" : CONFIG_DIR})`);

const repoCommit = (() => {
  try {
    const gitPath = join(repo, ".git");
    let head = readFileSync(gitPath, "utf8").trim();
    let dir = gitPath;
    if (head.startsWith("gitdir:")) {
      dir = head.slice(7).trim();
      head = readFileSync(join(dir, "HEAD"), "utf8").trim();
    }
    return head.startsWith("ref:") ? readFileSync(join(dir, head.slice(5)), "utf8").trim() : head;
  } catch {
    try {
      return readFileSync(join(repo, ".git/HEAD"), "utf8").trim();
    } catch {
      return null;
    }
  }
})();

function pharosContracts(key) {
  try {
    const coin = JSON.parse(readFileSync(join(COINS_DIR, `${key}.json`), "utf8"));
    return (coin.contracts ?? []).map((c) => ({ chain: String(c.chain).toLowerCase(), address: c.address }));
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------- optional Pharos column
const pharos = { used: false, note: "", rows: new Map() };
{
  const key = process.env.PHAROS_API_KEY;
  try {
    const res = await fetch("https://api.pharos.watch/api/yield-rankings", { headers: { ...UA, ...(key ? { "X-API-Key": key } : {}) }, signal: AbortSignal.timeout(30_000) });
    if (res.ok) {
      const body = await res.json();
      const walk = (node) => {
        if (Array.isArray(node)) node.forEach(walk);
        else if (node && typeof node === "object") {
          if (typeof node.id === "string" && typeof node.apy30d === "number") pharos.rows.set(node.id, { apy30d: node.apy30d, currentApy: node.currentApy ?? null, dataSource: node.dataSource ?? null, sourceKey: node.sourceKey ?? null });
          Object.values(node).forEach(walk);
        }
      };
      walk(body);
      pharos.used = true;
      pharos.note = `GET /api/yield-rankings returned ${pharos.rows.size} rows ${key ? "with the key from PHAROS_API_KEY" : "without a key"}.`;
    } else {
      pharos.note = `GET https://api.pharos.watch/api/yield-rankings ${key ? "with PHAROS_API_KEY" : "without a key"} returned HTTP ${res.status}; the Pharos apy30d column is left out.`;
    }
  } catch (error) {
    pharos.note = `Pharos API not reachable (${error.message}); the Pharos apy30d column is left out.`;
  }
  console.error(pharos.note);
}

// ---------------------------------------------------------------- 2. resolve + probe
async function probeVault(chain, address) {
  const [decHex, assetHex, supplyHex, symHex] = await Promise.all([
    tryCall(chain, address, SEL.decimals),
    tryCall(chain, address, SEL.asset),
    tryCall(chain, address, SEL.totalSupply),
    tryCall(chain, address, SEL.symbol),
  ]);
  const out = { address, symbol: decodeString(symHex), decimals: decHex ? Number(word(decHex)) : null, asset: null, isErc4626: false, reason: "" };
  if (out.decimals == null || out.decimals > 36) {
    out.reason = "no decimals(): not a token contract";
    return out;
  }
  const assetWord = assetHex ? word(assetHex) : null;
  if (assetWord == null || assetWord === 0n || assetWord >> 160n !== 0n) {
    out.reason = "asset() reverts or is empty: not an ERC-4626 vault";
    return out;
  }
  out.asset = "0x" + assetWord.toString(16).padStart(40, "0");
  if (!supplyHex || word(supplyHex) === 0n) {
    out.reason = "totalSupply() is zero or missing";
    return out;
  }
  out.shares = 10n ** BigInt(out.decimals + 12);
  let price = await tryCall(chain, address, SEL.convertToAssets + uintArg(out.shares));
  if (!price) {
    out.shares = 10n ** BigInt(out.decimals);
    price = await tryCall(chain, address, SEL.convertToAssets + uintArg(out.shares));
  }
  if (!price || word(price) === 0n) {
    out.reason = "convertToAssets() reverts or returns zero";
    return out;
  }
  const assetDec = await tryCall(chain, out.asset, SEL.decimals);
  out.assetDecimals = assetDec ? Number(word(assetDec)) : null;
  out.assetSymbol = decodeString(await tryCall(chain, out.asset, SEL.symbol));
  out.isErc4626 = true;
  return out;
}

async function readFees(chain, address, blockN) {
  const fees = {};
  for (const name of ["fee", "performanceFee", "managementFee"]) {
    const hex = await tryCall(chain, address, SEL[name], blockN);
    if (hex && hex.length === 66) fees[name] = word(hex).toString();
  }
  return fees;
}
// Only a WAD-scaled value is turned into a fraction. Anything else stays raw.
const wadFraction = (raw) => {
  if (raw == null) return null;
  const v = BigInt(raw);
  if (v === 0n) return 0;
  return v >= 10n ** 12n && v <= 10n ** 18n ? Number(v) / 1e18 : null;
};

async function morphoInfo(chainId, address, version) {
  const q =
    version === "v2"
      ? `{ v: vaultV2ByAddress(address:"${address}", chainId:${chainId}){ name symbol listed totalAssetsUsd performanceFee managementFee apy netApy netApyDay: avgNetApy(lookback: ONE_DAY) baseApyDay: avgNetApyExcludingRewards(lookback: ONE_DAY) adapters{items{type}} } }`
      : `{ v: vaultByAddress(address:"${address}", chainId:${chainId}){ name symbol listed state{ fee apy netApy totalAssetsUsd netApyDay: avgNetApy(lookback: ONE_DAY) baseApyDay: avgNetApyExcludingRewards(lookback: ONE_DAY) } } }`;
  try {
    const body = await getJson("https://api.morpho.org/graphql", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query: q }) });
    const v = body.data?.v;
    if (!v) return { error: JSON.stringify(body.errors ?? "not found").slice(0, 200) };
    const s = version === "v2" ? v : v.state;
    const pct = (x) => (x == null ? null : round(x * 100, 4));
    return {
      version,
      name: v.name,
      symbol: v.symbol,
      listed: v.listed,
      totalAssetsUsd: Math.round(s.totalAssetsUsd ?? 0),
      fee: version === "v2" ? null : s.fee,
      performanceFee: version === "v2" ? v.performanceFee : null,
      managementFee: version === "v2" ? v.managementFee : null,
      apyPct: pct(s.apy),
      netApyPct: pct(s.netApy),
      avgNetApy1dPct: pct(s.netApyDay),
      avgNetApyExclRewards1dPct: pct(s.baseApyDay),
      adapterTypes: version === "v2" ? [...new Set((v.adapters?.items ?? []).map((a) => a.type))] : undefined,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    return { error: error.message.slice(0, 200) };
  }
}

// ---------------------------------------------------------------- 3-5. measure, compare, classify
const annualized = (p0, p1, seconds) => {
  if (p0 <= 0n || seconds <= 0) return null;
  const ratio = Number((p1 * 10n ** 18n) / p0) / 1e18;
  return (Math.pow(ratio, YEAR / seconds) - 1) * 100;
};

async function checkPool(uuid, pin) {
  const id = pin.pair ? pin.pair.id : uuid;
  const row = {
    pool: id,
    roles: [...pin.roles],
    pinnedAs: [...pin.keys],
    configFiles: [...pin.files],
    class: null,
    reason: "",
    notes: [],
    urls: { defillama: `https://defillama.com/yields/pool/${id}`, chart: `https://yields.llama.fi/chart/${id}`, enriched: `https://yields.llama.fi/poolsEnriched?pool=${id}` },
  };
  const done = (cls, reason) => {
    row.class = cls;
    row.reason = reason;
    return row;
  };

  // DeFiLlama metadata. /poolsEnriched carries `pool_old`, the adapter's own pool
  // key, which for most adapters embeds the contract address.
  let dl;
  try {
    dl = (await getJson(row.urls.enriched)).data?.[0];
  } catch (error) {
    return done("unresolved", `DeFiLlama /poolsEnriched failed: ${error.message}`);
  }
  if (!dl) {
    if (pin.roles.has("comment-only")) return done("unresolved", "id appears only in a config comment and DeFiLlama no longer serves it");
    return done("unresolved", "DeFiLlama /poolsEnriched returns no row for this id (pool delisted or no longer updated)");
  }
  Object.assign(row, {
    project: dl.project,
    chain: dl.chain,
    symbol: dl.symbol,
    tvlUsd: Math.round(dl.tvlUsd ?? 0),
    dlNow: { apy: dl.apy, apyBase: dl.apyBase, apyReward: dl.apyReward, apyMean30d: dl.apyMean30d, timestamp: dl.timestamp },
    dlPoolKey: dl.pool_old ?? null,
    dlUrl: dl.url ?? null,
    underlyingTokens: dl.underlyingTokens ?? [],
  });
  if (pharos.used) row.pharos = row.pinnedAs.map((k) => ({ id: k, ...(pharos.rows.get(k) ?? { missing: true }) }));
  if (pin.roles.size === 1 && pin.roles.has("comment-only")) row.notes.push("Referenced only in a config comment; not a live source.");
  if (pin.roles.has("exclusion")) row.notes.push("Listed in the Pharos exclusion config; not a published source.");

  if (NON_EVM.has(dl.chain)) return done("not-checkable", `non-EVM chain (${dl.chain}): no eth_call share price`);
  const chainKey = pin.pair ? pin.pair.chain : dlChainKey(dl.chain);
  if (!chainKey || !CHAINS[chainKey]) return done("not-checkable", `chain "${dl.chain}" has no RPC configured in this script`);

  // Candidate addresses, in order of trust.
  const candidates = [];
  const poolKey = String(dl.pool_old ?? "");
  const addrInKey = [...poolKey.matchAll(/0x[0-9a-fA-F]+/g)].map((m) => m[0]);
  if (pin.pair) candidates.push({ address: pin.pair.address, source: "--pair argument (explicit address given on the command line)" });
  else if (ADDRESS_OVERRIDES[id]) candidates.push({ address: ADDRESS_OVERRIDES[id].address, source: `override: ${ADDRESS_OVERRIDES[id].why}` });
  else {
    if (/^morpho-blue-0x[0-9a-fA-F]{64}/.test(poolKey)) return done("not-checkable", "Morpho Market V1 pool (market id, collateral side): a lending market has no share token");
    for (const a of addrInKey) if (a.length === 42) candidates.push({ address: a, source: `DeFiLlama pool key "${poolKey}"` });
    const urlAddr = String(dl.url ?? "").match(/0x[0-9a-fA-F]{40}(?![0-9a-fA-F])/);
    if (urlAddr && !candidates.some((c) => c.address.toLowerCase() === urlAddr[0].toLowerCase())) candidates.push({ address: urlAddr[0], source: `DeFiLlama pool url ${dl.url}` });
    for (const key of pin.keys)
      for (const c of pharosContracts(key))
        if (CHAINS[chainKey].pharos.includes(c.chain) && /^0x[0-9a-fA-F]{40}$/.test(c.address) && !candidates.some((x) => x.address.toLowerCase() === c.address.toLowerCase()))
          candidates.push({ address: c.address, source: `Pharos coin file shared/data/stablecoins/coins/${key}.json`, fromPharos: true });
  }
  if (!candidates.length) return done("unresolved", `no EVM address in the DeFiLlama pool key "${poolKey}", its url, or the Pharos coin file`);

  const chain = await getChain(chainKey);
  row.rpc = { chain: chainKey, chainId: CHAINS[chainKey].id, used: chain.good, rejected: chain.rejected };
  if (!chain.good.length) return done("not-checkable", `no archive RPC for ${chainKey}: ${chain.rejected.map((r) => `${r.url} (${r.reason})`).join("; ")}`);

  const underlying = new Set((dl.underlyingTokens ?? []).map((a) => String(a).toLowerCase()));
  let vault = null;
  row.candidates = [];
  for (const c of candidates) {
    let probe;
    try {
      probe = await probeVault(chain, c.address);
    } catch (error) {
      row.candidates.push({ ...c, error: error.message.slice(0, 160) });
      continue;
    }
    const assetInDl = probe.asset ? underlying.has(probe.asset.toLowerCase()) : false;
    row.candidates.push({ ...c, symbol: probe.symbol, isErc4626: probe.isErc4626, asset: probe.asset, assetSymbol: probe.assetSymbol, assetInDlUnderlying: assetInDl, reason: probe.reason });
    if (!probe.isErc4626) continue;
    // An address that only comes from the Pharos coin file must be tied back to
    // the DeFiLlama pool, otherwise it could be a different instrument.
    if (c.fromPharos && !assetInDl) {
      row.candidates.at(-1).reason = "ERC-4626, but its asset() is not in the pool's DeFiLlama underlyingTokens: not accepted";
      continue;
    }
    vault = { ...probe, source: c.source, assetInDlUnderlying: assetInDl };
    break;
  }
  if (!vault) {
    const why = row.candidates.map((c) => `${c.address}: ${c.error ?? c.reason}`).join("; ");
    // GETTER_OVERRIDES is empty; a confirmed getter would be wired in here.
    return done("not-checkable", `no ERC-4626 share price at the resolved address (${why})`);
  }
  row.vault = { address: vault.address, symbol: vault.symbol, decimals: vault.decimals, asset: vault.asset, assetSymbol: vault.assetSymbol, assetDecimals: vault.assetDecimals, resolvedFrom: vault.source, method: `convertToAssets(${vault.shares})`, assetInDlUnderlying: vault.assetInDlUnderlying };
  const keyAddr = addrInKey.find((a) => a.length === 42);
  if (!pin.pair && keyAddr && keyAddr.toLowerCase() !== vault.address.toLowerCase()) {
    const other = row.candidates.find((c) => c.address.toLowerCase() === keyAddr.toLowerCase());
    row.identityWarning = `The share price is read from ${vault.address} (${vault.symbol}), taken from the ${vault.source}. DeFiLlama's own pool key names a different contract, ${keyAddr} (${other?.symbol ?? "no symbol"}), which is not an ERC-4626 vault. A gap on this row may mean the pinned pool describes a different instrument than the tracked token.`;
    row.notes.push(row.identityWarning);
  }
  if (pin.pair && keyAddr && keyAddr.toLowerCase() !== vault.address.toLowerCase())
    row.notes.push(`--pair run: the address was given by hand and is not the contract in DeFiLlama's pool key (${keyAddr}). Any gap on this row describes the pairing, not the pool.`);
  if (!vault.assetInDlUnderlying) row.notes.push(`asset() ${vault.asset} (${vault.assetSymbol}) is not in DeFiLlama's underlyingTokens ${JSON.stringify(dl.underlyingTokens)}; the address comes from DeFiLlama's own pool key, so it is kept.`);
  const sym = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if (vault.symbol && sym(vault.symbol) !== sym(dl.symbol)) row.notes.push(`On-chain symbol "${vault.symbol}" differs from the DeFiLlama symbol "${dl.symbol}" (DeFiLlama often labels a vault by its deposit asset).`);

  // DeFiLlama daily series.
  let chart;
  try {
    chart = (await getJson(row.urls.chart)).data ?? [];
  } catch (error) {
    return done("unresolved", `DeFiLlama chart failed: ${error.message}`);
  }
  const points = chart
    .map((p) => ({ t: Math.floor(Date.parse(p.timestamp) / 1000), apy: p.apy, apyBase: p.apyBase, apyReward: p.apyReward }))
    .filter((p) => Number.isFinite(p.t))
    .sort((a, b) => a.t - b.t);
  if (!points.length) return done("not-checkable", "DeFiLlama chart is empty");
  const end = points.at(-1);
  if (nowSec - end.t > 3 * DAY) row.notes.push(`Last DeFiLlama point is ${iso(end.t)}, more than 3 days old.`);
  // Daily grid: walk back from the last point, keep points at least 20h apart, stop at 30 days.
  const grid = [end];
  for (let i = points.length - 2; i >= 0; i--) {
    const p = points[i];
    if (end.t - p.t > 30 * DAY + 6 * 3600) break;
    if (grid[0].t - p.t >= 20 * 3600) grid.unshift(p);
  }
  if (grid.length < MIN_GRID_DAYS) return done("not-checkable", `DeFiLlama chart has only ${grid.length} daily points in the last 30 days`);
  const baseMissing = grid.filter((p) => !Number.isFinite(p.apyBase)).length;
  const published = (p) => (Number.isFinite(p.apyBase) ? p.apyBase : p.apy);
  if (baseMissing) row.notes.push(`apyBase is missing on ${baseMissing} of ${grid.length} daily points; DeFiLlama's total apy is used for those days.`);
  const gaps = grid.slice(1).filter((p, i) => p.t - grid[i].t > 36 * 3600).length;
  if (gaps) row.notes.push(`${gaps} gap(s) longer than 36h in the DeFiLlama daily series.`);

  // Share price at every grid point.
  const callData = SEL.convertToAssets + uintArg(vault.shares);
  let firstUsable = null;
  try {
    for (const p of grid) {
      const block = await chain.blockAt(p.t);
      p.block = block.n;
      p.blockTime = block.t;
      const hex = await tryCall(chain, vault.address, callData, block.n);
      p.price = hex ? word(hex) : null;
      if (p.price != null && p.price > 0n && firstUsable == null) firstUsable = p;
      if ((p.price == null || p.price === 0n) && firstUsable != null) throw new Error(`share price unreadable at block ${block.n}`);
    }
  } catch (error) {
    if (error instanceof NoArchiveError) return done("not-checkable", `no archive RPC for ${chainKey}: ${error.message.slice(0, 160)}`);
    return done("unresolved", `RPC error while reading the share price: ${error.message.slice(0, 200)}`);
  }
  const usable = grid.filter((p) => p.price != null && p.price > 0n);
  if (usable.length < MIN_GRID_DAYS) return done("not-checkable", `share price readable on only ${usable.length} daily points (vault younger than the window?)`);
  if (usable.length < grid.length) row.notes.push(`Share price not readable before ${iso(usable[0].t)} (vault not deployed or empty); window shortened to ${usable.length - 1} days.`);
  const g = usable;
  const first = g[0];
  const last = g.at(-1);

  const days = [];
  for (let i = 1; i < g.length; i++) {
    const a = g[i - 1];
    const b = g[i];
    const realized = annualized(a.price, b.price, b.blockTime - a.blockTime);
    const pub = published(b);
    days.push({ date: iso(b.t), block: b.block, blockTime: iso(b.blockTime), sharePrice: b.price.toString(), realized: round(realized, 4), published: round(pub, 4), publishedReward: b.apyReward ?? null, ratio: pub > RATIO_MIN_PUBLISHED && realized != null ? round(realized / pub, 4) : null });
  }
  const windowOf = (a, b) => annualized(a.price, b.price, b.blockTime - a.blockTime);
  const start7 = g.reduce((best, p) => (Math.abs(last.t - 7 * DAY - p.t) < Math.abs(last.t - 7 * DAY - best.t) ? p : best), first);
  const pubAfter = (from) => g.filter((p) => p.t > from.t).map(published).filter(Number.isFinite);
  const rewardAfter = g.filter((p) => p.t > first.t).map((p) => p.apyReward ?? 0);
  const realized30 = windowOf(first, last);
  const realized7 = start7 === last ? null : windowOf(start7, last);
  const pubMean30 = mean(pubAfter(first));
  const pubMean7 = mean(pubAfter(start7));
  const ratios = days.map((d) => d.ratio).filter((x) => x != null);
  const anchor = (p) => ({ block: p.block, blockTime: iso(p.blockTime), dlPoint: iso(p.t), sharePrice: p.price.toString() });
  row.window = { days: round((last.blockTime - first.blockTime) / DAY, 2), start30: anchor(first), start7: anchor(start7), end: anchor(last), dailyPoints: g.length };
  row.realized = { apy30d: round(realized30, 4), apy7d: round(realized7, 4) };
  row.published = {
    baseMean30d: round(pubMean30, 4),
    baseMean7d: round(pubMean7, 4),
    rewardMean30d: round(mean(rewardAfter), 4),
    apyMean30dField: dl.apyMean30d,
    nowApy: dl.apy,
    nowApyBase: dl.apyBase,
    nowApyReward: dl.apyReward,
  };
  row.diff30dPp = round(pubMean30 - realized30, 4);
  row.ratio = { definition: "daily realized / daily published (base leg)", days: ratios.length, mean: round(mean(ratios), 4), sd: round(sd(ratios), 4), window: pubMean30 > RATIO_MIN_PUBLISHED ? round(realized30 / pubMean30, 4) : null };
  row.days = days;

  // Cross-check the three anchors on a second RPC (same block numbers).
  const others = chain.good.slice(1);
  if (!others.length) {
    row.crossCheck = { status: "single-rpc", note: `only one archive RPC passed the probe for ${chainKey}; the anchors are not cross-checked` };
    row.notes.push(row.crossCheck.note);
  } else {
    const primary = [chain.good[0]];
    const results = [];
    for (const [name, p] of [["start30", first], ["start7", start7], ["end", last]]) {
      const res = { anchor: name, block: p.block };
      for (const [label, urls] of [["a", primary], ["b", others]]) {
        try {
          res[label] = { rpc: urls.join(" | "), blockTime: await chain.stamp(p.block, urls), price: String(word(await chain.ethCall(vault.address, callData, p.block, urls))) };
        } catch (error) {
          res[label] = { rpc: urls.join(" | "), error: error.message.slice(0, 120) };
        }
      }
      res.ok = !res.a.error && !res.b.error && res.a.price === res.b.price && res.a.blockTime === res.b.blockTime && res.a.price === p.price.toString() && res.a.blockTime === p.blockTime;
      results.push(res);
    }
    row.crossCheck = { status: results.every((r) => r.ok) ? "ok" : "MISMATCH", rpcA: primary[0], rpcB: others.join(" | "), anchors: results };
    if (row.crossCheck.status !== "ok") row.notes.push("Cross-check on the second RPC did not reproduce the anchors exactly; see crossCheck in the JSON.");
  }

  // Fees, read at the end block. Only WAD-scaled getters are interpreted.
  try {
    const raw = await readFees(chain, vault.address, last.block);
    const rawStart = await readFees(chain, vault.address, first.block);
    row.fees = { raw, rawAtWindowStart: rawStart, block: last.block };
    const isMorphoV2 = /^morpho-vault-v2-/.test(poolKey);
    const isMorphoV1 = /^morpho-vault-v1-/.test(poolKey);
    if (isMorphoV1 || isMorphoV2) row.morpho = await morphoInfo(CHAINS[chainKey].id, vault.address, isMorphoV2 ? "v2" : "v1");
    const feeRaw = raw.fee ?? raw.performanceFee;
    row.fees.performanceFee = wadFraction(feeRaw);
    row.fees.getter = raw.fee != null ? "fee()" : raw.performanceFee != null ? "performanceFee()" : null;
    if (feeRaw != null && row.fees.performanceFee == null) row.notes.push(`${row.fees.getter} returns ${feeRaw}, which is not WAD-scaled; left uninterpreted.`);
    if (JSON.stringify(raw) !== JSON.stringify(rawStart)) row.notes.push(`Fee getters changed inside the window: ${JSON.stringify(rawStart)} at the start, ${JSON.stringify(raw)} at the end.`);
  } catch (error) {
    row.fees = { error: error.message.slice(0, 160) };
  }

  // Classification.
  const diff = pubMean30 - realized30;
  const rel = Math.abs(realized30) > 0.02 ? Math.abs(diff) / Math.abs(realized30) : Math.abs(diff) < 0.02 ? 0 : Infinity;
  const fee = row.fees?.performanceFee;
  const feeText = () => {
    if (fee == null) return "No WAD-scaled fee getter on the contract, so the ratio cannot be tied to a fee.";
    const target = 1 - fee;
    return Math.abs(row.ratio.mean - target) <= FEE_TOLERANCE
      ? `${row.fees.getter} = ${fee}; the ratio equals 1 - fee (${target.toFixed(3)}), which fits a figure published gross of the fee, or a pool paired with a sibling vault that charges that fee. Confirm the vault address before concluding either.`
      : `${row.fees.getter} = ${fee}; 1 - fee = ${target.toFixed(3)} does not equal the ratio ${row.ratio.mean}.`;
  };
  if (Math.abs(diff) <= MATCH_ABS_PP && rel <= MATCH_REL) return done("match", `published 30d mean ${fmt(pubMean30, 3)}% vs realized ${fmt(realized30, 3)}%: ${fmt(diff, 3)} pp, ${fmt(rel * 100, 1)}% relative`);
  // A published simple rate (APR) against a compounded realized rate (APY) also gives a steady ratio.
  const aprOfRealized = realized30 > -100 ? Math.log(1 + realized30 / 100) * 100 : null;
  row.aprOfRealized30d = round(aprOfRealized, 4);
  const aprText = aprOfRealized != null && Math.abs(pubMean30 - aprOfRealized) <= 0.05 ? ` The published mean ${fmt(pubMean30, 3)}% equals the non-compounded rate of realized, ln(1 + ${fmt(realized30, 3)}%) = ${fmt(aprOfRealized, 3)}%: the pool looks published as an APR, not an APY.` : "";
  if (ratios.length >= STEADY_MIN_DAYS && row.ratio.sd != null && row.ratio.sd <= STEADY_SD && Math.abs(row.ratio.mean - 1) > STEADY_OFFSET)
    return done("steady-ratio", `daily realized/published ratio ${row.ratio.mean} with sd ${row.ratio.sd} over ${ratios.length} days. ${feeText()}${aprText}`);
  // Timing test 1: does moving either window edge by up to EDGE_SHIFT_DAYS daily points change the realized figure enough to cover the published mean?
  const edge = [];
  for (let i = 0; i <= Math.min(EDGE_SHIFT_DAYS, g.length - 8); i++)
    for (let j = 0; j <= Math.min(EDGE_SHIFT_DAYS, g.length - 8); j++) {
      const a = g[i];
      const b = g[g.length - 1 - j];
      const r = windowOf(a, b);
      const pm = mean(g.filter((p) => p.t > a.t && p.t <= b.t).map(published).filter(Number.isFinite));
      if (r != null && pm != null) edge.push({ startShift: i, endShift: j, realized: r, published: pm });
    }
  const edgeMin = Math.min(...edge.map((e) => e.realized));
  const edgeMax = Math.max(...edge.map((e) => e.realized));
  const flatDays = days.filter((d) => d.realized != null && Math.abs(d.realized) < 0.01).length;
  row.timing = { realizedRangeWhenEdgesShift: [round(edgeMin, 4), round(edgeMax, 4)], edgeShiftDays: EDGE_SHIFT_DAYS, daysWithNoSharePriceMove: flatDays, medianDailyRealized: round(median(days.map((d) => d.realized).filter((x) => x != null)), 4), medianDailyPublished: round(median(days.map((d) => d.published).filter((x) => x != null)), 4) };
  if (pubMean30 >= edgeMin - MATCH_ABS_PP && pubMean30 <= edgeMax + MATCH_ABS_PP)
    return done("window-or-spike", `moving the window edges by up to ${EDGE_SHIFT_DAYS} days moves realized between ${fmt(edgeMin, 3)}% and ${fmt(edgeMax, 3)}%, which covers the published mean ${fmt(pubMean30, 3)}%${flatDays ? ` (share price did not move on ${flatDays} of ${days.length} days: it updates in steps)` : ""}`);
  // Timing test 2: medians agree, so a few spike days carry the difference.
  const medDiff = row.timing.medianDailyPublished - row.timing.medianDailyRealized;
  if (Math.abs(medDiff) <= MATCH_ABS_PP)
    return done("window-or-spike", `daily medians agree (published ${fmt(row.timing.medianDailyPublished, 3)}%, realized ${fmt(row.timing.medianDailyRealized, 3)}%); the 30d gap of ${fmt(diff, 3)} pp sits in a few spike days`);
  // Timing test 3: the latest published value equals the realized 30d figure, i.e. the published
  // series looks like a trailing average, so the mean of 30 such values reaches further back.
  const nowBase = Number.isFinite(dl.apyBase) ? dl.apyBase : dl.apy;
  if (Number.isFinite(nowBase) && nowBase > RATIO_MIN_PUBLISHED && Math.abs(nowBase - realized30) <= MATCH_ABS_PP && Math.abs(nowBase - realized30) / Math.abs(realized30) <= MATCH_REL)
    return done("window-or-spike", `DeFiLlama's latest value ${fmt(nowBase, 3)}% equals the realized 30d ${fmt(realized30, 3)}%, while the mean of its daily values is ${fmt(pubMean30, 3)}%: consistent with a trailing-average publication whose 30d mean lags (plausible, not verified against the adapter)`);
  return done("unexplained", `published 30d mean ${fmt(pubMean30, 3)}% vs realized ${fmt(realized30, 3)}% (${fmt(diff, 3)} pp); ratio mean ${row.ratio.mean ?? "-"} sd ${row.ratio.sd ?? "-"}; not covered by the window-edge or median tests`);
}

// ---------------------------------------------------------------- run
const entries = [...pins.entries()].filter(([id, pin]) => !only.size || only.has(id) || [...pin.keys].some((k) => only.has(k)) || pin.roles.has("extra") || pin.roles.has("pair"));
const rows = new Array(entries.length);
let cursor = 0;
async function worker() {
  while (cursor < entries.length) {
    const i = cursor++;
    const [id, pin] = entries[i];
    try {
      rows[i] = await checkPool(id, pin);
    } catch (error) {
      rows[i] = { pool: pin.pair ? pin.pair.id : id, roles: [...pin.roles], pinnedAs: [...pin.keys], configFiles: [...pin.files], class: "unresolved", reason: `script error: ${error.message.slice(0, 200)}`, notes: [], urls: {} };
    }
    const r = rows[i];
    console.error(`[${i + 1}/${entries.length}] ${r.class.padEnd(15)} ${(r.pinnedAs?.join("|") || r.symbol || r.pool).padEnd(28)} ${r.reason.slice(0, 150)}`);
  }
}
await Promise.all(Array.from({ length: 4 }, worker));

// ---------------------------------------------------------------- 6. reports
const ORDER = ["unexplained", "steady-ratio", "window-or-spike", "match", "not-checkable", "unresolved"];
rows.sort((a, b) => ORDER.indexOf(a.class) - ORDER.indexOf(b.class) || (b.tvlUsd ?? 0) - (a.tvlUsd ?? 0));
const stamp = new Date().toISOString();
const rpcSummary = {};
for (const p of chains.values()) {
  const c = await p;
  rpcSummary[c.key] = { chainId: c.cfg.id, used: c.good, rejected: c.rejected, rpcCalls: c.calls };
}
const counts = Object.fromEntries(ORDER.map((c) => [c, rows.filter((r) => r.class === c).length]));
const live = rows.filter((r) => r.roles.some((x) => ["pinned", "explicit", "weighted"].includes(x)));
const checked = rows.filter((r) => r.realized);
const coverage = {
  idsReferenced: rows.length,
  liveSourceIds: live.length,
  liveSourceIdsChecked: live.filter((r) => r.realized).length,
  checked: checked.length,
  crossCheckedOnTwoRpcs: checked.filter((r) => r.crossCheck?.status === "ok").length,
  singleRpc: checked.filter((r) => r.crossCheck?.status === "single-rpc").length,
  byClass: counts,
};
mkdirSync(outDir, { recursive: true });
const jsonPath = join(outDir, `${baseName}.json`);
const mdPath = join(outDir, `${baseName}.md`);
writeFileSync(jsonPath, JSON.stringify({ generatedAt: stamp, repoCommit, thresholds: { MATCH_ABS_PP, MATCH_REL, STEADY_SD, STEADY_OFFSET, STEADY_MIN_DAYS, RATIO_MIN_PUBLISHED, FEE_TOLERANCE, EDGE_SHIFT_DAYS }, pharos: { used: pharos.used, note: pharos.note }, rpc: rpcSummary, coverage, rows }, null, 1));

const name = (r) => r.pinnedAs?.join(" / ") || (r.roles.includes("pair") ? "(pair)" : `(${r.roles.join(",")})`);
const label = (r) => (r.project ? `[${r.symbol} · ${r.project} · ${r.chain}](${r.urls.defillama})` : `\`${r.pool}\``);
const ratioCell = (r) => (r.ratio?.mean == null ? "-" : `${fmt(r.ratio.mean, 3)} ± ${fmt(r.ratio.sd, 3)}`);
const feeCell = (r) => (r.fees?.performanceFee == null ? "-" : `${(r.fees.performanceFee * 100).toFixed(1)}%`);
const pharosCell = (r) => (r.pharos ?? []).map((p) => (p.missing ? "-" : fmt(p.apy30d, 2))).join(" / ") || "-";
const md = [];
md.push(noConfig ? `# Share-price check of DeFiLlama yield pools` : `# Share-price check of the DeFiLlama-sourced yield rows`, ``);
md.push(noConfig ? `Run at ${stamp}. Pools given on the command line (--pools / --pair); no config was scanned.` : `Run at ${stamp}. Pharos config: \`worker/src/lib/yield-config\` at commit \`${repoCommit ?? "unknown"}\`.`, ``);
md.push(`For each DeFiLlama pool id, the realized APY is the growth of the vault's share price (\`convertToAssets\`) between blocks found by timestamp, annualized on the real elapsed seconds. It is compared with what DeFiLlama published for the same days. The share price carries base yield only, so the comparison uses DeFiLlama's \`apyBase\`; rewards are listed separately.`, ``);
md.push(`## Coverage`, ``);
if (noConfig) md.push(`- Pools given: **${coverage.idsReferenced}**.`);
else md.push(`- Pool ids referenced in the config: **${coverage.idsReferenced}** (${live.length} are live sources: pinned or explicit pools; the rest are history handoffs, exclusions, or ids in comments).`);
md.push(noConfig ? `- Checked against a share price: **${coverage.checked}**.` : `- Checked against a share price: **${coverage.checked}** (${coverage.liveSourceIdsChecked} of the ${live.length} live sources).`);
md.push(`- Anchors reproduced on a second RPC: ${coverage.crossCheckedOnTwoRpcs} of ${coverage.checked}. Single RPC only: ${coverage.singleRpc}.`);
md.push(`- ${pharos.note}`, ``);
md.push(`| Class | Pools |`, `|---|---|`, ...ORDER.map((c) => `| ${c} | ${counts[c]} |`), ``);
md.push(`## Checked pools`, ``);
md.push(`All figures are % APY. "Published" is the plain mean of DeFiLlama's daily \`apyBase\` (or \`apy\` where \`apyBase\` is missing) over the window. Ratio is daily realized / daily published, mean ± standard deviation.`, ``);
md.push(`| Class | Pinned as | Pool | TVL | Realized 30d | Published 30d | Diff pp | DL apyMean30d | Realized 7d | Published 7d | DL now (apy / base / reward) | Ratio | Fee${pharos.used ? " | Pharos apy30d" : ""} | 2 RPCs |`);
md.push(`|---|---|---|---|---|---|---|---|---|---|---|---|---${pharos.used ? "|---" : ""}|---|`);
for (const r of checked)
  md.push(`| ${r.class} | ${name(r)} | ${label(r)} | ${usd(r.tvlUsd)} | ${fmt(r.realized.apy30d)} | ${fmt(r.published.baseMean30d)} | ${fmt(r.diff30dPp)} | ${fmt(r.published.apyMean30dField)} | ${fmt(r.realized.apy7d)} | ${fmt(r.published.baseMean7d)} | ${fmt(r.published.nowApy)} / ${fmt(r.published.nowApyBase)} / ${fmt(r.published.nowApyReward)} | ${ratioCell(r)} | ${feeCell(r)}${pharos.used ? ` | ${pharosCell(r)}` : ""} | ${r.crossCheck?.status ?? "-"} |`);
md.push(``, `## Not checked`, ``, `| Class | Pinned as / role | Pool | Reason |`, `|---|---|---|---|`);
for (const r of rows.filter((x) => !x.realized)) md.push(`| ${r.class} | ${r.pinnedAs?.join(" / ") || "-"} (${r.roles.join(", ")}) | ${label(r)} | ${r.reason.replaceAll("|", "\\|")} |`);
md.push(``, `## Classes`, ``);
md.push(`- **match**: published and realized 30d differ by at most ${MATCH_ABS_PP} pp and at most ${MATCH_REL * 100}% of realized.`);
md.push(`- **steady-ratio**: not a match, and the daily realized/published ratio has a standard deviation of at most ${STEADY_SD} with a mean more than ${STEADY_OFFSET} away from 1, on at least ${STEADY_MIN_DAYS} days. A constant ratio suggests a fee or a definition difference. If the contract has a WAD-scaled \`fee()\` or \`performanceFee()\`, the ratio is compared with 1 − fee.`);
md.push(`- **window-or-spike**: not a match, and the difference is covered by timing: moving the window edges by up to ${EDGE_SHIFT_DAYS} days covers the published mean, or the daily medians agree. This is a window difference, not an error.`);
md.push(`- **unexplained**: none of the above. It needs a person to look.`);
md.push(`- **not-checkable**: no share price to read this way (non-EVM chain, no ERC-4626 vault at the address, lending market, no archive RPC, too little history).`);
md.push(`- **unresolved**: the id could not be tied to an address without guessing, or DeFiLlama no longer serves it.`, ``);
md.push(`## Per-pool detail`, ``);
for (const r of checked) {
  md.push(`### ${name(r)} — ${r.symbol} (${r.project}, ${r.chain}) — ${r.class}`, ``);
  md.push(`- Verdict: ${r.reason}`);
  md.push(`- DeFiLlama pool \`${r.pool}\` (${r.urls.defillama}), pool key \`${r.dlPoolKey}\`, url ${r.dlUrl ?? "-"}`);
  md.push(`- Vault \`${r.vault.address}\` on ${r.rpc.chain} (chain id ${r.rpc.chainId}), on-chain symbol ${r.vault.symbol}, asset \`${r.vault.asset}\` (${r.vault.assetSymbol}). Resolved from: ${r.vault.resolvedFrom}. Read with \`${r.vault.method}\`.`);
  md.push(`- Window: ${r.window.days} days, ${r.window.dailyPoints} daily points.`);
  for (const [k, a] of [["30d start", r.window.start30], ["7d start", r.window.start7], ["end", r.window.end]]) md.push(`  - ${k}: block ${a.block} at ${a.blockTime} (DeFiLlama point ${a.dlPoint}), share price ${a.sharePrice}`);
  md.push(`- Realized: 30d ${fmt(r.realized.apy30d, 3)}%, 7d ${fmt(r.realized.apy7d, 3)}%. Published base mean: 30d ${fmt(r.published.baseMean30d, 3)}%, 7d ${fmt(r.published.baseMean7d, 3)}%. DeFiLlama \`apyMean30d\` ${fmt(r.published.apyMean30dField, 3)}%. Now: apy ${fmt(r.published.nowApy, 3)}, apyBase ${fmt(r.published.nowApyBase, 3)}, apyReward ${fmt(r.published.nowApyReward, 3)} (reward 30d mean ${fmt(r.published.rewardMean30d, 3)}).`);
  md.push(`- Daily ratio realized/published: mean ${r.ratio.mean ?? "-"}, sd ${r.ratio.sd ?? "-"}, ${r.ratio.days} days. Window ratio ${r.ratio.window ?? "-"}.`);
  if (r.fees?.raw && Object.keys(r.fees.raw).length) md.push(`- Fee getters at block ${r.fees.block}: ${Object.entries(r.fees.raw).map(([k, v]) => `\`${k}()\` = ${v}`).join(", ")}${r.fees.performanceFee != null ? ` (performance fee ${(r.fees.performanceFee * 100).toFixed(2)}%)` : ""}.`);
  if (r.morpho && !r.morpho.error) md.push(`- Morpho API (${r.morpho.fetchedAt}): "${r.morpho.name}", Vault ${r.morpho.version.toUpperCase()}, fee ${r.morpho.fee ?? r.morpho.performanceFee}, apy ${r.morpho.apyPct}%, netApy ${r.morpho.netApyPct}%, avgNetApy(1d) ${r.morpho.avgNetApy1dPct}%.`);
  if (r.timing) md.push(`- Timing: realized 30d moves between ${r.timing.realizedRangeWhenEdgesShift.join("% and ")}% when the edges shift by up to ${r.timing.edgeShiftDays} days; ${r.timing.daysWithNoSharePriceMove} days with no share-price move; daily medians published ${r.timing.medianDailyPublished}%, realized ${r.timing.medianDailyRealized}%.`);
  md.push(`- RPC: ${r.rpc.used.join(", ")}. Cross-check: ${r.crossCheck?.status}${r.crossCheck?.rpcB ? ` (${r.crossCheck.rpcA} vs ${r.crossCheck.rpcB})` : ""}.`);
  if (r.aprOfRealized30d != null) md.push(`- Non-compounded rate of realized 30d: ${fmt(r.aprOfRealized30d, 3)}%.`);
  for (const n of r.notes) md.push(`- Note: ${n}`);
  md.push(``);
}
md.push(`## RPC endpoints`, ``, `| Chain | Used (passed chain-id and 31-day archive probe) | Rejected |`, `|---|---|---|`);
for (const [k, v] of Object.entries(rpcSummary)) md.push(`| ${k} (${v.chainId}) | ${v.used.join("<br>") || "none"} | ${v.rejected.map((x) => `${x.url}: ${x.reason}`).join("<br>").replaceAll("|", "\\|") || "-"} |`);
md.push(``, `## How to reproduce`, ``);
md.push("```", `git clone https://github.com/TokenBrice/pharos-watch   # commit ${repoCommit ?? "of this run"}`, `node share-price-check.mjs path/to/pharos-watch --out reports`, "```", ``);
md.push(`- Node 20 or later, no dependencies, no API key. The script only reads: the config files as text, \`https://yields.llama.fi/poolsEnriched?pool=<id>\`, \`https://yields.llama.fi/chart/<id>\`, \`https://api.morpho.org/graphql\` for Morpho vaults, and \`eth_call\` / \`eth_getBlockByNumber\` on the public RPCs listed above.`);
md.push(`- Address resolution: the 0x address inside DeFiLlama's own pool key (\`pool_old\` in \`/poolsEnriched\`), then the pool url, then the contract in the Pharos coin file for the pinned id (accepted only if its \`asset()\` is one of the pool's DeFiLlama \`underlyingTokens\`). No address is guessed.`);
md.push(`- To recompute one number by hand: call \`convertToAssets(shares)\` on the vault at the start and end blocks listed above, then \`(end/start)^(31536000/(tEnd−tStart)) − 1\`.`);
md.push(`- Block numbers are found by binary search on block timestamps (last block at or before the DeFiLlama point), never by block count.`);
md.push(`- \`--pools <uuid,...>\` checks DeFiLlama pools that are not in the config. \`--pair <uuid>=<chain>:<address>\` compares a pool with an explicit address. \`--prefer <substring>\` puts a given RPC first.`);
md.push(`- Raw data, including every daily point and the cross-check, is in \`${baseName}.json\`.`, ``);
writeFileSync(mdPath, md.join("\n"));
console.error(`wrote ${mdPath} and ${jsonPath}`);
console.error(JSON.stringify(coverage));
