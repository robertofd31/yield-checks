# Share-price check of the DeFiLlama-sourced yield rows

Run at 2026-11-20T10:35:49.182Z. Pharos config: `worker/src/lib/yield-config` at commit `61009b0b88613291ac22e2b515928456252f9389`.

For each DeFiLlama pool id, the realized APY is the growth of the vault's share price (`convertToAssets`) between blocks found by timestamp, annualized on the real elapsed seconds. It is compared with what DeFiLlama published for the same days. The share price carries base yield only, so the comparison uses DeFiLlama's `apyBase`; rewards are listed separately.

## Coverage

- Pool ids referenced in the config: **69** (49 are live sources: pinned or explicit pools; the rest are history handoffs, exclusions, or ids in comments).
- Checked against a share price: **34** (31 of the 49 live sources).
- Anchors reproduced on a second RPC: 32 of 34. Single RPC only: 2.
- GET https://api.pharos.watch/api/yield-rankings without a key returned HTTP 401; the Pharos apy30d column is left out.

| Class | Pools |
|---|---|
| unexplained | 3 |
| steady-ratio | 1 |
| window-or-spike | 5 |
| match | 25 |
| not-checkable | 22 |
| unresolved | 13 |

## Checked pools

All figures are % APY. "Published" is the plain mean of DeFiLlama's daily `apyBase` (or `apy` where `apyBase` is missing) over the window. Ratio is daily realized / daily published, mean ± standard deviation.

| Class | Pinned as | Pool | TVL | Realized 30d | Published 30d | Diff pp | DL apyMean30d | Realized 7d | Published 7d | DL now (apy / base / reward) | Ratio | Fee | 2 RPCs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| unexplained | susdai-usd-ai | [SUSDAI · usd-ai · Arbitrum](https://defillama.com/yields/pool/712ce948-bd9e-4f4a-8916-b72c447f7578) | $440.5M | 8.30 | 6.62 | -1.68 | 6.59 | 8.29 | 6.76 | 6.75 / 6.75 / - | 1.260 ± 0.812 | - | ok |
| unexplained | sgho-aave | [SGHO · aave-v3 · Ethereum](https://defillama.com/yields/pool/ff2a68af-030c-4697-b0a1-b62a738eaef0) | $11.7M | 4.60 | 0.00 | -4.60 | 0.00 | 4.60 | 0.00 | 0.00 / - / 0.00 | - | - | ok |
| unexplained | srusde-strata | [SRUSDE · strata-markets · Ethereum](https://defillama.com/yields/pool/843be062-d836-43ef-9670-c78d6ecb60bf) | $3.3M | 4.85 | 4.48 | -0.37 | 4.52 | 4.42 | 4.36 | 3.80 / 3.80 / - | 1.105 ± 0.356 | - | ok |
| steady-ratio | apyusd-apyx | [APXUSD · apyx-protocol · Ethereum](https://defillama.com/yields/pool/cb6139f9-4a68-4efd-8245-0312a92aee55) | $124.7M | 14.09 | 13.18 | -0.91 | 13.19 | 14.14 | 13.27 | 13.64 / 13.64 / - | 1.069 ± 0.024 | - | ok |
| window-or-spike | savusd-avant | [SAVUSD · avant-avusd · Avalanche](https://defillama.com/yields/pool/c74227a1-e738-4021-bbe1-13363815aecb) | $70.6M | 8.03 | 7.82 | -0.20 | 7.81 | 8.95 | 8.10 | 8.35 / 8.35 / - | 1.018 ± 0.075 | - | ok |
| window-or-spike | yvusdc-yearn | [USDC · yearn-finance · Ethereum](https://defillama.com/yields/pool/7d89af7a-24c9-4292-aa38-7c71b05fbd6d) | $18.2M | 4.64 | 3.89 | -0.74 | 3.96 | 4.42 | 4.42 | 4.60 / 4.60 / - | 1.218 ± 0.349 | - | ok |
| window-or-spike | ybold-yearn | [YBOLD · yearn-finance · Ethereum](https://defillama.com/yields/pool/4c29f645-12db-461f-a1d7-16900d624271) | $7.2M | 5.45 | 5.08 | -0.37 | 5.05 | 6.08 | 5.10 | 5.42 / 5.42 / - | 1.077 ± 0.490 | - | ok |
| window-or-spike | (history-handoff) | [SDUSD · dtrinity-dusd · Ethereum](https://defillama.com/yields/pool/78049985-79a8-4343-8618-3c27d41d5054) | $42k | 7.27 | 7.58 | 0.31 | 7.25 | 3.64 | 3.61 | 4.33 / 4.33 / - | 1.001 ± 0.009 | - | ok |
| window-or-spike | (history-handoff) | [SDUSD · dtrinity-dusd · Fraxtal](https://defillama.com/yields/pool/f42cf641-393d-4671-895a-3c85cf7b1a57) | $29k | 50.96 | 58.45 | 7.49 | 57.87 | 149.38 | 156.39 | 118.95 / 118.95 / - | 0.999 ± 0.005 | - | ok |
| match | susds-sky | [SUSDS · sky-lending · Ethereum](https://defillama.com/yields/pool/d8c4eff5-c8a9-46fc-a888-057c4c668e72) | $1.99B | 3.80 | 3.80 | 0.00 | 3.80 | 3.80 | 3.80 | 3.80 / 3.80 / - | 1.000 ± 0.000 | - | ok |
| match | susde-ethena | [SUSDE · ethena-usde · Ethereum](https://defillama.com/yields/pool/66985a81-9c51-46ca-9977-42b4fe7bc6df) | $1.17B | 5.12 | 5.11 | -0.01 | 5.13 | 5.27 | 5.23 | 4.82 / 4.82 / - | 1.002 ± 0.019 | - | ok |
| match | syrupusdc-maple | [USDC · maple · Ethereum](https://defillama.com/yields/pool/43641cf5-a92e-416b-bce9-27113d3c0db6) | $756.2M | 5.16 | 5.13 | -0.03 | 5.13 | 5.24 | 5.22 | 5.24 / 5.24 / 0.00 | 1.004 ± 0.022 | - | ok |
| match | steakusdg-steakhouse | [STEAKUSDG · morpho-blue · Robinhood Chain](https://defillama.com/yields/pool/32f586b4-5358-5aa2-88ee-c842139e7023) | $544.9M | 4.04 | 4.05 | 0.01 | 7.66 | 3.83 | 3.84 | 7.00 / 3.76 / 3.24 | 1.000 ± 0.006 | 0.0% | single-rpc |
| match | susdc-spark | [USDC · spark-savings · Ethereum](https://defillama.com/yields/pool/c5c74dd1-995c-4445-9d84-3e710bad7d52) | $272.8M | 3.80 | 3.80 | 0.00 | 3.80 | 3.80 | 3.80 | 3.80 / 3.80 / - | 1.000 ± 0.000 | - | ok |
| match | susdt-spark | [USDT · spark-savings · Ethereum](https://defillama.com/yields/pool/a5d67f7e-5b51-4a9d-969d-caf051a7f5a4) | $244.5M | 3.99 | 4.00 | 0.01 | 3.99 | 4.22 | 4.25 | 4.25 / 4.25 / - | 0.997 ± 0.012 | - | ok |
| match | syrupusdt-maple | [USDT · maple · Ethereum](https://defillama.com/yields/pool/8edfdf02-cdbb-43f7-bca6-954e5fe56813) | $242.5M | 4.97 | 4.97 | -0.00 | 4.98 | 5.03 | 5.01 | 4.98 / 4.98 / 0.00 | 1.000 ± 0.061 | - | ok |
| match | usd3-3jane | [USD3 · 3jane-lending · Ethereum](https://defillama.com/yields/pool/f8cd444e-d99f-4132-b234-fd3482bf8806) | $121.1M | 6.60 | 6.55 | -0.06 | 6.55 | 6.92 | 6.66 | 6.98 / 6.98 / - | 1.007 ± 0.054 | - | ok |
| match | steakusdc-steakhouse | [STEAKUSDC · morpho-blue · Ethereum](https://defillama.com/yields/pool/931ea9be-5f4d-428e-beaf-205fc5b4e2b5) | $116.6M | 5.00 | 4.99 | -0.01 | 4.98 | 4.64 | 4.56 | 5.00 / 5.00 / 0.00 | 1.002 ± 0.015 | 0.0% | ok |
| match | wsrusd-reservoir | [WSRUSD · reservoir-protocol · Ethereum](https://defillama.com/yields/pool/d646f32f-d5af-4e34-a29f-8ebeea6a8520) | $95.1M | 6.15 | 6.16 | 0.01 | 6.15 | 6.00 | 6.00 | 6.00 / - / - | 0.999 ± 0.008 | - | ok |
| match | steakusdt-steakhouse | [STEAKUSDT · morpho-blue · Ethereum](https://defillama.com/yields/pool/ef5d3acb-b974-4db1-8076-e8db9f142493) | $75.5M | 4.17 | 4.20 | 0.03 | 4.14 | 3.34 | 3.36 | 3.43 / 3.43 / 0.00 | 0.998 ± 0.019 | 0.0% | ok |
| match | stcusd-cap | [STCUSD · cap · Ethereum](https://defillama.com/yields/pool/bf6ca887-e357-49ec-8031-0d1a6141c455) | $52.7M | 5.87 | 5.88 | 0.00 | 5.86 | 6.20 | 6.24 | 5.90 / - / - | 1.000 ± 0.002 | - | ok |
| match | iusd-infinifi | [SIUSD · infinifi · Ethereum](https://defillama.com/yields/pool/8fa2e60e-365a-41fc-8d50-fadde5041f94) | $52.5M | 6.71 | 6.73 | 0.01 | 6.73 | 6.78 | 6.82 | 7.47 / 7.47 / - | 0.997 ± 0.018 | - | ok |
| match | sfrxusd-frax | [SFRXUSD · frax · Ethereum](https://defillama.com/yields/pool/42523cca-14b0-44f6-95fb-4781069520a5) | $39.2M | 5.16 | 5.16 | -0.00 | 5.16 | 5.27 | 5.27 | 5.07 / 5.07 / - | 1.001 ± 0.003 | - | ok |
| match | susdf-falcon | [SUSDF · falcon-finance · Ethereum](https://defillama.com/yields/pool/0f67a08c-3f24-4a4b-963e-541f5a5c0364) | $38.2M | 3.85 | 3.87 | 0.02 | 3.89 | 3.75 | 3.64 | 3.56 / 3.56 / - | 0.964 ± 0.573 | - | ok |
| match | sdai-gnosis | [SDAI · sdai · Gnosis](https://defillama.com/yields/pool/13392973-be6e-4b2f-bce9-4f7dd53d1c3a) | $36.5M | 4.75 | 4.68 | -0.06 | 4.68 | 4.78 | 4.72 | 4.77 / 4.77 / - | 1.014 ± 0.009 | - | ok |
| match | yzusd-yuzu / syzusd-yuzu | [SYZUSD · yuzu-money · Plasma](https://defillama.com/yields/pool/6174b1d6-8212-4964-95bf-ca9c539864ba) | $23.1M | 8.38 | 8.32 | -0.06 | 8.29 | 8.38 | 8.40 | 8.36 / 8.36 / - | 1.009 ± 0.102 | - | ok |
| match | scrvusd-curve | [SCRVUSD · crvusd · Ethereum](https://defillama.com/yields/pool/5fd328af-4203-471b-bd16-1705c726d926) | $20.8M | 5.15 | 5.12 | -0.03 | 5.03 | 7.12 | 7.11 | 7.97 / 7.97 / - | 1.000 ± 0.005 | - | ok |
| match | sdola-inverse-finance | [SDOLA · inverse-finance-firm · Ethereum](https://defillama.com/yields/pool/bf0f95c9-bc46-467d-9762-1d80ff50cd74) | $19.3M | 6.14 | 6.19 | 0.05 | 6.13 | 6.32 | 6.45 | 5.14 / 5.14 / - | 0.997 ± 0.032 | - | ok |
| match | gtusdc-gauntlet | [GTUSDC · morpho-blue · Ethereum](https://defillama.com/yields/pool/a306885c-001e-4479-9ae8-459a56527bc1) | $16.9M | 4.66 | 4.66 | 0.00 | 4.64 | 4.37 | 4.31 | 4.72 / 4.72 / 0.00 | 0.999 ± 0.016 | 5.0% | ok |
| match | said-gaib | [SAID · gaib · Ethereum](https://defillama.com/yields/pool/e575606e-5642-4f87-b9ad-3e53d6f83c82) | $15.7M | 10.60 | 10.56 | -0.03 | 10.57 | 11.33 | 10.55 | 10.61 / 10.61 / - | 1.004 ± 0.192 | - | ok |
| match | bbqusdc-steakhouse | [BBQUSDC · morpho-blue · Ethereum](https://defillama.com/yields/pool/36977448-9ad9-43ea-85f2-60ee1b92ecd0) | $10.5M | 6.44 | 6.47 | 0.03 | 6.40 | 6.11 | 6.10 | 7.45 / 7.45 / 0.00 | 0.998 ± 0.011 | 10.0% | ok |
| match | xaut-tether | [XAUT · lista-lending · BSC](https://defillama.com/yields/pool/b89d44a1-052a-4ec8-8dba-7802340fee27) | $2.3M | 0.25 | 0.25 | -0.00 | 0.25 | 0.00 | 0.00 | 0.00 / 0.00 / 0.00 | 1.017 ± 0.068 | 10.0% | single-rpc |
| match | xaut-tether | [XAUT · yo-protocol · Ethereum](https://defillama.com/yields/pool/653c3979-83bc-40c9-aba0-f01a5ba0d118) | $1.8M | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 / 0.00 / - | - | - | ok |
| match | (history-handoff) | [SDUSD · dtrinity-dusd · Sonic](https://defillama.com/yields/pool/664664bb-31e0-4e65-808d-6dc82bdb05bb) | $33k | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 / 0.00 / - | - | - | ok |

## Not checked

| Class | Pinned as / role | Pool | Reason |
|---|---|---|---|
| not-checkable | usdy-ondo-finance (pinned) | [USDY · ondo-yield-assets · Ethereum](https://defillama.com/yields/pool/ac61ee82-2fe4-4f9b-a9cd-7fb33f598859) | no ERC-4626 share price at the resolved address (0x96f6ef951840721adbf46ac996b59e0235cb985c: asset() reverts or is empty: not an ERC-4626 vault) |
| not-checkable | busd0-usual (pinned) | [BUSD0 · usual-usd0 · Ethereum](https://defillama.com/yields/pool/55b0893b-1dbb-47fd-9912-5e439cd3d511) | no ERC-4626 share price at the resolved address (0x35D8949372D46B7a3D5A56006AE77B215fc69bC0: asset() reverts or is empty: not an ERC-4626 vault) |
| not-checkable | ustb-superstate (pinned) | [USTB · invesco-ustb · Ethereum](https://defillama.com/yields/pool/1910847a-f8b5-40ce-a1ab-1dafdded5fbb) | no ERC-4626 share price at the resolved address (0x43415eB6ff9DB7E26A15b704e7A3eDCe97d31C4e: asset() reverts or is empty: not an ERC-4626 vault) |
| not-checkable | ousg-ondo-finance (pinned) | [OUSG · ondo-yield-assets · Ethereum](https://defillama.com/yields/pool/7436db9b-2872-46c8-81a2-da6baff902b7) | no ERC-4626 share price at the resolved address (0x1b19c19393e2d034d8ff31ff34c81252fcbbee92: asset() reverts or is empty: not an ERC-4626 vault) |
| not-checkable | - (exclusion) | [XLM · blend-pools-v2 · Stellar](https://defillama.com/yields/pool/e8a6579f-75bd-4b55-9084-de31affed8e2) | non-EVM chain (Stellar): no eth_call share price |
| not-checkable | fxusd-f-x-protocol (pinned) | [FXUSDSTABILITYPOOLV2.0 · fx-protocol · Ethereum](https://defillama.com/yields/pool/abd6c9e1-3b52-459a-a31b-9022a4dcf7e2) | no ERC-4626 share price at the resolved address (0xEd92dDe3214c24Ae04F5f96927E3bE8f8DbC3289: asset() reverts or is empty: not an ERC-4626 vault; 0x085780639cc2cacd35e474e71f4d000e2405d8f6: asset() reverts or is empty: not an ERC-4626 vault) |
| not-checkable | yusd-aegis (pinned) | [YUSD · aegis-yusd · Ethereum](https://defillama.com/yields/pool/f91b2168-c279-475c-a98a-673220f4fee7) | no ERC-4626 share price at the resolved address (0x4274cd7277c7bb0806bd5fe84b9adae466a8da0a: asset() reverts or is empty: not an ERC-4626 vault) |
| not-checkable | usyc-hashnote (pinned) | [USYC · circle-usyc · Ethereum](https://defillama.com/yields/pool/448a64ff-06fd-4e56-b63c-03662ac39010) | no ERC-4626 share price at the resolved address (0x136471a34f6ef19fe571effc1ca711fdb8e49f2b: asset() reverts or is empty: not an ERC-4626 vault) |
| not-checkable | vbill-vaneck (pinned) | [VBILL · vaneck-treasury-fund · BSC](https://defillama.com/yields/pool/2f7d9d91-af21-4424-92e4-1c8aef7e8f76) | no ERC-4626 share price at the resolved address (0x14d72634328c4d03bba184a48081df65f1911279: asset() reverts or is empty: not an ERC-4626 vault) |
| not-checkable | tbill-openeden (pinned) | [TBILL · openeden-tbill · Ethereum](https://defillama.com/yields/pool/e140f3b2-0327-46ea-93f5-88b17b0a0a16) | no ERC-4626 share price at the resolved address (0xdd50c053c096cb04a3e3362e2b622529ec5f2e8a: asset() reverts or is empty: not an ERC-4626 vault) |
| not-checkable | - (comment-only) | [USDO · openeden-usdo · Ethereum](https://defillama.com/yields/pool/f083596e-032d-4d6b-a7a8-1836d3f99bcd) | no ERC-4626 share price at the resolved address (0x8238884ec9668ef77b90c6dff4d1a9f4f4823bfe: asset() reverts or is empty: not an ERC-4626 vault) |
| not-checkable | zchf-frankencoin (explicit) | [ZCHF · frankencoin · Ethereum](https://defillama.com/yields/pool/8b427366-7bfb-4c61-88be-8dc004fdc3da) | no ERC-4626 share price at the resolved address (0x27d9ad987bde08a0d083ef7e0e4043c857a17b38: no decimals(): not a token contract; 0xb58e61c3098d85632df34eecfb899a1ed80921cb: asset() reverts or is empty: not an ERC-4626 vault) |
| not-checkable | - (exclusion) | [USDC · blend-pools-v2 · Stellar](https://defillama.com/yields/pool/ecf788e3-d2ef-4fdd-9ece-8a2d96226ddf) | non-EVM chain (Stellar): no eth_call share price |
| not-checkable | ousd-origin-protocol (pinned) | [OUSD · origin-dollar · Ethereum](https://defillama.com/yields/pool/529258ee-9b27-4fcf-a32c-b82abb3fda68) | no ERC-4626 share price at the resolved address (0x2A8e1E676Ec238d8A992307B495b45B3fEAa5e86: asset() reverts or is empty: not an ERC-4626 vault) |
| not-checkable | usdu-unitas (pinned) | [SUSDU · unitas-usdu · Solana](https://defillama.com/yields/pool/7f980c43-5b87-4690-a11a-b0e8a5e37a63) | non-EVM chain (Solana): no eth_call share price |
| not-checkable | usn-noon (pinned) | [SUSN · morpho-blue · Ethereum](https://defillama.com/yields/pool/a18a761b-49cd-416d-8342-839cac722094) | Morpho Market V1 pool (market id, collateral side): a lending market has no share token |
| not-checkable | dusd-dialectic (pinned) | [DUSD · makina · Ethereum](https://defillama.com/yields/pool/a0387f4b-18ba-5fb5-8171-0f177254dfeb) | no ERC-4626 share price at the resolved address (0x6b006870C83b1Cd49E766Ac9209f8d68763Df721: no decimals(): not a token contract; 0x1e33e98af620f1d563fcd3cfd3c75ace841204ef: asset() reverts or is empty: not an ERC-4626 vault) |
| not-checkable | paxg-paxos (explicit) | [PAXG · hydration-dex · Polkadot](https://defillama.com/yields/pool/d4a6ef0e-dbcb-4dbf-bdfc-b766808f402e) | non-EVM chain (Polkadot): no eth_call share price |
| not-checkable | usdo-openeden (pinned) | [USDO · openeden-usdo · BSC](https://defillama.com/yields/pool/85d9b9d3-3ca0-410c-bde0-d8ab07fe21c3) | no ERC-4626 share price at the resolved address (0x302e52aff9815b9d1682473dbfb9c74f9b750aa8: asset() reverts or is empty: not an ERC-4626 vault) |
| not-checkable | - (exclusion) | [XLM · blend-pools-v2 · Stellar](https://defillama.com/yields/pool/2d401ed8-2ced-4116-bda9-deb9058d423d) | non-EVM chain (Stellar): no eth_call share price |
| not-checkable | - (exclusion) | [EURC · blend-pools-v2 · Stellar](https://defillama.com/yields/pool/3a61420f-6f6e-45f9-accc-8d23f5a32d33) | non-EVM chain (Stellar): no eth_call share price |
| not-checkable | - (exclusion) | [USDC · blend-pools-v2 · Stellar](https://defillama.com/yields/pool/48c597dc-9367-4b4a-aa10-49b9755c4c2e) | non-EVM chain (Stellar): no eth_call share price |
| unresolved | yousd-yield-optimizer (pinned) | `c7c9e2c5-a3ea-4e6e-80d7-090fd2d604c5` | DeFiLlama /poolsEnriched returns no row for this id (pool delisted or no longer updated) |
| unresolved | nusd-neutrl (pinned) | `0f38d9a4-8e34-4abc-b9ba-25f326ef7828` | DeFiLlama /poolsEnriched returns no row for this id (pool delisted or no longer updated) |
| unresolved | - (comment-only) | `f51bb9f9-0a01-4aa2-9c62-b9ef6b55d109` | id appears only in a config comment and DeFiLlama no longer serves it |
| unresolved | - (history-handoff) | `2fe112ff-95a5-4ba0-8ee3-a741e6a8f7c9` | DeFiLlama /poolsEnriched returns no row for this id (pool delisted or no longer updated) |
| unresolved | - (exclusion) | `51752c3a-a277-4c54-b07f-5023bc476b71` | DeFiLlama /poolsEnriched returns no row for this id (pool delisted or no longer updated) |
| unresolved | - (exclusion) | `64bb6a50-3ace-4c90-960a-7e1e828e944f` | DeFiLlama /poolsEnriched returns no row for this id (pool delisted or no longer updated) |
| unresolved | - (exclusion) | `53406189-a08c-4654-8588-2eb4e83a44c9` | DeFiLlama /poolsEnriched returns no row for this id (pool delisted or no longer updated) |
| unresolved | - (exclusion) | `ca6ed758-967b-46ec-9e88-8fe50d7cc188` | DeFiLlama /poolsEnriched returns no row for this id (pool delisted or no longer updated) |
| unresolved | - (exclusion) | `240d9ba0-4701-4192-849f-507507668b88` | DeFiLlama /poolsEnriched returns no row for this id (pool delisted or no longer updated) |
| unresolved | - (exclusion) | `799fd51e-bd83-4a75-8ace-1f33d7e7ffc0` | DeFiLlama /poolsEnriched returns no row for this id (pool delisted or no longer updated) |
| unresolved | - (exclusion) | `16086e0b-cd47-41ec-8c4e-9b157c24ae6d` | DeFiLlama /poolsEnriched returns no row for this id (pool delisted or no longer updated) |
| unresolved | - (exclusion) | `cd52bdc8-a5d3-438e-af73-bdaaa3084630` | DeFiLlama /poolsEnriched returns no row for this id (pool delisted or no longer updated) |
| unresolved | - (exclusion) | `9a2f1f81-0a6e-441d-8219-c13b3520bd57` | DeFiLlama /poolsEnriched returns no row for this id (pool delisted or no longer updated) |

## Classes

- **match**: published and realized 30d differ by at most 0.15 pp and at most 5% of realized.
- **steady-ratio**: not a match, and the daily realized/published ratio has a standard deviation of at most 0.03 with a mean more than 0.02 away from 1, on at least 20 days. A constant ratio suggests a fee or a definition difference. If the contract has a WAD-scaled `fee()` or `performanceFee()`, the ratio is compared with 1 − fee.
- **window-or-spike**: not a match, and the difference is covered by timing: moving the window edges by up to 3 days covers the published mean, or the daily medians agree. This is a window difference, not an error.
- **unexplained**: none of the above. It needs a person to look.
- **not-checkable**: no share price to read this way (non-EVM chain, no ERC-4626 vault at the address, lending market, no archive RPC, too little history).
- **unresolved**: the id could not be tied to an address without guessing, or DeFiLlama no longer serves it.

## Per-pool detail

### susdai-usd-ai — SUSDAI (usd-ai, Arbitrum) — unexplained

- Verdict: published 30d mean 6.619% vs realized 8.297% (-1.678 pp); ratio mean 1.26 sd 0.8122; not covered by the window-edge or median tests
- DeFiLlama pool `712ce948-bd9e-4f4a-8916-b72c447f7578` (https://defillama.com/yields/pool/712ce948-bd9e-4f4a-8916-b72c447f7578), pool key `0x0B2b2B2076d95dda7817e785989fE353fe955ef9`, url https://app.usd.ai
- Vault `0x0B2b2B2076d95dda7817e785989fE353fe955ef9` on arbitrum (chain id 42161), on-chain symbol sUSDai, asset `0x0a1a1a107e45b7ced86833863f482bc5f4ed82ef` (USDai). Resolved from: DeFiLlama pool key "0x0B2b2B2076d95dda7817e785989fE353fe955ef9". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.5 days, 30 daily points.
  - 30d start: block 517040917 at 2026-10-21T22:01:36Z (DeFiLlama point 2026-10-21T22:01:36Z), share price 1120129383176047836000000000000
  - 7d start: block 523695651 at 2026-11-12T23:02:33Z (DeFiLlama point 2026-11-12T23:02:33Z), share price 1125535472653952821000000000000
  - end: block 525895042 at 2026-11-20T10:02:03Z (DeFiLlama point 2026-11-20T10:02:03Z), share price 1127368637641076809000000000000
- Realized: 30d 8.297%, 7d 8.290%. Published base mean: 30d 6.619%, 7d 6.764%. DeFiLlama `apyMean30d` 6.589%. Now: apy 6.750, apyBase 6.750, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.26, sd 0.8122, 29 days. Window ratio 1.2534.
- Timing: realized 30d moves between 8.0528% and 8.6084% when the edges shift by up to 3 days; 0 days with no share-price move; daily medians published 6.77%, realized 6.9848%.
- RPC: https://arbitrum-one.public.blastapi.io, https://arbitrum.gateway.tenderly.co. Cross-check: ok (https://arbitrum-one.public.blastapi.io vs https://arbitrum.gateway.tenderly.co).
- Non-compounded rate of realized 30d: 7.971%.

### sgho-aave — SGHO (aave-v3, Ethereum) — unexplained

- Verdict: published 30d mean 0.000% vs realized 4.603% (-4.603 pp); ratio mean - sd -; not covered by the window-edge or median tests
- DeFiLlama pool `ff2a68af-030c-4697-b0a1-b62a738eaef0` (https://defillama.com/yields/pool/ff2a68af-030c-4697-b0a1-b62a738eaef0), pool key `0x1a88df1cfe15af22b3c4c783d4e6f7f9e0c1885d-ethereum`, url https://app.aave.com/sgho/
- Vault `0xe1753f2e00940cc31213dd92013cf019dfe4ca1d` on ethereum (chain id 1), on-chain symbol sGho, asset `0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f` (GHO). Resolved from: Pharos coin file shared/data/stablecoins/coins/sgho-aave.json. Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244131 at 2026-10-21T23:01:11Z (DeFiLlama point 2026-10-21T23:01:21Z), share price 1018943040399919569523092910000
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:33Z), share price 1021710504614173611239863481000
  - end: block 26455577 at 2026-11-20T10:01:23Z (DeFiLlama point 2026-11-20T10:01:29Z), share price 1022650417281484809614858039000
- Realized: 30d 4.603%, 7d 4.603%. Published base mean: 30d 0.000%, 7d 0.000%. DeFiLlama `apyMean30d` 0.000%. Now: apy 0.000, apyBase -, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean -, sd -, 0 days. Window ratio -.
- Timing: realized 30d moves between 4.6028% and 4.6028% when the edges shift by up to 3 days; 0 days with no share-price move; daily medians published 0%, realized 4.6028%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Non-compounded rate of realized 30d: 4.500%.
- Note: The share price is read from 0xe1753f2e00940cc31213dd92013cf019dfe4ca1d (sGho), taken from the Pharos coin file shared/data/stablecoins/coins/sgho-aave.json. DeFiLlama's own pool key names a different contract, 0x1a88df1cfe15af22b3c4c783d4e6f7f9e0c1885d (stkGHO), which is not an ERC-4626 vault. A gap on this row may mean the pinned pool describes a different instrument than the tracked token.
- Note: apyBase is missing on 30 of 30 daily points; DeFiLlama's total apy is used for those days.

### srusde-strata — SRUSDE (strata-markets, Ethereum) — unexplained

- Verdict: published 30d mean 4.480% vs realized 4.851% (-0.372 pp); ratio mean 1.1052 sd 0.3559; not covered by the window-edge or median tests
- DeFiLlama pool `843be062-d836-43ef-9670-c78d6ecb60bf` (https://defillama.com/yields/pool/843be062-d836-43ef-9670-c78d6ecb60bf), pool key `0x3d7d6fdf07ee548b939a80edbc9b2256d0cdc003`, url https://strata.markets/
- Vault `0x3d7d6fdf07ee548b939a80edbc9b2256d0cdc003` on ethereum (chain id 1), on-chain symbol srUSDe, asset `0x4c9edd5852cd905f086c759e8383e09bff1e68b3` (USDe). Resolved from: DeFiLlama pool key "0x3d7d6fdf07ee548b939a80edbc9b2256d0cdc003". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 29 daily points.
  - 30d start: block 26244133 at 2026-10-21T23:01:35Z (DeFiLlama point 2026-10-21T23:01:38Z), share price 1036885391779188361989008962494
  - 7d start: block 26402022 at 2026-11-12T23:02:11Z (DeFiLlama point 2026-11-12T23:02:12Z), share price 1039937272495089090712326663413
  - end: block 26455577 at 2026-11-20T10:01:23Z (DeFiLlama point 2026-11-20T10:01:32Z), share price 1040857462299745490684068000664
- Realized: 30d 4.851%, 7d 4.424%. Published base mean: 30d 4.480%, 7d 4.363%. DeFiLlama `apyMean30d` 4.519%. Now: apy 3.803, apyBase 3.803, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.1052, sd 0.3559, 28 days. Window ratio 1.083.
- Timing: realized 30d moves between 4.648% and 4.9023% when the edges shift by up to 3 days; 0 days with no share-price move; daily medians published 4.195%, realized 4.4458%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Non-compounded rate of realized 30d: 4.737%.
- Note: 1 gap(s) longer than 36h in the DeFiLlama daily series.

### apyusd-apyx — APXUSD (apyx-protocol, Ethereum) — steady-ratio

- Verdict: daily realized/published ratio 1.0693 with sd 0.0236 over 29 days. No WAD-scaled fee getter on the contract, so the ratio cannot be tied to a fee. The published mean 13.179% equals the non-compounded rate of realized, ln(1 + 14.090%) = 13.182%: the pool looks published as an APR, not an APY.
- DeFiLlama pool `cb6139f9-4a68-4efd-8245-0312a92aee55` (https://defillama.com/yields/pool/cb6139f9-4a68-4efd-8245-0312a92aee55), pool key `0x38eeb52f0771140d10c4e9a9a72349a329fe8a6a-ethereum`, url https://apyx.fi
- Vault `0x38eeb52f0771140d10c4e9a9a72349a329fe8a6a` on ethereum (chain id 1), on-chain symbol apyUSD, asset `0x98a878b1cd98131b271883b390f68d2c90674665` (apxUSD). Resolved from: DeFiLlama pool key "0x38eeb52f0771140d10c4e9a9a72349a329fe8a6a-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244131 at 2026-10-21T23:01:11Z (DeFiLlama point 2026-10-21T23:01:11Z), share price 1445802837915371379065795010558
  - 7d start: block 26402020 at 2026-11-12T23:01:47Z (DeFiLlama point 2026-11-12T23:01:55Z), share price 1457322116033899296667094951006
  - end: block 26455577 at 2026-11-20T10:01:23Z (DeFiLlama point 2026-11-20T10:01:34Z), share price 1461266840699257241039036449848
- Realized: 30d 14.090%, 7d 14.144%. Published base mean: 30d 13.179%, 7d 13.268%. DeFiLlama `apyMean30d` 13.189%. Now: apy 13.640, apyBase 13.640, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0693, sd 0.0236, 29 days. Window ratio 1.0692.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Non-compounded rate of realized 30d: 13.182%.
- Note: On-chain symbol "apyUSD" differs from the DeFiLlama symbol "APXUSD" (DeFiLlama often labels a vault by its deposit asset).

### savusd-avant — SAVUSD (avant-avusd, Avalanche) — window-or-spike

- Verdict: moving the window edges by up to 3 days moves realized between 7.796% and 8.076%, which covers the published mean 7.824%
- DeFiLlama pool `c74227a1-e738-4021-bbe1-13363815aecb` (https://defillama.com/yields/pool/c74227a1-e738-4021-bbe1-13363815aecb), pool key `0x06d47F3fb376649c3A9Dafe069B3D6E35572219E-avax`, url https://www.avantprotocol.com
- Vault `0x06d47F3fb376649c3A9Dafe069B3D6E35572219E` on avalanche (chain id 43114), on-chain symbol savUSD, asset `0x24de8771bc5ddb3362db529fc3358f2df3a0e346` (avUSD). Resolved from: DeFiLlama pool key "0x06d47F3fb376649c3A9Dafe069B3D6E35572219E-avax". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 98188115 at 2026-10-21T23:01:11Z (DeFiLlama point 2026-10-21T23:01:11Z), share price 1210272375250025554695420255021
  - 7d start: block 100151533 at 2026-11-12T23:01:07Z (DeFiLlama point 2026-11-12T23:01:07Z), share price 1215705405870532110856973045754
  - end: block 100865766 at 2026-11-20T10:01:30Z (DeFiLlama point 2026-11-20T10:01:30Z), share price 1217836269383868089457497840819
- Realized: 30d 8.025%, 7d 8.948%. Published base mean: 30d 7.824%, 7d 8.105%. DeFiLlama `apyMean30d` 7.811%. Now: apy 8.347, apyBase 8.347, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0184, sd 0.0748, 29 days. Window ratio 1.0257.
- Timing: realized 30d moves between 7.7963% and 8.0757% when the edges shift by up to 3 days; 0 days with no share-price move; daily medians published 7.7902%, realized 7.9103%.
- RPC: https://api.avax.network/ext/bc/C/rpc, https://avalanche.gateway.tenderly.co, https://avalanche.drpc.org. Cross-check: ok (https://api.avax.network/ext/bc/C/rpc vs https://avalanche.gateway.tenderly.co | https://avalanche.drpc.org).
- Non-compounded rate of realized 30d: 7.720%.

### yvusdc-yearn — USDC (yearn-finance, Ethereum) — window-or-spike

- Verdict: DeFiLlama's latest value 4.597% equals the realized 30d 4.635%, while the mean of its daily values is 3.894%: consistent with a trailing-average publication whose 30d mean lags (plausible, not verified against the adapter)
- DeFiLlama pool `7d89af7a-24c9-4292-aa38-7c71b05fbd6d` (https://defillama.com/yields/pool/7d89af7a-24c9-4292-aa38-7c71b05fbd6d), pool key `0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204`, url https://yearn.fi/v3/1/0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204
- Vault `0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204` on ethereum (chain id 1), on-chain symbol yvUSDC-1, asset `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (USDC). Resolved from: DeFiLlama pool key "0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204". Read with `convertToAssets(1000000000000000000)`.
- Window: 29.58 days, 29 daily points.
  - 30d start: block 26243242 at 2026-10-21T20:02:23Z (DeFiLlama point 2026-10-21T20:02:23Z), share price 1122164836501844718
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:25Z), share price 1125298509133825881
  - end: block 26455578 at 2026-11-20T10:01:35Z (DeFiLlama point 2026-11-20T10:01:38Z), share price 1126293588856630773
- Realized: 30d 4.636%, 7d 4.420%. Published base mean: 30d 3.894%, 7d 4.417%. DeFiLlama `apyMean30d` 3.963%. Now: apy 4.597, apyBase 4.597, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.2178, sd 0.3495, 28 days. Window ratio 1.1905.
- Timing: realized 30d moves between 4.6242% and 4.8914% when the edges shift by up to 3 days; 0 days with no share-price move; daily medians published 3.8893%, realized 4.9902%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Non-compounded rate of realized 30d: 4.531%.
- Note: On-chain symbol "yvUSDC-1" differs from the DeFiLlama symbol "USDC" (DeFiLlama often labels a vault by its deposit asset).
- Note: 1 gap(s) longer than 36h in the DeFiLlama daily series.

### ybold-yearn — YBOLD (yearn-finance, Ethereum) — window-or-spike

- Verdict: moving the window edges by up to 3 days moves realized between 5.156% and 5.583%, which covers the published mean 5.080%
- DeFiLlama pool `4c29f645-12db-461f-a1d7-16900d624271` (https://defillama.com/yields/pool/4c29f645-12db-461f-a1d7-16900d624271), pool key `0x23346B04a7f55b8760E5860AA5A77383D63491cD`, url https://yearn.fi/v3/1/0x23346B04a7f55b8760E5860AA5A77383D63491cD
- Vault `0x23346B04a7f55b8760E5860AA5A77383D63491cD` on ethereum (chain id 1), on-chain symbol ysyBOLD, asset `0x9f4330700a36b29952869fac9b33f45eedd8a3d8` (yBOLD). Resolved from: DeFiLlama pool key "0x23346B04a7f55b8760E5860AA5A77383D63491cD". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 29 daily points.
  - 30d start: block 26244140 at 2026-10-21T23:02:59Z (DeFiLlama point 2026-10-21T23:02:59Z), share price 1099894488031888497756053334930
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:25Z), share price 1103286723688373872202923724557
  - end: block 26455578 at 2026-11-20T10:01:35Z (DeFiLlama point 2026-11-20T10:01:38Z), share price 1104617119020607352357149170288
- Realized: 30d 5.452%, 7d 6.075%. Published base mean: 30d 5.080%, 7d 5.099%. DeFiLlama `apyMean30d` 5.047%. Now: apy 5.421, apyBase 5.421, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0769, sd 0.4905, 28 days. Window ratio 1.0732.
- Fee getters at block 26455578: `performanceFee()` = 1000.
- Timing: realized 30d moves between 5.1558% and 5.583% when the edges shift by up to 3 days; 0 days with no share-price move; daily medians published 5.0878%, realized 4.5032%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Non-compounded rate of realized 30d: 5.309%.
- Note: On-chain symbol "ysyBOLD" differs from the DeFiLlama symbol "YBOLD" (DeFiLlama often labels a vault by its deposit asset).
- Note: 1 gap(s) longer than 36h in the DeFiLlama daily series.
- Note: performanceFee() returns 1000, which is not WAD-scaled; left uninterpreted.

### (history-handoff) — SDUSD (dtrinity-dusd, Ethereum) — window-or-spike

- Verdict: moving the window edges by up to 3 days moves realized between 7.223% and 7.815%, which covers the published mean 7.578%
- DeFiLlama pool `78049985-79a8-4343-8618-3c27d41d5054` (https://defillama.com/yields/pool/78049985-79a8-4343-8618-3c27d41d5054), pool key `0x7CB20517776636eD76b68EdB3D99DCce356ABf02`, url https://app.dtrinity.org/dstake/vault/
- Vault `0x7CB20517776636eD76b68EdB3D99DCce356ABf02` on ethereum (chain id 1), on-chain symbol sdUSD, asset `0x07fff99e1664d9b116fbc158c0e99785f81ca236` (dUSD). Resolved from: DeFiLlama pool key "0x7CB20517776636eD76b68EdB3D99DCce356ABf02". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244132 at 2026-10-21T23:01:23Z (DeFiLlama point 2026-10-21T23:01:26Z), share price 1024631802523178736219220667680
  - 7d start: block 26401717 at 2026-11-12T22:00:59Z (DeFiLlama point 2026-11-12T22:01:10Z), share price 1029691118509636157547947377266
  - end: block 26455576 at 2026-11-20T10:01:11Z (DeFiLlama point 2026-11-20T10:01:13Z), share price 1030448083223438015598265538692
- Realized: 30d 7.265%, 7d 3.641%. Published base mean: 30d 7.578%, 7d 3.611%. DeFiLlama `apyMean30d` 7.246%. Now: apy 4.334, apyBase 4.334, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0014, sd 0.0088, 29 days. Window ratio 0.9587.
- Timing: realized 30d moves between 7.2226% and 7.8147% when the edges shift by up to 3 days; 0 days with no share-price move; daily medians published 4.3344%, realized 4.3351%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Non-compounded rate of realized 30d: 7.013%.

### (history-handoff) — SDUSD (dtrinity-dusd, Fraxtal) — window-or-spike

- Verdict: daily medians agree (published 29.943%, realized 30.039%); the 30d gap of 7.491 pp sits in a few spike days
- DeFiLlama pool `f42cf641-393d-4671-895a-3c85cf7b1a57` (https://defillama.com/yields/pool/f42cf641-393d-4671-895a-3c85cf7b1a57), pool key `0x58AcC2600835211Dcb5847c5Fa422791Fd492409`, url https://app.dtrinity.org/dstake/vault/
- Vault `0x58AcC2600835211Dcb5847c5Fa422791Fd492409` on fraxtal (chain id 252), on-chain symbol sdUSD, asset `0x788d96f655735f52c676a133f4dfc53cec614d4a` (dUSD). Resolved from: DeFiLlama pool key "0x58AcC2600835211Dcb5847c5Fa422791Fd492409". Read with `convertToAssets(1000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 42906487 at 2026-10-21T23:01:25Z (DeFiLlama point 2026-10-21T23:01:26Z), share price 1153150667335492067
  - 7d start: block 43855079 at 2026-11-12T22:01:09Z (DeFiLlama point 2026-11-12T22:01:10Z), share price 1169950915930641704
  - end: block 44179081 at 2026-11-20T10:01:13Z (DeFiLlama point 2026-11-20T10:01:13Z), share price 1192126530361759816
- Realized: 30d 50.964%, 7d 149.379%. Published base mean: 30d 58.454%, 7d 156.387%. DeFiLlama `apyMean30d` 57.873%. Now: apy 118.949, apyBase 118.949, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9989, sd 0.0052, 29 days. Window ratio 0.8719.
- Timing: realized 30d moves between 41.2368% and 54.5499% when the edges shift by up to 3 days; 0 days with no share-price move; daily medians published 29.9426%, realized 30.0392%.
- RPC: https://rpc.frax.com, https://fraxtal.drpc.org. Cross-check: ok (https://rpc.frax.com vs https://fraxtal.drpc.org).
- Non-compounded rate of realized 30d: 41.187%.

### susds-sky — SUSDS (sky-lending, Ethereum) — match

- Verdict: published 30d mean 3.800% vs realized 3.800%: 0.000 pp, 0.0% relative
- DeFiLlama pool `d8c4eff5-c8a9-46fc-a888-057c4c668e72` (https://defillama.com/yields/pool/d8c4eff5-c8a9-46fc-a888-057c4c668e72), pool key `0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD`, url https://app.sky.money/?network=ethereum&widget=savings
- Vault `0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD` on ethereum (chain id 1), on-chain symbol sUSDS, asset `0xdc035d45d973e3ec169d2276ddab16f1e407384f` (USDS). Resolved from: DeFiLlama pool key "0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244138 at 2026-10-21T23:02:35Z (DeFiLlama point 2026-10-21T23:02:37Z), share price 1113627208489932361813992415000
  - 7d start: block 26402017 at 2026-11-12T23:01:11Z (DeFiLlama point 2026-11-12T23:01:20Z), share price 1116133308600990583259153355000
  - end: block 26455577 at 2026-11-20T10:01:23Z (DeFiLlama point 2026-11-20T10:01:34Z), share price 1116984247409669663255912499000
- Realized: 30d 3.800%, 7d 3.800%. Published base mean: 30d 3.800%, 7d 3.800%. DeFiLlama `apyMean30d` 3.800%. Now: apy 3.800, apyBase 3.800, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1, sd 0, 29 days. Window ratio 1.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### susde-ethena — SUSDE (ethena-usde, Ethereum) — match

- Verdict: published 30d mean 5.108% vs realized 5.120%: -0.012 pp, 0.2% relative
- DeFiLlama pool `66985a81-9c51-46ca-9977-42b4fe7bc6df` (https://defillama.com/yields/pool/66985a81-9c51-46ca-9977-42b4fe7bc6df), pool key `0x9D39A5DE30e57443BfF2A8307A4256c8797A3497`, url https://www.ethena.fi/
- Vault `0x9D39A5DE30e57443BfF2A8307A4256c8797A3497` on ethereum (chain id 1), on-chain symbol sUSDe, asset `0x4c9edd5852cd905f086c759e8383e09bff1e68b3` (USDe). Resolved from: DeFiLlama pool key "0x9D39A5DE30e57443BfF2A8307A4256c8797A3497". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244132 at 2026-10-21T23:01:23Z (DeFiLlama point 2026-10-21T23:01:27Z), share price 1254192206650046551317459649809
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:33Z), share price 1257935706672419318285400849100
  - end: block 26455576 at 2026-11-20T10:01:11Z (DeFiLlama point 2026-11-20T10:01:18Z), share price 1259256915868472754371758302289
- Realized: 30d 5.120%, 7d 5.272%. Published base mean: 30d 5.108%, 7d 5.228%. DeFiLlama `apyMean30d` 5.126%. Now: apy 4.821, apyBase 4.821, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0021, sd 0.0195, 29 days. Window ratio 1.0023.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### syrupusdc-maple — USDC (maple, Ethereum) — match

- Verdict: published 30d mean 5.131% vs realized 5.157%: -0.026 pp, 0.5% relative
- DeFiLlama pool `43641cf5-a92e-416b-bce9-27113d3c0db6` (https://defillama.com/yields/pool/43641cf5-a92e-416b-bce9-27113d3c0db6), pool key `0x80ac24aa929eaf5013f6436cda2a7ba190f5cc0b`, url https://app.maple.finance/earn
- Vault `0x80ac24aa929eaf5013f6436cda2a7ba190f5cc0b` on ethereum (chain id 1), on-chain symbol syrupUSDC, asset `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (USDC). Resolved from: DeFiLlama pool key "0x80ac24aa929eaf5013f6436cda2a7ba190f5cc0b". Read with `convertToAssets(1000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244133 at 2026-10-21T23:01:35Z (DeFiLlama point 2026-10-21T23:01:37Z), share price 1189191852902143327
  - 7d start: block 26402017 at 2026-11-12T23:01:11Z (DeFiLlama point 2026-11-12T23:01:20Z), share price 1192781434862780737
  - end: block 26455578 at 2026-11-20T10:01:35Z (DeFiLlama point 2026-11-20T10:01:37Z), share price 1194027910932125670
- Realized: 30d 5.157%, 7d 5.244%. Published base mean: 30d 5.131%, 7d 5.223%. DeFiLlama `apyMean30d` 5.130%. Now: apy 5.243, apyBase 5.243, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0045, sd 0.022, 29 days. Window ratio 1.0052.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Note: On-chain symbol "syrupUSDC" differs from the DeFiLlama symbol "USDC" (DeFiLlama often labels a vault by its deposit asset).

### steakusdg-steakhouse — STEAKUSDG (morpho-blue, Robinhood Chain) — match

- Verdict: published 30d mean 4.047% vs realized 4.041%: 0.006 pp, 0.1% relative
- DeFiLlama pool `32f586b4-5358-5aa2-88ee-c842139e7023` (https://defillama.com/yields/pool/32f586b4-5358-5aa2-88ee-c842139e7023), pool key `morpho-vault-v2-0xBeEff033F34C046626B8D0A041844C5d1A5409dd-robinhood`, url https://app.morpho.org/robinhood-chain/vault/0xBeEff033F34C046626B8D0A041844C5d1A5409dd
- Vault `0xBeEff033F34C046626B8D0A041844C5d1A5409dd` on robinhood (chain id 4663), on-chain symbol steakUSDG, asset `0x5fc5360d0400a0fd4f2af552add042d716f1d168` (USDG). Resolved from: DeFiLlama pool key "morpho-vault-v2-0xBeEff033F34C046626B8D0A041844C5d1A5409dd-robinhood". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 94649322 at 2026-10-21T23:02:08Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1010835683344135042
  - 7d start: block 112893377 at 2026-11-12T23:01:26Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1013293840108195943
  - end: block 118966723 at 2026-11-20T10:01:53Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1014072976774449769
- Realized: 30d 4.041%, 7d 3.833%. Published base mean: 30d 4.047%, 7d 3.844%. DeFiLlama `apyMean30d` 7.664%. Now: apy 6.999, apyBase 3.762, apyReward 3.238 (reward 30d mean 3.601).
- Daily ratio realized/published: mean 0.9998, sd 0.0062, 29 days. Window ratio 0.9986.
- Fee getters at block 118966723: `performanceFee()` = 0, `managementFee()` = 0 (performance fee 0.00%).
- Morpho API (2026-11-20T10:32:41.024Z): "Steakhouse USDG", Vault V2, fee 0, apy 3.7585%, netApy 3.7585%, avgNetApy(1d) 3.7641%.
- RPC: https://robinhood.drpc.org. Cross-check: single-rpc.
- Note: only one archive RPC passed the probe for robinhood; the anchors are not cross-checked

### susdc-spark — USDC (spark-savings, Ethereum) — match

- Verdict: published 30d mean 3.800% vs realized 3.800%: -0.000 pp, 0.0% relative
- DeFiLlama pool `c5c74dd1-995c-4445-9d84-3e710bad7d52` (https://defillama.com/yields/pool/c5c74dd1-995c-4445-9d84-3e710bad7d52), pool key `0x28B3a8fb53B741A8Fd78c0fb9A6B2393d896a43d-ethereum`, url https://app.spark.fi/savings/mainnet/spusdc
- Vault `0x28B3a8fb53B741A8Fd78c0fb9A6B2393d896a43d` on ethereum (chain id 1), on-chain symbol spUSDC, asset `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (USDC). Resolved from: DeFiLlama pool key "0x28B3a8fb53B741A8Fd78c0fb9A6B2393d896a43d-ethereum". Read with `convertToAssets(1000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244134 at 2026-10-21T23:01:47Z (DeFiLlama point 2026-10-21T23:01:49Z), share price 1038548157630231888
  - 7d start: block 26402019 at 2026-11-12T23:01:35Z (DeFiLlama point 2026-11-12T23:01:37Z), share price 1040885388919016829
  - end: block 26455578 at 2026-11-20T10:01:35Z (DeFiLlama point 2026-11-20T10:01:44Z), share price 1041678944013177688
- Realized: 30d 3.800%, 7d 3.800%. Published base mean: 30d 3.800%, 7d 3.800%. DeFiLlama `apyMean30d` 3.800%. Now: apy 3.800, apyBase 3.800, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1, sd 0, 29 days. Window ratio 1.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Note: On-chain symbol "spUSDC" differs from the DeFiLlama symbol "USDC" (DeFiLlama often labels a vault by its deposit asset).

### susdt-spark — USDT (spark-savings, Ethereum) — match

- Verdict: published 30d mean 4.000% vs realized 3.991%: 0.009 pp, 0.2% relative
- DeFiLlama pool `a5d67f7e-5b51-4a9d-969d-caf051a7f5a4` (https://defillama.com/yields/pool/a5d67f7e-5b51-4a9d-969d-caf051a7f5a4), pool key `0xe2e7a17dFf93280dec073C995595155283e3C372-ethereum`, url https://app.spark.fi/savings/mainnet/spusdt
- Vault `0xe2e7a17dFf93280dec073C995595155283e3C372` on ethereum (chain id 1), on-chain symbol spUSDT, asset `0xdac17f958d2ee523a2206206994597c13d831ec7` (USDT). Resolved from: DeFiLlama pool key "0xe2e7a17dFf93280dec073C995595155283e3C372-ethereum". Read with `convertToAssets(1000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244134 at 2026-10-21T23:01:47Z (DeFiLlama point 2026-10-21T23:01:49Z), share price 1034111905576383883
  - 7d start: block 26402019 at 2026-11-12T23:01:35Z (DeFiLlama point 2026-11-12T23:01:37Z), share price 1036507025115178548
  - end: block 26455578 at 2026-11-20T10:01:35Z (DeFiLlama point 2026-11-20T10:01:44Z), share price 1037383264139461659
- Realized: 30d 3.991%, 7d 4.222%. Published base mean: 30d 4.000%, 7d 4.250%. DeFiLlama `apyMean30d` 3.987%. Now: apy 4.250, apyBase 4.250, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9969, sd 0.0117, 29 days. Window ratio 0.9978.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Note: On-chain symbol "spUSDT" differs from the DeFiLlama symbol "USDT" (DeFiLlama often labels a vault by its deposit asset).

### syrupusdt-maple — USDT (maple, Ethereum) — match

- Verdict: published 30d mean 4.970% vs realized 4.971%: -0.001 pp, 0.0% relative
- DeFiLlama pool `8edfdf02-cdbb-43f7-bca6-954e5fe56813` (https://defillama.com/yields/pool/8edfdf02-cdbb-43f7-bca6-954e5fe56813), pool key `0x356b8d89c1e1239cbbb9de4815c39a1474d5ba7d`, url https://app.maple.finance/earn
- Vault `0x356b8d89c1e1239cbbb9de4815c39a1474d5ba7d` on ethereum (chain id 1), on-chain symbol syrupUSDT, asset `0xdac17f958d2ee523a2206206994597c13d831ec7` (USDT). Resolved from: DeFiLlama pool key "0x356b8d89c1e1239cbbb9de4815c39a1474d5ba7d". Read with `convertToAssets(1000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244133 at 2026-10-21T23:01:35Z (DeFiLlama point 2026-10-21T23:01:37Z), share price 1149141750067051448
  - 7d start: block 26402017 at 2026-11-12T23:01:11Z (DeFiLlama point 2026-11-12T23:01:20Z), share price 1152494789043989529
  - end: block 26455578 at 2026-11-20T10:01:35Z (DeFiLlama point 2026-11-20T10:01:37Z), share price 1153650355684270951
- Realized: 30d 4.971%, 7d 5.027%. Published base mean: 30d 4.970%, 7d 5.011%. DeFiLlama `apyMean30d` 4.981%. Now: apy 4.976, apyBase 4.976, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1, sd 0.0608, 29 days. Window ratio 1.0003.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Note: On-chain symbol "syrupUSDT" differs from the DeFiLlama symbol "USDT" (DeFiLlama often labels a vault by its deposit asset).

### usd3-3jane — USD3 (3jane-lending, Ethereum) — match

- Verdict: published 30d mean 6.546% vs realized 6.603%: -0.056 pp, 0.9% relative
- DeFiLlama pool `f8cd444e-d99f-4132-b234-fd3482bf8806` (https://defillama.com/yields/pool/f8cd444e-d99f-4132-b234-fd3482bf8806), pool key `0x056b269eb1f75477a8666ae8c7fe01b64dd55ecc-ethereum`, url https://app.3jane.xyz/supply
- Vault `0x056b269eb1f75477a8666ae8c7fe01b64dd55ecc` on ethereum (chain id 1), on-chain symbol USD3, asset `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (USDC). Resolved from: DeFiLlama pool key "0x056b269eb1f75477a8666ae8c7fe01b64dd55ecc-ethereum". Read with `convertToAssets(1000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244129 at 2026-10-21T23:00:47Z (DeFiLlama point 2026-10-21T23:00:54Z), share price 1184718297653505446
  - 7d start: block 26402015 at 2026-11-12T23:00:47Z (DeFiLlama point 2026-11-12T23:00:56Z), share price 1189219866759323016
  - end: block 26455574 at 2026-11-20T10:00:47Z (DeFiLlama point 2026-11-20T10:00:58Z), share price 1190847756332654853
- Realized: 30d 6.603%, 7d 6.924%. Published base mean: 30d 6.546%, 7d 6.662%. DeFiLlama `apyMean30d` 6.549%. Now: apy 6.980, apyBase 6.980, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0072, sd 0.0543, 29 days. Window ratio 1.0086.
- Fee getters at block 26455574: `performanceFee()` = 750.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Note: performanceFee() returns 750, which is not WAD-scaled; left uninterpreted.

### steakusdc-steakhouse — STEAKUSDC (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 4.985% vs realized 4.996%: -0.011 pp, 0.2% relative
- DeFiLlama pool `931ea9be-5f4d-428e-beaf-205fc5b4e2b5` (https://defillama.com/yields/pool/931ea9be-5f4d-428e-beaf-205fc5b4e2b5), pool key `morpho-vault-v2-0xbeef088055857739C12CD3765F20b7679Def0f51-ethereum`, url https://app.morpho.org/ethereum/vault/0xbeef088055857739C12CD3765F20b7679Def0f51
- Vault `0xbeef088055857739C12CD3765F20b7679Def0f51` on ethereum (chain id 1), on-chain symbol steakUSDC, asset `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v2-0xbeef088055857739C12CD3765F20b7679Def0f51-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1036461244026724092
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1039584416771360336
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1040547474592943499
- Realized: 30d 4.996%, 7d 4.636%. Published base mean: 30d 4.985%, 7d 4.558%. DeFiLlama `apyMean30d` 4.983%. Now: apy 4.997, apyBase 4.997, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0022, sd 0.0153, 29 days. Window ratio 1.0022.
- Fee getters at block 26455579: `performanceFee()` = 0, `managementFee()` = 0 (performance fee 0.00%).
- Morpho API (2026-11-20T10:31:42.863Z): "Steakhouse Prime USDC", Vault V2, fee 0, apy 4.9472%, netApy 4.9472%, avgNetApy(1d) 4.9967%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### wsrusd-reservoir — WSRUSD (reservoir-protocol, Ethereum) — match

- Verdict: published 30d mean 6.160% vs realized 6.153%: 0.007 pp, 0.1% relative
- DeFiLlama pool `d646f32f-d5af-4e34-a29f-8ebeea6a8520` (https://defillama.com/yields/pool/d646f32f-d5af-4e34-a29f-8ebeea6a8520), pool key `0xd3fD63209FA2D55B07A0f6db36C2f43900be3094`, url https://www.reservoir.xyz/
- Vault `0xd3fD63209FA2D55B07A0f6db36C2f43900be3094` on ethereum (chain id 1), on-chain symbol wsrUSD, asset `0x09d4214c03d01f49544c0448dbe3a27f768f2b34` (rUSD). Resolved from: DeFiLlama pool key "0xd3fD63209FA2D55B07A0f6db36C2f43900be3094". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244136 at 2026-10-21T23:02:11Z (DeFiLlama point 2026-10-21T23:02:18Z), share price 1104247336569175532499768996000
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:28Z), share price 1108261108301173161817132515000
  - end: block 26455577 at 2026-11-20T10:01:23Z (DeFiLlama point 2026-11-20T10:01:23Z), share price 1109581450348811590721559173000
- Realized: 30d 6.153%, 7d 6.000%. Published base mean: 30d 6.160%, 7d 6.004%. DeFiLlama `apyMean30d` 6.154%. Now: apy 6.004, apyBase -, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9994, sd 0.0081, 29 days. Window ratio 0.9989.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Note: apyBase is missing on 30 of 30 daily points; DeFiLlama's total apy is used for those days.

### steakusdt-steakhouse — STEAKUSDT (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 4.200% vs realized 4.169%: 0.031 pp, 0.7% relative
- DeFiLlama pool `ef5d3acb-b974-4db1-8076-e8db9f142493` (https://defillama.com/yields/pool/ef5d3acb-b974-4db1-8076-e8db9f142493), pool key `morpho-vault-v2-0xbeef003C68896c7D2c3c60d363e8d71a49Ab2bf9-ethereum`, url https://app.morpho.org/ethereum/vault/0xbeef003C68896c7D2c3c60d363e8d71a49Ab2bf9
- Vault `0xbeef003C68896c7D2c3c60d363e8d71a49Ab2bf9` on ethereum (chain id 1), on-chain symbol steakUSDT, asset `0xdac17f958d2ee523a2206206994597c13d831ec7` (USDT). Resolved from: DeFiLlama pool key "morpho-vault-v2-0xbeef003C68896c7D2c3c60d363e8d71a49Ab2bf9-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1028998590564038909
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1031703539835297064
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1032396477676892493
- Realized: 30d 4.169%, 7d 3.340%. Published base mean: 30d 4.200%, 7d 3.365%. DeFiLlama `apyMean30d` 4.140%. Now: apy 3.432, apyBase 3.432, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9981, sd 0.019, 29 days. Window ratio 0.9926.
- Fee getters at block 26455579: `performanceFee()` = 0, `managementFee()` = 0 (performance fee 0.00%).
- Morpho API (2026-11-20T10:31:43.416Z): "Steakhouse Prime USDT", Vault V2, fee 0, apy 3.0034%, netApy 3.0034%, avgNetApy(1d) 3.432%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### stcusd-cap — STCUSD (cap, Ethereum) — match

- Verdict: published 30d mean 5.879% vs realized 5.874%: 0.005 pp, 0.1% relative
- DeFiLlama pool `bf6ca887-e357-49ec-8031-0d1a6141c455` (https://defillama.com/yields/pool/bf6ca887-e357-49ec-8031-0d1a6141c455), pool key `0x88887bE419578051FF9F4eb6C858A951921D8888`, url https://cap.app
- Vault `0x88887bE419578051FF9F4eb6C858A951921D8888` on ethereum (chain id 1), on-chain symbol stcUSD, asset `0xcccc62962d17b8914c62d74ffb843d73b2a3cccc` (cUSD). Resolved from: DeFiLlama pool key "0x88887bE419578051FF9F4eb6C858A951921D8888". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244130 at 2026-10-21T23:00:59Z (DeFiLlama point 2026-10-21T23:01:09Z), share price 1086430585237218568234970568655
  - 7d start: block 26402016 at 2026-11-12T23:00:59Z (DeFiLlama point 2026-11-12T23:01:03Z), share price 1090105637219749196900054453628
  - end: block 26455578 at 2026-11-20T10:01:35Z (DeFiLlama point 2026-11-20T10:01:43Z), share price 1091447084683665953224027273557
- Realized: 30d 5.874%, 7d 6.203%. Published base mean: 30d 5.879%, 7d 6.240%. DeFiLlama `apyMean30d` 5.856%. Now: apy 5.898, apyBase -, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9997, sd 0.0023, 29 days. Window ratio 0.9992.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Note: apyBase is missing on 30 of 30 daily points; DeFiLlama's total apy is used for those days.

### iusd-infinifi — SIUSD (infinifi, Ethereum) — match

- Verdict: published 30d mean 6.727% vs realized 6.712%: 0.014 pp, 0.2% relative
- DeFiLlama pool `8fa2e60e-365a-41fc-8d50-fadde5041f94` (https://defillama.com/yields/pool/8fa2e60e-365a-41fc-8d50-fadde5041f94), pool key `0xdbdc1ef57537e34680b898e1febd3d68c7389bcb-ethereum`, url https://infinifi.xyz/
- Vault `0xdbdc1ef57537e34680b898e1febd3d68c7389bcb` on ethereum (chain id 1), on-chain symbol siUSD, asset `0x48f9e38f3070ad8945dfeae3fa70987722e3d89c` (iUSD). Resolved from: DeFiLlama pool key "0xdbdc1ef57537e34680b898e1febd3d68c7389bcb-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.58 days, 30 daily points.
  - 30d start: block 26243236 at 2026-10-21T20:01:11Z (DeFiLlama point 2026-10-21T20:01:15Z), share price 1095948004900692489236404978978
  - 7d start: block 26401718 at 2026-11-12T22:01:11Z (DeFiLlama point 2026-11-12T22:01:20Z), share price 1100250419739631143445301307669
  - end: block 26455577 at 2026-11-20T10:01:23Z (DeFiLlama point 2026-11-20T10:01:25Z), share price 1101733862097774193944485915929
- Realized: 30d 6.712%, 7d 6.777%. Published base mean: 30d 6.727%, 7d 6.816%. DeFiLlama `apyMean30d` 6.732%. Now: apy 7.466, apyBase 7.466, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.997, sd 0.0179, 29 days. Window ratio 0.9978.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Note: 1 gap(s) longer than 36h in the DeFiLlama daily series.

### sfrxusd-frax — SFRXUSD (frax, Ethereum) — match

- Verdict: published 30d mean 5.159% vs realized 5.161%: -0.003 pp, 0.1% relative
- DeFiLlama pool `42523cca-14b0-44f6-95fb-4781069520a5` (https://defillama.com/yields/pool/42523cca-14b0-44f6-95fb-4781069520a5), pool key `0xcf62F905562626CfcDD2261162a51fd02Fc9c5b6`, url https://app.frax.finance/staking/overview
- Vault `0xcf62F905562626CfcDD2261162a51fd02Fc9c5b6` on ethereum (chain id 1), on-chain symbol sfrxUSD, asset `0xcacd6fd266af91b8aed52accc382b4e165586e29` (frxUSD). Resolved from: DeFiLlama pool key "0xcf62F905562626CfcDD2261162a51fd02Fc9c5b6". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244132 at 2026-10-21T23:01:23Z (DeFiLlama point 2026-10-21T23:01:24Z), share price 1216580401639552146999999987522
  - 7d start: block 26402020 at 2026-11-12T23:01:47Z (DeFiLlama point 2026-11-12T23:01:57Z), share price 1220250906286329560999999999807
  - end: block 26455576 at 2026-11-20T10:01:11Z (DeFiLlama point 2026-11-20T10:01:20Z), share price 1221531889431309476999999986996
- Realized: 30d 5.162%, 7d 5.269%. Published base mean: 30d 5.159%, 7d 5.267%. DeFiLlama `apyMean30d` 5.156%. Now: apy 5.070, apyBase 5.070, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0006, sd 0.0026, 29 days. Window ratio 1.0005.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### susdf-falcon — SUSDF (falcon-finance, Ethereum) — match

- Verdict: published 30d mean 3.870% vs realized 3.847%: 0.023 pp, 0.6% relative
- DeFiLlama pool `0f67a08c-3f24-4a4b-963e-541f5a5c0364` (https://defillama.com/yields/pool/0f67a08c-3f24-4a4b-963e-541f5a5c0364), pool key `0xc8CF6D7991f15525488b2A83Df53468D682Ba4B0-ethereum`, url https://app.falcon.finance/earn/classic
- Vault `0xc8CF6D7991f15525488b2A83Df53468D682Ba4B0` on ethereum (chain id 1), on-chain symbol sUSDf, asset `0xfa2b947eec368f42195f24f36d2af29f7c24cec2` (USDf). Resolved from: DeFiLlama pool key "0xc8CF6D7991f15525488b2A83Df53468D682Ba4B0-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244132 at 2026-10-21T23:01:23Z (DeFiLlama point 2026-10-21T23:01:23Z), share price 1139304630810091982268001961963
  - 7d start: block 26402017 at 2026-11-12T23:01:11Z (DeFiLlama point 2026-11-12T23:01:16Z), share price 1141921664931314032875217039956
  - end: block 26455576 at 2026-11-20T10:01:11Z (DeFiLlama point 2026-11-20T10:01:17Z), share price 1142781078795376322752631841544
- Realized: 30d 3.847%, 7d 3.750%. Published base mean: 30d 3.870%, 7d 3.636%. DeFiLlama `apyMean30d` 3.888%. Now: apy 3.556, apyBase 3.556, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9638, sd 0.5726, 29 days. Window ratio 0.994.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### sdai-gnosis — SDAI (sdai, Gnosis) — match

- Verdict: published 30d mean 4.684% vs realized 4.748%: -0.064 pp, 1.4% relative
- DeFiLlama pool `13392973-be6e-4b2f-bce9-4f7dd53d1c3a` (https://defillama.com/yields/pool/13392973-be6e-4b2f-bce9-4f7dd53d1c3a), pool key `0xaf204776c7245bF4147c2612BF6e5972Ee483701`, url https://www.gnosis.io/
- Vault `0xaf204776c7245bF4147c2612BF6e5972Ee483701` on gnosis (chain id 100), on-chain symbol sDAI, asset `0xe91d153e0b41518a2ce8dd3d7944fa863463a97d` (WXDAI). Resolved from: DeFiLlama pool key "0xaf204776c7245bF4147c2612BF6e5972Ee483701". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 48874850 at 2026-10-21T23:01:40Z (DeFiLlama point 2026-10-21T23:01:40Z), share price 1262840908783853857670660329777
  - 7d start: block 49248710 at 2026-11-12T23:02:20Z (DeFiLlama point 2026-11-12T23:02:22Z), share price 1266368771677586404684411352054
  - end: block 49374915 at 2026-11-20T10:02:00Z (DeFiLlama point 2026-11-20T10:02:00Z), share price 1267578020961395770048493717565
- Realized: 30d 4.748%, 7d 4.782%. Published base mean: 30d 4.684%, 7d 4.720%. DeFiLlama `apyMean30d` 4.683%. Now: apy 4.772, apyBase 4.772, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0136, sd 0.0089, 29 days. Window ratio 1.0137.
- RPC: https://rpc.gnosischain.com, https://gnosis.gateway.tenderly.co, https://gnosis.drpc.org. Cross-check: ok (https://rpc.gnosischain.com vs https://gnosis.gateway.tenderly.co | https://gnosis.drpc.org).

### yzusd-yuzu / syzusd-yuzu — SYZUSD (yuzu-money, Plasma) — match

- Verdict: published 30d mean 8.316% vs realized 8.377%: -0.061 pp, 0.7% relative
- DeFiLlama pool `6174b1d6-8212-4964-95bf-ca9c539864ba` (https://defillama.com/yields/pool/6174b1d6-8212-4964-95bf-ca9c539864ba), pool key `0xc8a8df9b210243c55d31c73090f06787ad0a1bf6-plasma`, url https://app.yuzu.money/alpha/yzusd-syzusd
- Vault `0xc8a8df9b210243c55d31c73090f06787ad0a1bf6` on plasma (chain id 9745), on-chain symbol syzUSD, asset `0x6695c0f8706c5ace3bdf8995073179cca47926dc` (yzUSD). Resolved from: DeFiLlama pool key "0xc8a8df9b210243c55d31c73090f06787ad0a1bf6-plasma". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.44 days, 30 daily points.
  - 30d start: block 35684238 at 2026-10-21T23:33:50Z (DeFiLlama point 2026-10-21T23:33:50Z), share price 1089991639728740116119550493335
  - 7d start: block 37581128 at 2026-11-12T23:01:47Z (DeFiLlama point 2026-11-12T23:01:47Z), share price 1095284758972260841022992169057
  - end: block 38223854 at 2026-11-20T10:01:43Z (DeFiLlama point 2026-11-20T10:01:43Z), share price 1097086427192953341761569318812
- Realized: 30d 8.377%, 7d 8.376%. Published base mean: 30d 8.316%, 7d 8.396%. DeFiLlama `apyMean30d` 8.295%. Now: apy 8.365, apyBase 8.365, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0088, sd 0.1018, 29 days. Window ratio 1.0073.
- RPC: https://rpc.plasma.to, https://9745.rpc.thirdweb.com. Cross-check: ok (https://rpc.plasma.to vs https://9745.rpc.thirdweb.com).

### scrvusd-curve — SCRVUSD (crvusd, Ethereum) — match

- Verdict: published 30d mean 5.120% vs realized 5.145%: -0.025 pp, 0.5% relative
- DeFiLlama pool `5fd328af-4203-471b-bd16-1705c726d926` (https://defillama.com/yields/pool/5fd328af-4203-471b-bd16-1705c726d926), pool key `0x0655977FEb2f289A4aB78af67BAB0d17aAb84367-crvusd`, url https://www.curve.finance/crvusd/ethereum/scrvUSD
- Vault `0x0655977FEb2f289A4aB78af67BAB0d17aAb84367` on ethereum (chain id 1), on-chain symbol scrvUSD, asset `0xf939e0a03fb07f59a73314e73794be0e57ac1b4e` (crvUSD). Resolved from: DeFiLlama pool key "0x0655977FEb2f289A4aB78af67BAB0d17aAb84367-crvusd". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244131 at 2026-10-21T23:01:11Z (DeFiLlama point 2026-10-21T23:01:22Z), share price 1110209670731658714175918325305
  - 7d start: block 26402016 at 2026-11-12T23:00:59Z (DeFiLlama point 2026-11-12T23:01:08Z), share price 1113148180482169485465103161733
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:48Z), share price 1114714272974466733702216702582
- Realized: 30d 5.145%, 7d 7.122%. Published base mean: 30d 5.120%, 7d 7.108%. DeFiLlama `apyMean30d` 5.032%. Now: apy 7.974, apyBase 7.974, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9997, sd 0.005, 29 days. Window ratio 1.005.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### sdola-inverse-finance — SDOLA (inverse-finance-firm, Ethereum) — match

- Verdict: published 30d mean 6.188% vs realized 6.143%: 0.045 pp, 0.7% relative
- DeFiLlama pool `bf0f95c9-bc46-467d-9762-1d80ff50cd74` (https://defillama.com/yields/pool/bf0f95c9-bc46-467d-9762-1d80ff50cd74), pool key `0xb45ad160634c528Cc3D2926d9807104FA3157305`, url https://inverse.finance/sDOLA
- Vault `0xb45ad160634c528Cc3D2926d9807104FA3157305` on ethereum (chain id 1), on-chain symbol sDOLA, asset `0x865377367054516e17014ccded1e7d814edc9ce4` (DOLA). Resolved from: DeFiLlama pool key "0xb45ad160634c528Cc3D2926d9807104FA3157305". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244136 at 2026-10-21T23:02:11Z (DeFiLlama point 2026-10-21T23:02:22Z), share price 1424489088529863741517992321930
  - 7d start: block 26402017 at 2026-11-12T23:01:11Z (DeFiLlama point 2026-11-12T23:01:19Z), share price 1429566826084959827363906123782
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:50Z), share price 1431359239435345269517972322617
- Realized: 30d 6.143%, 7d 6.324%. Published base mean: 30d 6.188%, 7d 6.450%. DeFiLlama `apyMean30d` 6.126%. Now: apy 5.139, apyBase 5.139, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9966, sd 0.0316, 29 days. Window ratio 0.9927.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### gtusdc-gauntlet — GTUSDC (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 4.660% vs realized 4.655%: 0.004 pp, 0.1% relative
- DeFiLlama pool `a306885c-001e-4479-9ae8-459a56527bc1` (https://defillama.com/yields/pool/a306885c-001e-4479-9ae8-459a56527bc1), pool key `morpho-vault-v1-0xdd0f28e19C1780eb6396170735D45153D261490d-ethereum`, url https://app.morpho.org/ethereum/vault/0xdd0f28e19C1780eb6396170735D45153D261490d
- Vault `0xdd0f28e19C1780eb6396170735D45153D261490d` on ethereum (chain id 1), on-chain symbol gtUSDC, asset `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v1-0xdd0f28e19C1780eb6396170735D45153D261490d-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1135411575852462368
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1138592328895180132
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1139588844275676504
- Realized: 30d 4.655%, 7d 4.374%. Published base mean: 30d 4.660%, 7d 4.308%. DeFiLlama `apyMean30d` 4.643%. Now: apy 4.719, apyBase 4.719, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9985, sd 0.0163, 29 days. Window ratio 0.9991.
- Fee getters at block 26455579: `fee()` = 50000000000000000 (performance fee 5.00%).
- Morpho API (2026-11-20T10:33:41.890Z): "Gauntlet USDC Prime", Vault V1, fee 0.05, apy 5.1345%, netApy 4.8716%, avgNetApy(1d) 4.7228%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### said-gaib — SAID (gaib, Ethereum) — match

- Verdict: published 30d mean 10.563% vs realized 10.595%: -0.033 pp, 0.3% relative
- DeFiLlama pool `e575606e-5642-4f87-b9ad-3e53d6f83c82` (https://defillama.com/yields/pool/e575606e-5642-4f87-b9ad-3e53d6f83c82), pool key `0xb3b3c527ba57cd61648e2ec2f5e006a0b390a9f8-ethereum`, url https://aid.gaib.ai
- Vault `0xb3b3c527ba57cd61648e2ec2f5e006a0b390a9f8` on ethereum (chain id 1), on-chain symbol sAID, asset `0x18f52b3fb465118731d9e0d276d4eb3599d57596` (AID). Resolved from: DeFiLlama pool key "0xb3b3c527ba57cd61648e2ec2f5e006a0b390a9f8-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244132 at 2026-10-21T23:01:23Z (DeFiLlama point 2026-10-21T23:01:34Z), share price 1090733365905027193178450932698
  - 7d start: block 26402017 at 2026-11-12T23:01:11Z (DeFiLlama point 2026-11-12T23:01:16Z), share price 1097226181142966416170824710888
  - end: block 26455576 at 2026-11-20T10:01:11Z (DeFiLlama point 2026-11-20T10:01:12Z), share price 1099634927904215472582492135576
- Realized: 30d 10.595%, 7d 11.329%. Published base mean: 30d 10.563%, 7d 10.551%. DeFiLlama `apyMean30d` 10.568%. Now: apy 10.607, apyBase 10.607, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0036, sd 0.1917, 29 days. Window ratio 1.0031.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### bbqusdc-steakhouse — BBQUSDC (morpho-blue, Ethereum) — match

- Verdict: published 30d mean 6.472% vs realized 6.444%: 0.028 pp, 0.4% relative
- DeFiLlama pool `36977448-9ad9-43ea-85f2-60ee1b92ecd0` (https://defillama.com/yields/pool/36977448-9ad9-43ea-85f2-60ee1b92ecd0), pool key `morpho-vault-v1-0xBEeFFF209270748ddd194831b3fa287a5386f5bC-ethereum`, url https://app.morpho.org/ethereum/vault/0xBEeFFF209270748ddd194831b3fa287a5386f5bC
- Vault `0xBEeFFF209270748ddd194831b3fa287a5386f5bC` on ethereum (chain id 1), on-chain symbol bbqUSDC, asset `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (USDC). Resolved from: DeFiLlama pool key "morpho-vault-v1-0xBEeFFF209270748ddd194831b3fa287a5386f5bC-ethereum". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1133444967696755360
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:26Z), share price 1137792541193730536
  - end: block 26455579 at 2026-11-20T10:01:47Z (DeFiLlama point 2026-11-20T10:01:53Z), share price 1139171817816752844
- Realized: 30d 6.444%, 7d 6.108%. Published base mean: 30d 6.472%, 7d 6.098%. DeFiLlama `apyMean30d` 6.404%. Now: apy 7.455, apyBase 7.455, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 0.9976, sd 0.0115, 29 days. Window ratio 0.9956.
- Fee getters at block 26455579: `fee()` = 100000000000000000 (performance fee 10.00%).
- Morpho API (2026-11-20T10:33:48.036Z): "Smokehouse USDC", Vault V1, fee 0.1, apy 6.2334%, netApy 5.5929%, avgNetApy(1d) 7.4696%.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).

### xaut-tether — XAUT (lista-lending, BSC) — match

- Verdict: published 30d mean 0.246% vs realized 0.250%: -0.004 pp, 1.6% relative
- DeFiLlama pool `b89d44a1-052a-4ec8-8dba-7802340fee27` (https://defillama.com/yields/pool/b89d44a1-052a-4ec8-8dba-7802340fee27), pool key `lista-lending-0x4109415de2271097fb5fa16af8a753aab8c46d6f-bsc`, url https://lista.org/lending/vault/bsc/0x4109415de2271097fb5fa16af8a753aab8c46d6f?tab=vault
- Vault `0x4109415de2271097fb5fa16af8a753aab8c46d6f` on bsc (chain id 56), on-chain symbol lisXAUT, asset `0x21caef8a43163eea865baee23b9c2e327696a3bf` (XAUt). Resolved from: DeFiLlama pool key "lista-lending-0x4109415de2271097fb5fa16af8a753aab8c46d6f-bsc". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 129022423 at 2026-10-21T23:01:24Z (DeFiLlama point 2026-10-21T23:01:24Z), share price 1006669976138288604
  - 7d start: block 133244316 at 2026-11-12T23:01:09Z (DeFiLlama point 2026-11-12T23:01:09Z), share price 1006872093150007267
  - end: block 134675661 at 2026-11-20T10:01:28Z (DeFiLlama point 2026-11-20T10:01:28Z), share price 1006872648329501830
- Realized: 30d 0.250%, 7d 0.003%. Published base mean: 30d 0.246%, 7d 0.002%. DeFiLlama `apyMean30d` 0.250%. Now: apy 0.000, apyBase 0.000, apyReward 0.000 (reward 30d mean 0.000).
- Daily ratio realized/published: mean 1.0171, sd 0.0681, 19 days. Window ratio 1.0159.
- Fee getters at block 134675661: `fee()` = 100000000000000000 (performance fee 10.00%).
- RPC: https://bsc-mainnet.public.blastapi.io. Cross-check: single-rpc.
- Note: On-chain symbol "lisXAUT" differs from the DeFiLlama symbol "XAUT" (DeFiLlama often labels a vault by its deposit asset).
- Note: only one archive RPC passed the probe for bsc; the anchors are not cross-checked

### xaut-tether — XAUT (yo-protocol, Ethereum) — match

- Verdict: published 30d mean 0.000% vs realized 0.000%: 0.000 pp, 0.0% relative
- DeFiLlama pool `653c3979-83bc-40c9-aba0-f01a5ba0d118` (https://defillama.com/yields/pool/653c3979-83bc-40c9-aba0-f01a5ba0d118), pool key `0x586675A3a46B008d8408933cf42d8ff6c9CC61a1`, url https://app.yo.xyz/vault/ethereum/0x586675A3a46B008d8408933cf42d8ff6c9CC61a1
- Vault `0x586675A3a46B008d8408933cf42d8ff6c9CC61a1` on ethereum (chain id 1), on-chain symbol yoGOLD, asset `0x68749665ff8d2d112fa859aa293f07a622782f38` (XAUt). Resolved from: DeFiLlama pool key "0x586675A3a46B008d8408933cf42d8ff6c9CC61a1". Read with `convertToAssets(1000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 26244135 at 2026-10-21T23:01:59Z (DeFiLlama point 2026-10-21T23:02:08Z), share price 1002337000000000000
  - 7d start: block 26402018 at 2026-11-12T23:01:23Z (DeFiLlama point 2026-11-12T23:01:27Z), share price 1002337000000000000
  - end: block 26455578 at 2026-11-20T10:01:35Z (DeFiLlama point 2026-11-20T10:01:39Z), share price 1002337000000000000
- Realized: 30d 0.000%, 7d 0.000%. Published base mean: 30d 0.000%, 7d 0.000%. DeFiLlama `apyMean30d` 0.000%. Now: apy 0.000, apyBase 0.000, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean -, sd -, 0 days. Window ratio -.
- RPC: https://eth-mainnet.public.blastapi.io, https://eth.drpc.org, https://mainnet.gateway.tenderly.co. Cross-check: ok (https://eth-mainnet.public.blastapi.io vs https://eth.drpc.org | https://mainnet.gateway.tenderly.co).
- Note: On-chain symbol "yoGOLD" differs from the DeFiLlama symbol "XAUT" (DeFiLlama often labels a vault by its deposit asset).

### (history-handoff) — SDUSD (dtrinity-dusd, Sonic) — match

- Verdict: published 30d mean 0.000% vs realized 0.000%: 0.000 pp, 0.0% relative
- DeFiLlama pool `664664bb-31e0-4e65-808d-6dc82bdb05bb` (https://defillama.com/yields/pool/664664bb-31e0-4e65-808d-6dc82bdb05bb), pool key `0x41a5477364BF60d8936b90310FecFDa79593304E`, url https://app.dtrinity.org/dstake/vault/
- Vault `0x41a5477364BF60d8936b90310FecFDa79593304E` on sonic (chain id 146), on-chain symbol sdUSD, asset `0x53a6abb52b2f968fa80df6a894e4f1b1020da975` (dUSD). Resolved from: DeFiLlama pool key "0x41a5477364BF60d8936b90310FecFDa79593304E". Read with `convertToAssets(1000000000000000000000000000000)`.
- Window: 29.46 days, 30 daily points.
  - 30d start: block 81429711 at 2026-10-21T23:01:26Z (DeFiLlama point 2026-10-21T23:01:26Z), share price 1032875571512969635060312896551
  - 7d start: block 82469522 at 2026-11-12T22:01:09Z (DeFiLlama point 2026-11-12T22:01:10Z), share price 1032875571512969635060312896551
  - end: block 82847677 at 2026-11-20T10:01:13Z (DeFiLlama point 2026-11-20T10:01:13Z), share price 1032875571512969635060312896551
- Realized: 30d 0.000%, 7d 0.000%. Published base mean: 30d 0.000%, 7d 0.000%. DeFiLlama `apyMean30d` 0.000%. Now: apy 0.000, apyBase 0.000, apyReward - (reward 30d mean 0.000).
- Daily ratio realized/published: mean -, sd -, 0 days. Window ratio -.
- RPC: https://rpc.soniclabs.com, https://sonic.drpc.org. Cross-check: ok (https://rpc.soniclabs.com vs https://sonic.drpc.org).

## RPC endpoints

| Chain | Used (passed chain-id and 31-day archive probe) | Rejected |
|---|---|---|
| bsc (56) | https://bsc-mainnet.public.blastapi.io | https://bsc.drpc.org: probe failed: 15 You reached Public endpoint rate limit, please upgrade to paid plan |
| ethereum (1) | https://eth-mainnet.public.blastapi.io<br>https://eth.drpc.org<br>https://mainnet.gateway.tenderly.co | - |
| robinhood (4663) | https://robinhood.drpc.org | https://robinhood-rpc.publicnode.com: no archive state at block 93383046 (2026-10-20T10:30:25Z): -32602 Archive requests require a personal token. Get one at: https://www.allnodes.com/publicnode |
| gnosis (100) | https://rpc.gnosischain.com<br>https://gnosis.gateway.tenderly.co<br>https://gnosis.drpc.org | - |
| arbitrum (42161) | https://arbitrum-one.public.blastapi.io<br>https://arbitrum.gateway.tenderly.co | - |
| avalanche (43114) | https://api.avax.network/ext/bc/C/rpc<br>https://avalanche.gateway.tenderly.co<br>https://avalanche.drpc.org | - |
| plasma (9745) | https://rpc.plasma.to<br>https://9745.rpc.thirdweb.com | https://plasma.gateway.tenderly.co: probe failed: fetch failed |
| fraxtal (252) | https://rpc.frax.com<br>https://fraxtal.drpc.org | - |
| sonic (146) | https://rpc.soniclabs.com<br>https://sonic.drpc.org | - |

## How to reproduce

```
git clone https://github.com/TokenBrice/pharos-watch   # commit 61009b0b88613291ac22e2b515928456252f9389
node share-price-check.mjs path/to/pharos-watch --out reports
```

- Node 20 or later, no dependencies, no API key. The script only reads: the config files as text, `https://yields.llama.fi/poolsEnriched?pool=<id>`, `https://yields.llama.fi/chart/<id>`, `https://api.morpho.org/graphql` for Morpho vaults, and `eth_call` / `eth_getBlockByNumber` on the public RPCs listed above.
- Address resolution: the 0x address inside DeFiLlama's own pool key (`pool_old` in `/poolsEnriched`), then the pool url, then the contract in the Pharos coin file for the pinned id (accepted only if its `asset()` is one of the pool's DeFiLlama `underlyingTokens`). No address is guessed.
- To recompute one number by hand: call `convertToAssets(shares)` on the vault at the start and end blocks listed above, then `(end/start)^(31536000/(tEnd−tStart)) − 1`.
- Block numbers are found by binary search on block timestamps (last block at or before the DeFiLlama point), never by block count.
- `--pools <uuid,...>` checks DeFiLlama pools that are not in the config. `--pair <uuid>=<chain>:<address>` compares a pool with an explicit address. `--prefer <substring>` puts a given RPC first.
- Raw data, including every daily point and the cross-check, is in `2026-11-20-pharos-pins.json`.
