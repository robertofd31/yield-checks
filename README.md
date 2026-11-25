# yield-checks

Published DeFi numbers, checked against the chain.

This repository holds three things:

- **[Cases](CASES.md):** errors I reported to data projects, with the evidence and the outcome. 8 so far, 3 fixed by the maintainers.
- **A tool:** `share-price-check.mjs`, which checks a published vault APY against what the vault's share price actually did.
- **[Reports](reports/):** dated runs of the tool, listing every pool checked.

## The tool

A yield aggregator publishes a number for a vault. The vault's share price is the primary source: it is what a depositor's position grew by, after fees. This script reads both and tells you where they disagree.

## What it does

For each DeFiLlama yield pool it is given:

1. Resolves the pool to a contract address from DeFiLlama's own pool key. It never guesses from a symbol.
2. Confirms the address is an ERC-4626 vault (`asset()`, `convertToAssets()`).
3. Reads the share price at daily points over 30 days. Blocks are found by timestamp, and the rate is annualized on real elapsed seconds.
4. Compares realized APY with the mean of DeFiLlama's daily `apyBase` for the same days.
5. Re-reads the start, 7-day and end share prices on a second RPC.
6. Classifies the pool and writes a Markdown report and the raw JSON.

It is read-only, has no dependencies and needs no API key. Node 20 or later.

## Run it

Against the DeFiLlama pool ids pinned in the [Pharos](https://github.com/TokenBrice/pharos-watch) yield config:

```
git clone https://github.com/TokenBrice/pharos-watch
node share-price-check.mjs path/to/pharos-watch --out reports --name my-run
```

Against any DeFiLlama pools, without a config:

```
node share-price-check.mjs --no-config --pools <pool-uuid>,<pool-uuid> --out reports --name my-run
```

Other options are listed at the top of the script. A full run takes about 15 minutes on public RPCs.

## Reading the result

| Class | Meaning |
|---|---|
| match | Published and realized 30-day APY differ by at most 0.15 pp and 5%. |
| window-or-spike | They differ, and timing explains it (window edges, a few spike days, a trailing average). Not an error. |
| steady-ratio | Realized is a constant multiple of published. Suggests a fee or a definition difference. |
| unexplained | None of the above. A person needs to look. |
| not-checkable | No share price to read this way. |
| unresolved | The pool could not be tied to an address without guessing, or DeFiLlama no longer serves it. |

The thresholds are constants at the top of the script.

## Reports

| Date | Scope | Result |
|---|---|---|
| 2026-11-20 | [Pharos pinned pools](reports/2026-11-20-pharos-pins.md) | 34 checked: 25 match, 5 timing, 4 to look at. 22 not checkable, 13 unresolved. |
| 2026-11-20 | [22 largest Morpho vault pools, Ethereum and Base](reports/2026-11-20-morpho-largest.md) | 22 of 22 match. Largest gap 0.06 pp. Fees from 0% to 25%. |

What the first two runs show:

- **DeFiLlama publishes Morpho vaults net of the vault fee.** Across 27 Morpho vaults with fees from 0% to 25%, published and realized agree to 0.06 pp or better. A figure gross of a 25% fee would be off by a quarter.
- **One pinned id points at a retired pool.** `sgho-aave` is pinned to a pool DeFiLlama now labels "Legacy" (0% APY), while the sGHO vault itself realized 4.60%.
- **Two pinned ids are no longer served by DeFiLlama** (`yousd-yield-optimizer`, `nusd-neutrl`).
- **Three gaps have no verified cause yet:** sUSDai, apyUSD and srUSDe. In all three DeFiLlama publishes less than the share price realized. The reports show the numbers. They do not claim an error.

## Limits

- ERC-4626 vaults on EVM chains only. Fund tokens, rebasing tokens, lending markets and non-EVM chains are reported as not checkable.
- Base yield only. Reward APY is paid outside the share price and is listed, not checked.
- Share-price growth includes anything that raises the price, including one-off transfers into the vault. It says what holders received, not where it came from.
- A 30-day window with daily points. A pool that publishes a trailing average will show a timing difference.
- Public RPCs. Two pools (BSC, Robinhood Chain) had a single archive endpoint and are not cross-checked.
- A steady ratio equal to 1 − fee is not proof of a gross figure. It also appears when a pool is compared with a sibling vault that has the same symbol and a different fee. I made that mistake once by resolving a vault by symbol. That is why the script takes the address from the pool key.

## Contact

Roberto, [@robertofd31](https://github.com/robertofd31). Issues and corrections are welcome.

MIT licence.
