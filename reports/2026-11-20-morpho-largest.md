# Share-price check of DeFiLlama yield pools

Run at 2026-11-20T10:37:02.735Z. Pools given on the command line (--pools / --pair); no config was scanned.

For each DeFiLlama pool id, the realized APY is the growth of the vault's share price (`convertToAssets`) between blocks found by timestamp, annualized on the real elapsed seconds. It is compared with what DeFiLlama published for the same days. The share price carries base yield only, so the comparison uses DeFiLlama's `apyBase`; rewards are listed separately.

## Coverage

- Pools given: **22**.
- Checked against a share price: **22**.
- Anchors reproduced on a second RPC: 22 of 22. Single RPC only: 0.
- GET https://api.pharos.watch/api/yield-rankings without a key returned HTTP 401; the Pharos apy30d column is left out.

| Class | Pools |
|---|---|
| unexplained | 0 |
| steady-ratio | 0 |
| window-or-spike | 0 |
| match | 22 |
| not-checkable | 0 |
| unresolved | 0 |

## Checked pools

All figures are % APY. "Published" is the plain mean of DeFiLlama's daily `apyBase` (or `apy` where `apyBase` is missing) over the window. Ratio is daily realized / daily published, mean ± standard deviation.

| Class | Pinned as | Pool | TVL | Realized 30d | Published 30d | Diff pp | DL apyMean30d | Realized 7d | Published 7d | DL now (apy / base / reward) | Ratio | Fee | 2 RPCs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| match | (extra) | [GROVE-STEAKUSDC · morpho-blue · Base](https://defillama.com/yields/pool/28470287-2c5b-5744-bc13-b9f1c0190b7b) | $548.0M | 5.34 | 5.33 | -0.01 | 5.25 | 5.18 | 5.10 | 8.68 / 8.68 / 0.00 | 0.998 ± 0.020 | 0.0% | ok |
| match | (extra) | [SXSRLUSD · morpho-blue · Ethereum](https://defillama.com/yields/pool/f04f40c0-4075-57e9-82f5-f4e0f4703371) | $500.0M | 0.15 | 0.15 | 0.00 | 0.15 | 0.16 | 0.16 | 0.19 / 0.19 / 0.00 | 0.997 ± 0.017 | 10.0% | ok |
| match | (extra) | [SIRLOINUSDC · morpho-blue · Base](https://defillama.com/yields/pool/8276be38-acc6-4005-ab0d-62680f49f4df) | $450.5M | 3.73 | 3.72 | -0.01 | 6.12 | 3.81 | 3.78 | 7.79 / 5.87 / 1.92 | 0.998 ± 0.018 | 25.0% | ok |
| match | (extra) | [GTUSDCP · morpho-blue · Base](https://defillama.com/yields/pool/e0672197-9f3e-4414-bca5-e6b4c90aa469) | $395.8M | 5.33 | 5.36 | 0.03 | 5.26 | 5.15 | 5.19 | 9.27 / 9.27 / 0.00 | 0.993 ± 0.030 | 0.0% | ok |
| match | (extra) | [SENPYUSDMAIN · morpho-blue · Ethereum](https://defillama.com/yields/pool/699f25fe-09f4-4f82-8f58-baa5b0af8fa4) | $368.1M | 2.37 | 2.37 | 0.01 | 5.56 | 2.34 | 2.40 | 5.44 / 2.37 / 3.07 | 1.001 ± 0.062 | 0.0% | ok |
| match | (extra) | [SENRLUSDV2 · morpho-blue · Ethereum](https://defillama.com/yields/pool/2e53bb82-f13f-4157-a3bf-b1a91b94b6a4) | $346.3M | 3.03 | 3.03 | -0.00 | 5.94 | 2.39 | 2.35 | 5.87 / 2.39 / 3.49 | 1.006 ± 0.029 | 10.0% | ok |
| match | (extra) | [SPARKUSDC · morpho-blue · Base](https://defillama.com/yields/pool/a5fab52f-73fa-4f44-9c09-9af1eb20996c) | $164.3M | 4.79 | 4.81 | 0.01 | 4.72 | 4.65 | 4.66 | 8.35 / 8.35 / 0.00 | 0.995 ± 0.027 | 10.0% | ok |
| match | (extra) | [STEAKEURCV · morpho-blue · Ethereum](https://defillama.com/yields/pool/d3b28212-a46b-4db8-8bb7-2c946b3cbe76) | $158.6M | 2.99 | 2.99 | -0.00 | 2.99 | 3.00 | 3.00 | 3.00 / 3.00 / 0.00 | 1.000 ± 0.000 | 0.0% | ok |
| match | (extra) | [SENPYUSDPRIMEV2 · morpho-blue · Ethereum](https://defillama.com/yields/pool/f569e486-da2a-41ef-8bfe-1a4db0d1d268) | $147.0M | 4.76 | 4.77 | 0.01 | 6.80 | 6.51 | 6.64 | 7.77 / 5.17 / 2.60 | 1.003 ± 0.022 | 15.0% | ok |
| match | (extra) | [STEAKUSDC · morpho-blue · Base](https://defillama.com/yields/pool/ba68527f-8ec2-4c55-827a-8f4673ae047c) | $130.3M | 5.34 | 5.33 | -0.01 | 5.25 | 5.18 | 5.10 | 8.68 / 8.68 / 0.00 | 0.998 ± 0.020 | 0.0% | ok |
| match | (extra) | [GTUSDCP · morpho-blue · Base](https://defillama.com/yields/pool/df7ccfd1-2642-4d79-851a-a5b07d9b8a97) | $111.5M | 5.30 | 5.31 | 0.01 | 5.24 | 5.01 | 5.01 | 8.04 / 8.04 / 0.00 | 0.997 ± 0.025 | 0.0% | ok |
| match | (extra) | [STEAKUSDC · morpho-blue · Base](https://defillama.com/yields/pool/81ae8812-f04f-4f6e-9d71-ee5778f3a178) | $104.5M | 3.98 | 3.99 | 0.01 | 3.92 | 3.86 | 3.89 | 7.06 / 7.06 / 0.00 | 0.994 ± 0.030 | 25.0% | ok |
| match | (extra) | [GTUSDCP · morpho-blue · Ethereum](https://defillama.com/yields/pool/71b34441-5a46-431b-a9b3-8c081cd0d74c) | $102.5M | 4.91 | 4.89 | -0.01 | 4.89 | 4.61 | 4.53 | 4.99 / 4.99 / 0.00 | 1.002 ± 0.012 | 0.0% | ok |
| match | (extra) | [SENPYUSDPST · morpho-blue · Ethereum](https://defillama.com/yields/pool/d437f7b3-09ba-5450-be41-d2b7d0e9406d) | $82.3M | 5.88 | 5.84 | -0.04 | 7.30 | 8.08 | 8.17 | 7.02 / 5.97 / 1.05 | 1.005 ± 0.051 | 15.0% | ok |
| match | (extra) | [STEAKUSDC · morpho-blue · Ethereum](https://defillama.com/yields/pool/b55f43a8-f444-4cd8-a3a4-0a4e786ba566) | $78.1M | 4.75 | 4.75 | 0.00 | 4.74 | 4.40 | 4.34 | 4.73 / 4.73 / 0.00 | 0.999 ± 0.013 | 5.0% | ok |
| match | (extra) | [STEAKUSDT · morpho-blue · Ethereum](https://defillama.com/yields/pool/ded5a855-23c1-459d-8390-ba2707fac7c5) | $72.5M | 3.96 | 3.98 | 0.02 | 3.93 | 3.16 | 3.17 | 3.22 / 3.22 / 0.00 | 1.000 ± 0.015 | 5.0% | ok |
| match | (extra) | [SPARKUSDTBC · morpho-blue · Ethereum](https://defillama.com/yields/pool/95161b3c-7d6e-4c02-a0d7-878ac357ebbf) | $60.6M | 3.76 | 3.71 | -0.04 | 3.71 | 2.81 | 2.81 | 3.04 / 3.04 / 0.00 | 1.008 ± 0.034 | 10.0% | ok |
| match | (extra) | [ARMUSDCS · morpho-blue · Ethereum](https://defillama.com/yields/pool/d2a99602-b0c7-4f6a-a329-82bdaad3df0c) | $43.3M | 6.31 | 6.33 | 0.02 | 6.35 | 6.31 | 6.33 | 6.86 / 6.80 / 0.06 | 0.997 ± 0.012 | 0.0% | ok |
| match | (extra) | [SKYMONEYUSDTSAVINGS · morpho-blue · Ethereum](https://defillama.com/yields/pool/89641d1d-6ee2-431b-b131-a0b49c59e2c5) | $41.4M | 3.44 | 3.40 | -0.04 | 3.96 | 4.83 | 4.74 | 12.09 / 11.16 / 0.93 | 0.998 ± 0.034 | 0.0% | ok |
| match | (extra) | [BBQUSDC · morpho-blue · Ethereum](https://defillama.com/yields/pool/f8d7740c-4cef-420e-a944-1b7caffde643) | $39.2M | 6.80 | 6.82 | 0.02 | 6.78 | 6.34 | 6.32 | 7.15 / 7.15 / 0.00 | 1.002 ± 0.026 | 5.0% | ok |
| match | (extra) | [CSCBUSDC · morpho-blue · Base](https://defillama.com/yields/pool/097b18e2-9232-4c44-bd2e-502de4ba889e) | $33.6M | 5.29 | 5.27 | -0.01 | 6.61 | 5.48 | 5.43 | 9.29 / 7.89 / 1.40 | 1.000 ± 0.032 | 10.0% | ok |
| match | (extra) | [ROXUSDCY · morpho-blue · Ethereum](https://defillama.com/yields/pool/caa9ffc0-2983-4c18-9556-4e3ad4dfe6ac) | $33.1M | 8.35 | 8.41 | 0.06 | 9.03 | 8.53 | 8.67 | 11.26 / 10.30 / 0.97 | 1.001 ± 0.043 | 5.0% | ok |

## Not checked

| Class | Pinned as / role | Pool | Reason |
|---|---|---|---|

## Classes

- **match**: published and realized 30d differ by at most 0.15 pp and at most 5% of realized.
- **steady-ratio**: not a match, and the daily realized/published ratio has a standard deviation of at most 0.03 with a mean more than 0.02 away from 1, on at least 20 days. A constant ratio suggests a fee or a definition difference. If the contract has a WAD-scaled `fee()` or `performanceFee()`, the ratio is compared with 1 − fee.
- **window-or-spike**: not a match, and the difference is covered by timing: moving the window edges by up to 3 days covers the published mean, or the daily medians agree. This is a window difference, not an error.
- **unexplained**: none of the above. It needs a person to look.
- **not-checkable**: no share price to read this way (non-EVM chain, no ERC-4626 vault at the address, lending market, no archive RPC, too little history).
- **unresolved**: the id could not be tied to an address without guessing, or DeFiLlama no longer serves it.

## Per-pool detail

### (extra) — GROVE-STEAKUSDC (morpho-blue, Base) — match

- Verdict: published 30d mean 5.331% vs realized 5.341%: -0.010 pp, 0.2% relative
- DeFiLlama pool `28470287-2c5b-5744-bc13-b9f1c0190b7b` (https://defillama.com/yields/pool/28470287-2c5b-5744-bc13-b9f1c0190b7b), pool key `morpho-vault-v2-0xbeef0786756810478b88982DE00F3CD7fdB8e7c7-base`, url https://app.morpho.org/base/vault/0xbeef0786756810478b88982DE00F3CD7fdB8e7c7
- Vault `0xbeef0786756810478b88982DE00F3CD7fdB8e7c7` on base (chain id 8453), on-chain symbol grove-steakUSDC, asset `0x833589fcd6edb6e08f4c7c32d4f71b54bda02913` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v2-0xbeef0786756810478b88982DE00F3CD7fdB8e7c7-base". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 52917190 at 2026-10-21T23:02:07Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1005640862150854238
  - 7d start: block 56670556 at 2026-11-12T23:01:26Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1008832165910017496
  - end: block 59892691 at 2026-11-20T10:01:53Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1009872986321908361
- Realized: 30d 5.341%, 7d 5.176%. Published base mean: 30d 5.331%, 7d 5.102%. DeFiLlama `apyMean30d` 5.253%. Now: apy 8.679, apyBase 8.679, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9977, sd 0.0199, 29 days. Window ratio 1.0019.
- Fee getters at block 59892691: `performanceFee()` = 0, `managementFee()` = 0 (performance fee 0.00%).
- Morpho API (2026-11-20T10:36:26.819Z): "Grove x Steakhouse USDC", Vault V2, fee 0, apy 7.3734%, netApy 7.3734%, avgNetApy(1d) 8.6793%.
- RPC: https://mainnet.base.org, https://base-rpc.publicnode.com. Cross-check: ok (https://mainnet.base.org vs https://base-rpc.publicnode.com).

### (extra) — SXSRLUSD (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 0.154% vs realized 0.154%: 0.000 pp, 0.1% relative
- DeFiLlama pool `f04f40c0-4075-57e9-82f5-f4e0f4703371` (https://defillama.com/yields/pool/f04f40c0-4075-57e9-82f5-f4e0f4703371), pool key `morpho-vault-v2-0xFC8C624B6080a0a780583799f2A862DE936F6E22-ethereum`, url https://app.morpho.org/ethereum/vault/0xFC8C624B6080a0a780583799f2A862DE936F6E22
- Vault `0xFC8C624B6080a0a780583799f2A862DE936F6E22` on ethereum (chain id 1), on-chain symbol sxsRLUSD, asset `0x8292bb45bf1ee4d140127049757c2e0ff06317ed` (RLUSD). Resolved from: DeFiLlama pool key "morpho-vault-v2-0xFC8C624B6080a0a780583799f2A862DE936F6E22-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1000107786799424024393042336197
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1000200037837785411212448881453
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1000231754551032942579512889190
- Realized: 30d 0.154%, 7d 0.155%. Published base mean: 30d 0.154%, 7d 0.156%. DeFiLlama `apyMean30d` 0.154%. Now: apy 0.191, apyBase 0.191, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9972, sd 0.0172, 29 days. Window ratio 0.9988.
- Fee getters at block 26455579: `performanceFee()` = 100000000000000000, `managementFee()` = 0 (performance fee 10.00%).
- Morpho API (2026-11-20T10:36:09.821Z): "Sentora x Spark RLUSD", Vault V2, fee 0.1, apy 0.2559%, netApy 0.2303%, avgNetApy(1d) 0.191%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### (extra) — SIRLOINUSDC (morpho-blue, Base) — match

- Verdict: published 30d mean 3.724% vs realized 3.732%: -0.008 pp, 0.2% relative
- DeFiLlama pool `8276be38-acc6-4005-ab0d-62680f49f4df` (https://defillama.com/yields/pool/8276be38-acc6-4005-ab0d-62680f49f4df), pool key `morpho-vault-v2-0xbeeff2490FEffa212faC2f6553682C219E6a8845-base`, url https://app.morpho.org/base/vault/0xbeeff2490FEffa212faC2f6553682C219E6a8845
- Vault `0xbeeff2490FEffa212faC2f6553682C219E6a8845` on base (chain id 8453), on-chain symbol sirloinUSDC, asset `0x833589fcd6edb6e08f4c7c32d4f71b54bda02913` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v2-0xbeeff2490FEffa212faC2f6553682C219E6a8845-base". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 52917190 at 2026-10-21T23:02:07Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1013821216489173120
  - 7d start: block 56670556 at 2026-11-12T23:01:26Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1016046076572889912
  - end: block 59892691 at 2026-11-20T10:01:53Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1016823612471376647
- Realized: 30d 3.732%, 7d 3.814%. Published base mean: 30d 3.724%, 7d 3.776%. DeFiLlama `apyMean30d` 6.116%. Now: apy 7.793, apyBase 5.868, apyReward 1.925 (reward 30d mean 2.432).
- Daily ratio realized/published: mean 0.9981, sd 0.0179, 29 days. Window ratio 1.0022.
- Fee getters at block 59892691: `performanceFee()` = 250000000000000000, `managementFee()` = 0 (performance fee 25.00%).
- Morpho API (2026-11-20T10:36:27.032Z): "Steakhouse High Yield USDC Edition", Vault V2, fee 0.25, apy 6.8738%, netApy 5.1123%, avgNetApy(1d) 5.8681%.
- RPC: https://mainnet.base.org, https://base-rpc.publicnode.com. Cross-check: ok (https://mainnet.base.org vs https://base-rpc.publicnode.com).

### (extra) — GTUSDCP (morpho-blue, Base) — match

- Verdict: published 30d mean 5.362% vs realized 5.334%: 0.028 pp, 0.5% relative
- DeFiLlama pool `e0672197-9f3e-4414-bca5-e6b4c90aa469` (https://defillama.com/yields/pool/e0672197-9f3e-4414-bca5-e6b4c90aa469), pool key `morpho-vault-v1-0xeE8F4eC5672F09119b96Ab6fB59C27E1b7e44b61-base`, url https://app.morpho.org/base/vault/0xeE8F4eC5672F09119b96Ab6fB59C27E1b7e44b61
- Vault `0xeE8F4eC5672F09119b96Ab6fB59C27E1b7e44b61` on base (chain id 8453), on-chain symbol gtUSDCp, asset `0x833589fcd6edb6e08f4c7c32d4f71b54bda02913` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v1-0xeE8F4eC5672F09119b96Ab6fB59C27E1b7e44b61-base". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 29 daily points.
  - 30d start: block 52917190 at 2026-10-21T23:02:07Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1116272410221886465
  - 7d start: block 56670556 at 2026-11-12T23:01:26Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1119814893432037084
  - end: block 59892691 at 2026-11-20T10:01:53Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1120963911715954608
- Realized: 30d 5.334%, 7d 5.147%. Published base mean: 30d 5.362%, 7d 5.188%. DeFiLlama `apyMean30d` 5.262%. Now: apy 9.269, apyBase 9.269, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9927, sd 0.0301, 28 days. Window ratio 0.9949.
- Fee getters at block 59892691: `fee()` = 0 (performance fee 0.00%).
- Morpho API (2026-11-20T10:36:26.692Z): "Gauntlet USDC Prime", Vault V1, fee 0, apy 7.3734%, netApy 7.3734%, avgNetApy(1d) 9.2266%.
- RPC: https://mainnet.base.org, https://base-rpc.publicnode.com. Cross-check: ok (https://mainnet.base.org vs https://base-rpc.publicnode.com).
- Note: 1 gap(s) longer than 36h in the DeFiLlama daily series.

### (extra) — SENPYUSDMAIN (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 2.374% vs realized 2.367%: 0.007 pp, 0.3% relative
- DeFiLlama pool `699f25fe-09f4-4f82-8f58-baa5b0af8fa4` (https://defillama.com/yields/pool/699f25fe-09f4-4f82-8f58-baa5b0af8fa4), pool key `morpho-vault-v2-0xb576765fB15505433aF24FEe2c0325895C559FB2-ethereum`, url https://app.morpho.org/ethereum/vault/0xb576765fB15505433aF24FEe2c0325895C559FB2
- Vault `0xb576765fB15505433aF24FEe2c0325895C559FB2` on ethereum (chain id 1), on-chain symbol senPYUSDmain, asset `0x6c3ea9036406852006290770bedfcaba0e23a0e8` (PYUSD). Resolved from: DeFiLlama pool key "morpho-vault-v2-0xb576765fB15505433aF24FEe2c0325895C559FB2-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 2025319482562397899
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 2028186160923667920
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 2029146912929859432
- Realized: 30d 2.367%, 7d 2.345%. Published base mean: 30d 2.374%, 7d 2.396%. DeFiLlama `apyMean30d` 5.561%. Now: apy 5.440, apyBase 2.372, apyReward 3.068 (reward 30d mean 3.191).
- Daily ratio realized/published: mean 1.0011, sd 0.062, 29 days. Window ratio 0.997.
- Fee getters at block 26455579: `performanceFee()` = 0, `managementFee()` = 317097919 (performance fee 0.00%).
- Morpho API (2026-11-20T10:36:15.025Z): "Paypal USD Main", Vault V2, fee 0, apy 3.185%, netApy 5.2266%, avgNetApy(1d) 5.4301%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### (extra) — SENRLUSDV2 (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 3.025% vs realized 3.028%: -0.003 pp, 0.1% relative
- DeFiLlama pool `2e53bb82-f13f-4157-a3bf-b1a91b94b6a4` (https://defillama.com/yields/pool/2e53bb82-f13f-4157-a3bf-b1a91b94b6a4), pool key `morpho-vault-v2-0x6dC58a0FdfC8D694e571DC59B9A52EEEa780E6bf-ethereum`, url https://app.morpho.org/ethereum/vault/0x6dC58a0FdfC8D694e571DC59B9A52EEEa780E6bf
- Vault `0x6dC58a0FdfC8D694e571DC59B9A52EEEa780E6bf` on ethereum (chain id 1), on-chain symbol senRLUSDv2, asset `0x8292bb45bf1ee4d140127049757c2e0ff06317ed` (RLUSD). Resolved from: DeFiLlama pool key "morpho-vault-v2-0x6dC58a0FdfC8D694e571DC59B9A52EEEa780E6bf-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1014812547441365088525019281351
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1016767396111831707710793159129
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1017258529426787226446056413964
- Realized: 30d 3.028%, 7d 2.391%. Published base mean: 30d 3.025%, 7d 2.349%. DeFiLlama `apyMean30d` 5.944%. Now: apy 5.873, apyBase 2.387, apyReward 3.486 (reward 30d mean 2.940).
- Daily ratio realized/published: mean 1.0062, sd 0.0288, 29 days. Window ratio 1.0009.
- Fee getters at block 26455579: `performanceFee()` = 100000000000000000, `managementFee()` = 0 (performance fee 10.00%).
- Morpho API (2026-11-20T10:36:20.412Z): "Sentora RLUSD Main", Vault V2, fee 0.1, apy 2.7852%, netApy 5.9889%, avgNetApy(1d) 5.8729%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### (extra) — SPARKUSDC (morpho-blue, Base) — match

- Verdict: published 30d mean 4.806% vs realized 4.794%: 0.012 pp, 0.2% relative
- DeFiLlama pool `a5fab52f-73fa-4f44-9c09-9af1eb20996c` (https://defillama.com/yields/pool/a5fab52f-73fa-4f44-9c09-9af1eb20996c), pool key `morpho-vault-v1-0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A-base`, url https://app.morpho.org/base/vault/0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A
- Vault `0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A` on base (chain id 8453), on-chain symbol sparkUSDC, asset `0x833589fcd6edb6e08f4c7c32d4f71b54bda02913` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v1-0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A-base". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 52917190 at 2026-10-21T23:02:07Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1083299193721778657
  - 7d start: block 56670556 at 2026-11-12T23:01:26Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1086391932045315747
  - end: block 59892691 at 2026-11-20T10:01:53Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1087401050128427431
- Realized: 30d 4.794%, 7d 4.648%. Published base mean: 30d 4.806%, 7d 4.662%. DeFiLlama `apyMean30d` 4.721%. Now: apy 8.355, apyBase 8.355, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9945, sd 0.0269, 29 days. Window ratio 0.9976.
- Fee getters at block 59892691: `fee()` = 100000000000000000 (performance fee 10.00%).
- Morpho API (2026-11-20T10:36:33.527Z): "Spark USDC Vault", Vault V1, fee 0.1, apy 7.3584%, netApy 6.5988%, avgNetApy(1d) 8.4838%.
- RPC: https://mainnet.base.org, https://base-rpc.publicnode.com. Cross-check: ok (https://mainnet.base.org vs https://base-rpc.publicnode.com).

### (extra) — STEAKEURCV (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 2.988% vs realized 2.988%: -0.000 pp, 0.0% relative
- DeFiLlama pool `d3b28212-a46b-4db8-8bb7-2c946b3cbe76` (https://defillama.com/yields/pool/d3b28212-a46b-4db8-8bb7-2c946b3cbe76), pool key `morpho-vault-v2-0xbeef0C075Da5D01112AE5cF34d257074fB5DDB2f-ethereum`, url https://app.morpho.org/ethereum/vault/0xbeef0C075Da5D01112AE5cF34d257074fB5DDB2f
- Vault `0xbeef0C075Da5D01112AE5cF34d257074fB5DDB2f` on ethereum (chain id 1), on-chain symbol steakEURCV, asset `0x5f7827fdeb7c20b443265fc2f40845b715385ff2` (EURCV). Resolved from: DeFiLlama pool key "morpho-vault-v2-0xbeef0C075Da5D01112AE5cF34d257074fB5DDB2f-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1026933021165188758746178019821
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1028754655122071153632871241952
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1029376231623249366459671536527
- Realized: 30d 2.988%, 7d 3.000%. Published base mean: 30d 2.988%, 7d 3.000%. DeFiLlama `apyMean30d` 2.988%. Now: apy 3.000, apyBase 3.000, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1, sd 0, 29 days. Window ratio 1.0001.
- Fee getters at block 26455579: `performanceFee()` = 0, `managementFee()` = 0 (performance fee 0.00%).
- Morpho API (2026-11-20T10:36:35.300Z): "Steakhouse Prime EURCV", Vault V2, fee 0, apy 3%, netApy 3%, avgNetApy(1d) 3%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### (extra) — SENPYUSDPRIMEV2 (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 4.765% vs realized 4.758%: 0.008 pp, 0.2% relative
- DeFiLlama pool `f569e486-da2a-41ef-8bfe-1a4db0d1d268` (https://defillama.com/yields/pool/f569e486-da2a-41ef-8bfe-1a4db0d1d268), pool key `morpho-vault-v2-0xC21b08C16458202593D4D9B26b9984Ee67b38BbD-ethereum`, url https://app.morpho.org/ethereum/vault/0xC21b08C16458202593D4D9B26b9984Ee67b38BbD
- Vault `0xC21b08C16458202593D4D9B26b9984Ee67b38BbD` on ethereum (chain id 1), on-chain symbol senPYUSDPRIMEv2, asset `0x6c3ea9036406852006290770bedfcaba0e23a0e8` (PYUSD). Resolved from: DeFiLlama pool key "morpho-vault-v2-0xC21b08C16458202593D4D9B26b9984Ee67b38BbD-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 2029035812728458410
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 2034040122286608727
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 2036661526700851046
- Realized: 30d 4.758%, 7d 6.506%. Published base mean: 30d 4.766%, 7d 6.636%. DeFiLlama `apyMean30d` 6.801%. Now: apy 7.769, apyBase 5.169, apyReward 2.600 (reward 30d mean 2.103).
- Daily ratio realized/published: mean 1.0027, sd 0.0217, 29 days. Window ratio 0.9984.
- Fee getters at block 26455579: `performanceFee()` = 150000000000000000, `managementFee()` = 0 (performance fee 15.00%).
- Morpho API (2026-11-20T10:36:27.289Z): "Sentora PRIME Main", Vault V2, fee 0.15, apy 6.2123%, netApy 7.8564%, avgNetApy(1d) 7.836%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### (extra) — STEAKUSDC (morpho-blue, Base) — match

- Verdict: published 30d mean 5.332% vs realized 5.342%: -0.010 pp, 0.2% relative
- DeFiLlama pool `ba68527f-8ec2-4c55-827a-8f4673ae047c` (https://defillama.com/yields/pool/ba68527f-8ec2-4c55-827a-8f4673ae047c), pool key `morpho-vault-v2-0xbeef0e0834849aCC03f0089F01f4F1Eeb06873C9-base`, url https://app.morpho.org/base/vault/0xbeef0e0834849aCC03f0089F01f4F1Eeb06873C9
- Vault `0xbeef0e0834849aCC03f0089F01f4F1Eeb06873C9` on base (chain id 8453), on-chain symbol steakUSDC, asset `0x833589fcd6edb6e08f4c7c32d4f71b54bda02913` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v2-0xbeef0e0834849aCC03f0089F01f4F1Eeb06873C9-base". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 52917190 at 2026-10-21T23:02:07Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1045194226766422626
  - 7d start: block 56670556 at 2026-11-12T23:01:26Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1048511489717159927
  - end: block 59892691 at 2026-11-20T10:01:53Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1049593593567936348
- Realized: 30d 5.342%, 7d 5.177%. Published base mean: 30d 5.332%, 7d 5.104%. DeFiLlama `apyMean30d` 5.253%. Now: apy 8.681, apyBase 8.681, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9977, sd 0.0199, 29 days. Window ratio 1.002.
- Fee getters at block 59892691: `performanceFee()` = 0, `managementFee()` = 0 (performance fee 0.00%).
- Morpho API (2026-11-20T10:36:34.096Z): "Steakhouse Prime USDC", Vault V2, fee 0, apy 7.3807%, netApy 7.3807%, avgNetApy(1d) 8.6805%.
- RPC: https://mainnet.base.org, https://base-rpc.publicnode.com. Cross-check: ok (https://mainnet.base.org vs https://base-rpc.publicnode.com).

### (extra) — GTUSDCP (morpho-blue, Base) — match

- Verdict: published 30d mean 5.309% vs realized 5.299%: 0.010 pp, 0.2% relative
- DeFiLlama pool `df7ccfd1-2642-4d79-851a-a5b07d9b8a97` (https://defillama.com/yields/pool/df7ccfd1-2642-4d79-851a-a5b07d9b8a97), pool key `morpho-vault-v2-0x050cE30b927Da55177A4914EC73480238BAD56f0-base`, url https://app.morpho.org/base/vault/0x050cE30b927Da55177A4914EC73480238BAD56f0
- Vault `0x050cE30b927Da55177A4914EC73480238BAD56f0` on base (chain id 8453), on-chain symbol gtusdcp, asset `0x833589fcd6edb6e08f4c7c32d4f71b54bda02913` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v2-0x050cE30b927Da55177A4914EC73480238BAD56f0-base". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 52917190 at 2026-10-21T23:02:07Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1046028335721804621
  - 7d start: block 56670556 at 2026-11-12T23:01:26Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1049347783741032560
  - end: block 59892691 at 2026-11-20T10:01:53Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1050396641279073746
- Realized: 30d 5.299%, 7d 5.010%. Published base mean: 30d 5.309%, 7d 5.011%. DeFiLlama `apyMean30d` 5.244%. Now: apy 8.036, apyBase 8.036, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9965, sd 0.0252, 29 days. Window ratio 0.9982.
- Fee getters at block 59892691: `performanceFee()` = 0, `managementFee()` = 0 (performance fee 0.00%).
- Morpho API (2026-11-20T10:36:41.249Z): "Gauntlet USDC Prime", Vault V2, fee 0, apy 5.5143%, netApy 5.5143%, avgNetApy(1d) 8.036%.
- RPC: https://mainnet.base.org, https://base-rpc.publicnode.com. Cross-check: ok (https://mainnet.base.org vs https://base-rpc.publicnode.com).

### (extra) — STEAKUSDC (morpho-blue, Base) — match

- Verdict: published 30d mean 3.994% vs realized 3.981%: 0.014 pp, 0.3% relative
- DeFiLlama pool `81ae8812-f04f-4f6e-9d71-ee5778f3a178` (https://defillama.com/yields/pool/81ae8812-f04f-4f6e-9d71-ee5778f3a178), pool key `morpho-vault-v1-0xbeeF010f9cb27031ad51e3333f9aF9C6B1228183-base`, url https://app.morpho.org/base/vault/0xbeeF010f9cb27031ad51e3333f9aF9C6B1228183
- Vault `0xbeeF010f9cb27031ad51e3333f9aF9C6B1228183` on base (chain id 8453), on-chain symbol steakUSDC, asset `0x833589fcd6edb6e08f4c7c32d4f71b54bda02913` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v1-0xbeeF010f9cb27031ad51e3333f9aF9C6B1228183-base". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 52917190 at 2026-10-21T23:02:07Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1104983317819841103
  - 7d start: block 56670556 at 2026-11-12T23:01:26Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1107612436796467910
  - end: block 59892691 at 2026-11-20T10:01:53Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1108470020997689947
- Realized: 30d 3.981%, 7d 3.860%. Published base mean: 30d 3.994%, 7d 3.891%. DeFiLlama `apyMean30d` 3.923%. Now: apy 7.057, apyBase 7.057, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.994, sd 0.0298, 29 days. Window ratio 0.9966.
- Fee getters at block 59892691: `fee()` = 250000000000000000 (performance fee 25.00%).
- Morpho API (2026-11-20T10:36:40.832Z): "Steakhouse USDC", Vault V1, fee 0.25, apy 7.3701%, netApy 5.4781%, avgNetApy(1d) 7.0201%.
- RPC: https://mainnet.base.org, https://base-rpc.publicnode.com. Cross-check: ok (https://mainnet.base.org vs https://base-rpc.publicnode.com).

### (extra) — GTUSDCP (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 4.894% vs realized 4.906%: -0.012 pp, 0.2% relative
- DeFiLlama pool `71b34441-5a46-431b-a9b3-8c081cd0d74c` (https://defillama.com/yields/pool/71b34441-5a46-431b-a9b3-8c081cd0d74c), pool key `morpho-vault-v2-0x8c106EEDAd96553e64287A5A6839c3Cc78afA3D0-ethereum`, url https://app.morpho.org/ethereum/vault/0x8c106EEDAd96553e64287A5A6839c3Cc78afA3D0
- Vault `0x8c106EEDAd96553e64287A5A6839c3Cc78afA3D0` on ethereum (chain id 1), on-chain symbol gtusdcp, asset `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v2-0x8c106EEDAd96553e64287A5A6839c3Cc78afA3D0-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1039784660779364429
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1042850731807157882
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1043811731118273763
- Realized: 30d 4.906%, 7d 4.611%. Published base mean: 30d 4.894%, 7d 4.533%. DeFiLlama `apyMean30d` 4.893%. Now: apy 4.992, apyBase 4.992, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0023, sd 0.0121, 29 days. Window ratio 1.0025.
- Fee getters at block 26455579: `performanceFee()` = 0, `managementFee()` = 0 (performance fee 0.00%).
- Morpho API (2026-11-20T10:36:35.218Z): "Gauntlet USDC Prime", Vault V2, fee 0, apy 5.0796%, netApy 5.0796%, avgNetApy(1d) 4.9924%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### (extra) — SENPYUSDPST (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 5.842% vs realized 5.884%: -0.042 pp, 0.7% relative
- DeFiLlama pool `d437f7b3-09ba-5450-be41-d2b7d0e9406d` (https://defillama.com/yields/pool/d437f7b3-09ba-5450-be41-d2b7d0e9406d), pool key `morpho-vault-v2-0x8381a156958711E230f325428B5eb4b6555C75D9-ethereum`, url https://app.morpho.org/ethereum/vault/0x8381a156958711E230f325428B5eb4b6555C75D9
- Vault `0x8381a156958711E230f325428B5eb4b6555C75D9` on ethereum (chain id 1), on-chain symbol senPYUSDPST, asset `0x6c3ea9036406852006290770bedfcaba0e23a0e8` (PYUSD). Resolved from: DeFiLlama pool key "morpho-vault-v2-0x8381a156958711E230f325428B5eb4b6555C75D9-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1008768733229357825
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1011825772009144123
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1013434324552212091
- Realized: 30d 5.884%, 7d 8.084%. Published base mean: 30d 5.842%, 7d 8.175%. DeFiLlama `apyMean30d` 7.298%. Now: apy 7.021, apyBase 5.968, apyReward 1.053 (reward 30d mean 1.489).
- Daily ratio realized/published: mean 1.0049, sd 0.0507, 29 days. Window ratio 1.0072.
- Fee getters at block 26455579: `performanceFee()` = 150000000000000000, `managementFee()` = 0 (performance fee 15.00%).
- Morpho API (2026-11-20T10:36:43.047Z): "Sentora Huma PST Main", Vault V2, fee 0.15, apy 7.0904%, netApy 7.0483%, avgNetApy(1d) 7.021%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### (extra) — STEAKUSDC (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 4.754% vs realized 4.749%: 0.005 pp, 0.1% relative
- DeFiLlama pool `b55f43a8-f444-4cd8-a3a4-0a4e786ba566` (https://defillama.com/yields/pool/b55f43a8-f444-4cd8-a3a4-0a4e786ba566), pool key `morpho-vault-v1-0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB-ethereum`, url https://app.morpho.org/ethereum/vault/0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB
- Vault `0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB` on ethereum (chain id 1), on-chain symbol steakUSDC, asset `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v1-0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1144930892505989845
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1148214726047429775
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1149226037127178672
- Realized: 30d 4.749%, 7d 4.402%. Published base mean: 30d 4.754%, 7d 4.337%. DeFiLlama `apyMean30d` 4.736%. Now: apy 4.730, apyBase 4.730, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9989, sd 0.0135, 29 days. Window ratio 0.999.
- Fee getters at block 26455579: `fee()` = 50000000000000000 (performance fee 5.00%).
- Morpho API (2026-11-20T10:36:43.911Z): "Steakhouse USDC", Vault V1, fee 0.05, apy 4.6953%, netApy 4.4554%, avgNetApy(1d) 4.7313%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### (extra) — STEAKUSDT (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 3.981% vs realized 3.957%: 0.023 pp, 0.6% relative
- DeFiLlama pool `ded5a855-23c1-459d-8390-ba2707fac7c5` (https://defillama.com/yields/pool/ded5a855-23c1-459d-8390-ba2707fac7c5), pool key `morpho-vault-v1-0xbEef047a543E45807105E51A8BBEFCc5950fcfBa-ethereum`, url https://app.morpho.org/ethereum/vault/0xbEef047a543E45807105E51A8BBEFCc5950fcfBa
- Vault `0xbEef047a543E45807105E51A8BBEFCc5950fcfBa` on ethereum (chain id 1), on-chain symbol steakUSDT, asset `0xdac17f958d2ee523a2206206994597c13d831ec7` (USDT). Resolved from: DeFiLlama pool key "morpho-vault-v1-0xbEef047a543E45807105E51A8BBEFCc5950fcfBa-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1134470351666997213
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1137305124705114354
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1138029380306132878
- Realized: 30d 3.957%, 7d 3.164%. Published base mean: 30d 3.981%, 7d 3.174%. DeFiLlama `apyMean30d` 3.931%. Now: apy 3.216, apyBase 3.216, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9996, sd 0.015, 29 days. Window ratio 0.9941.
- Fee getters at block 26455579: `fee()` = 50000000000000000 (performance fee 5.00%).
- Morpho API (2026-11-20T10:36:54.652Z): "Steakhouse USDT", Vault V1, fee 0.05, apy 3.0136%, netApy 2.8608%, avgNetApy(1d) 3.2225%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### (extra) — SPARKUSDTBC (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 3.714% vs realized 3.756%: -0.042 pp, 1.1% relative
- DeFiLlama pool `95161b3c-7d6e-4c02-a0d7-878ac357ebbf` (https://defillama.com/yields/pool/95161b3c-7d6e-4c02-a0d7-878ac357ebbf), pool key `morpho-vault-v2-0xb0c424116172B55CbB6dD3136F5989F7959e5B91-ethereum`, url https://app.morpho.org/ethereum/vault/0xb0c424116172B55CbB6dD3136F5989F7959e5B91
- Vault `0xb0c424116172B55CbB6dD3136F5989F7959e5B91` on ethereum (chain id 1), on-chain symbol sparkUSDTbc, asset `0xdac17f958d2ee523a2206206994597c13d831ec7` (USDT). Resolved from: DeFiLlama pool key "morpho-vault-v2-0xb0c424116172B55CbB6dD3136F5989F7959e5B91-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 29 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1016540619972702239
  - 7d start: block 26408600 at 2026-11-13T21:01:35Z (DeFiLlama point 2026-11-13T21:01:36Z), share price 1019063324353292647
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1019570002140720146
- Realized: 30d 3.756%, 7d 2.812%. Published base mean: 30d 3.714%, 7d 2.815%. DeFiLlama `apyMean30d` 3.710%. Now: apy 3.037, apyBase 3.037, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0084, sd 0.0338, 28 days. Window ratio 1.0113.
- Fee getters at block 26455579: `performanceFee()` = 100000000000000000, `managementFee()` = 0 (performance fee 10.00%).
- Morpho API (2026-11-20T10:36:56.167Z): "Spark Blue Chip USDT Vault", Vault V2, fee 0.1, apy 2.9996%, netApy 2.6957%, avgNetApy(1d) 3.0366%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Note: 1 gap(s) longer than 36h in the DeFiLlama daily series.

### (extra) — ARMUSDCS (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 6.326% vs realized 6.307%: 0.019 pp, 0.3% relative
- DeFiLlama pool `d2a99602-b0c7-4f6a-a329-82bdaad3df0c` (https://defillama.com/yields/pool/d2a99602-b0c7-4f6a-a329-82bdaad3df0c), pool key `morpho-vault-v2-0xA2EAaD0D586cF9FD73bb2c09cF6A7E3e187D68cd-ethereum`, url https://app.morpho.org/ethereum/vault/0xA2EAaD0D586cF9FD73bb2c09cF6A7E3e187D68cd
- Vault `0xA2EAaD0D586cF9FD73bb2c09cF6A7E3e187D68cd` on ethereum (chain id 1), on-chain symbol armUSDCs, asset `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v2-0xA2EAaD0D586cF9FD73bb2c09cF6A7E3e187D68cd-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1022831416741953737
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1026608008380910725
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1027892788715217104
- Realized: 30d 6.307%, 7d 6.312%. Published base mean: 30d 6.326%, 7d 6.329%. DeFiLlama `apyMean30d` 6.355%. Now: apy 6.860, apyBase 6.804, apyReward 0.056 (reward 30d mean 0.057).
- Daily ratio realized/published: mean 0.9974, sd 0.0117, 29 days. Window ratio 0.997.
- Fee getters at block 26455579: `performanceFee()` = 0, `managementFee()` = 0 (performance fee 0.00%).
- Morpho API (2026-11-20T10:36:51.784Z): "Wintermute USDC Select", Vault V2, fee 0, apy 6.036%, netApy 6.0922%, avgNetApy(1d) 6.8035%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### (extra) — SKYMONEYUSDTSAVINGS (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 3.401% vs realized 3.438%: -0.037 pp, 1.1% relative
- DeFiLlama pool `89641d1d-6ee2-431b-b131-a0b49c59e2c5` (https://defillama.com/yields/pool/89641d1d-6ee2-431b-b131-a0b49c59e2c5), pool key `morpho-vault-v2-0x23f5E9c35820f4baB695Ac1F19c203cC3f8e1e11-ethereum`, url https://app.morpho.org/ethereum/vault/0x23f5E9c35820f4baB695Ac1F19c203cC3f8e1e11
- Vault `0x23f5E9c35820f4baB695Ac1F19c203cC3f8e1e11` on ethereum (chain id 1), on-chain symbol skyMoneyUsdtSavings, asset `0xdac17f958d2ee523a2206206994597c13d831ec7` (USDT). Resolved from: DeFiLlama pool key "morpho-vault-v2-0x23f5E9c35820f4baB695Ac1F19c203cC3f8e1e11-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1018233634123618391
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1020032006863031377
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1021014870994536715
- Realized: 30d 3.438%, 7d 4.826%. Published base mean: 30d 3.401%, 7d 4.743%. DeFiLlama `apyMean30d` 3.956%. Now: apy 12.093, apyBase 11.162, apyReward 0.931 (reward 30d mean 0.705).
- Daily ratio realized/published: mean 0.9979, sd 0.0343, 29 days. Window ratio 1.0109.
- Fee getters at block 26455579: `performanceFee()` = 0, `managementFee()` = 0 (performance fee 0.00%).
- Morpho API (2026-11-20T10:36:56.168Z): "sky.money USDT Savings", Vault V2, fee 0, apy 4.5255%, netApy 5.4565%, avgNetApy(1d) 12.0932%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### (extra) — BBQUSDC (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 6.821% vs realized 6.803%: 0.018 pp, 0.3% relative
- DeFiLlama pool `f8d7740c-4cef-420e-a944-1b7caffde643` (https://defillama.com/yields/pool/f8d7740c-4cef-420e-a944-1b7caffde643), pool key `morpho-vault-v2-0xbeeff2C5bF38f90e3482a8b19F12E5a6D2FCa757-ethereum`, url https://app.morpho.org/ethereum/vault/0xbeeff2C5bF38f90e3482a8b19F12E5a6D2FCa757
- Vault `0xbeeff2C5bF38f90e3482a8b19F12E5a6D2FCa757` on ethereum (chain id 1), on-chain symbol bbqUSDC, asset `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v2-0xbeeff2C5bF38f90e3482a8b19F12E5a6D2FCa757-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1054203207098094689
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1058487245460540595
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1059817885251436834
- Realized: 30d 6.803%, 7d 6.341%. Published base mean: 30d 6.822%, 7d 6.321%. DeFiLlama `apyMean30d` 6.780%. Now: apy 7.152, apyBase 7.152, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0015, sd 0.0258, 29 days. Window ratio 0.9973.
- Fee getters at block 26455579: `performanceFee()` = 50000000000000000, `managementFee()` = 0 (performance fee 5.00%).
- Morpho API (2026-11-20T10:36:59.962Z): "Steakhouse High Yield USDC", Vault V2, fee 0.05, apy 6.2875%, netApy 5.9639%, avgNetApy(1d) 7.1518%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### (extra) — CSCBUSDC (morpho-blue, Base) — match

- Verdict: published 30d mean 5.272% vs realized 5.286%: -0.014 pp, 0.3% relative
- DeFiLlama pool `097b18e2-9232-4c44-bd2e-502de4ba889e` (https://defillama.com/yields/pool/097b18e2-9232-4c44-bd2e-502de4ba889e), pool key `morpho-vault-v2-0x91C056B6d4311a743614FBc03ac32d4E6A2d3a3c-base`, url https://app.morpho.org/base/vault/0x91C056B6d4311a743614FBc03ac32d4E6A2d3a3c
- Vault `0x91C056B6d4311a743614FBc03ac32d4E6A2d3a3c` on base (chain id 8453), on-chain symbol CSCBUSDC, asset `0x833589fcd6edb6e08f4c7c32d4f71b54bda02913` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v2-0x91C056B6d4311a743614FBc03ac32d4E6A2d3a3c-base". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 52917190 at 2026-10-21T23:02:07Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1030853759360065224
  - 7d start: block 56670556 at 2026-11-12T23:01:26Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1034021173467053299
  - end: block 59892691 at 2026-11-20T10:01:53Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1035148384245480799
- Realized: 30d 5.286%, 7d 5.476%. Published base mean: 30d 5.272%, 7d 5.431%. DeFiLlama `apyMean30d` 6.614%. Now: apy 9.293, apyBase 7.893, apyReward 1.400 (reward 30d mean 1.430).
- Daily ratio realized/published: mean 1.0004, sd 0.0321, 29 days. Window ratio 1.0027.
- Fee getters at block 59892691: `performanceFee()` = 100000000000000000, `managementFee()` = 0 (performance fee 10.00%).
- Morpho API (2026-11-20T10:37:02.735Z): "Clearstar cbAssets Vault", Vault V2, fee 0.1, apy 7.7696%, netApy 8.3662%, avgNetApy(1d) 9.2932%.
- RPC: https://mainnet.base.org, https://base-rpc.publicnode.com. Cross-check: ok (https://mainnet.base.org vs https://base-rpc.publicnode.com).

### (extra) — ROXUSDCY (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 8.407% vs realized 8.351%: 0.056 pp, 0.7% relative
- DeFiLlama pool `caa9ffc0-2983-4c18-9556-4e3ad4dfe6ac` (https://defillama.com/yields/pool/caa9ffc0-2983-4c18-9556-4e3ad4dfe6ac), pool key `morpho-vault-v2-0xE0181090c22579B6A217f1522cbf8c9f1F0C1965-ethereum`, url https://app.morpho.org/ethereum/vault/0xE0181090c22579B6A217f1522cbf8c9f1F0C1965
- Vault `0xE0181090c22579B6A217f1522cbf8c9f1F0C1965` on ethereum (chain id 1), on-chain symbol roxUSDCy, asset `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v2-0xE0181090c22579B6A217f1522cbf8c9f1F0C1965-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1033980720805855266
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1038957333230443532
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1040695741038459145
- Realized: 30d 8.351%, 7d 8.525%. Published base mean: 30d 8.407%, 7d 8.672%. DeFiLlama `apyMean30d` 9.030%. Now: apy 11.263, apyBase 10.296, apyReward 0.967 (reward 30d mean 0.738).
- Daily ratio realized/published: mean 1.0011, sd 0.0431, 29 days. Window ratio 0.9933.
- Fee getters at block 26455579: `performanceFee()` = 50000000000000000, `managementFee()` = 0 (performance fee 5.00%).
- Morpho API (2026-11-20T10:37:02.405Z): "RockawayX USDC Yield", Vault V2, fee 0.05, apy 7.7769%, netApy 8.2467%, avgNetApy(1d) 11.2632%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

## RPC endpoints

| Chain | Used (passed chain-id and 31-day archive probe) | Rejected |
|---|---|---|
| ethereum (1) | https://eth-mainnet.public.blastapi.io<br>https://eth.drpc.org<br>https://mainnet.gateway.tenderly.co | - |
| base (8453) | https://mainnet.base.org<br>https://base-rpc.publicnode.com | https://base.drpc.org: probe failed: 15 You reached Public endpoint rate limit, please upgrade to paid plan |

## How to reproduce

```
git clone https://github.com/TokenBrice/pharos-watch   # commit ref: refs/heads/yield-restricted-reward-base-apy
node share-price-check.mjs path/to/pharos-watch --out reports
```

- Node 20 or later, no dependencies, no API key. The script only reads: the config files as text, `https://yields.llama.fi/poolsEnriched?pool=<id>`, `https://yields.llama.fi/chart/<id>`, `https://api.morpho.org/graphql` for Morpho vaults, and `eth_call` / `eth_getBlockByNumber` on the public RPCs listed above.
- Address resolution: the 0x address inside DeFiLlama's own pool key (`pool_old` in `/poolsEnriched`), then the pool url, then the contract in the Pharos coin file for the pinned id (accepted only if its `asset()` is one of the pool's DeFiLlama `underlyingTokens`). No address is guessed.
- To recompute one number by hand: call `convertToAssets(shares)` on the vault at the start and end blocks listed above, then `(end/start)^(31536000/(tEnd−tStart)) − 1`.
- Block numbers are found by binary search on block timestamps (last block at or before the DeFiLlama point), never by block count.
- `--pools <uuid,...>` checks DeFiLlama pools that are not in the config. `--pair <uuid>=<chain>:<address>` compares a pool with an explicit address. `--prefer <substring>` puts a given RPC first.
- Raw data, including every daily point and the cross-check, is in `2026-11-20-morpho-largest.json`.
