# Cases

Each entry is a published number that disagreed with its on-chain source, what the chain said, and what happened after I reported it. Every case links to the public issue or pull request, so the evidence can be read where it was reviewed.

An entry is added only after the project has been told. Last updated 2026-11-25.

| # | Project | What was wrong | Status |
|---|---|---|---|
| 1 | DefiLlama yields | Maple pool TVL counted borrower collateral | Fixed in 20 h |
| 2 | Yearn Kong | Base vaults showed more than double their monthly APY | Fixed in 27 h |
| 3 | Pharos | USDG yield included a reward most users cannot claim | Fixed in 28 h |
| 4 | Pharos | 30-day APY: I tested my own proposal and recommended against it | Better method shipped |
| 5 | Yearn Curation | Risk reports described multisigs that had changed | Open |
| 6 | Beefy | A Curve vault showed 17.6% while earning 3.5% | Open |
| 7 | Beefy | A retired vault still returned a 1,012% APY | Open |
| 8 | Pharos | My own wrong claim about a fee, and its correction | Closed |

## 1. DefiLlama: Maple's Syrup pools showed 2.4× the money lenders had deposited

- **Published:** $3,429M. **On-chain:** $1,416M.
- **Cause:** the adapter added borrower collateral (the BTC and XRP posted against loans) on top of the pools' own capital.
- **Check:** `totalAssets()` on the three pool contracts.
- **Outcome:** reported 17 Nov 2026 in [yield-server#3222](https://github.com/DefiLlama/yield-server/issues/3222), fixed in [#3231](https://github.com/DefiLlama/yield-server/pull/3231).

## 2. Yearn Kong: every Yearn vault on Base reported more than double its real monthly APY

- **Published:** 11.84%. **On-chain:** 5.21%. Figures for ysUSDC, the largest of the 10 affected vaults.
- **Cause:** the indexer annualized by counting blocks. Base cut its block time from 2 s to 0.2 s on 5 Nov 2026.
- **Check:** share price at blocks located by timestamp, annualized on elapsed seconds.
- **Outcome:** reported 17 Nov 2026 in [kong#525](https://github.com/yearn/kong/issues/525), fixed by the maintainers in [#527](https://github.com/yearn/kong/pull/527). The same formula also skewed since-inception APY on Ethereum, and the fix corrected those values too.

## 3. Pharos: USDG's headline yield included a reward only Robinhood users can claim

- **Published:** 7.46%. **Earnable by anyone:** 4.04%.
- **Cause:** about 3 points of the 30-day figure came from a whitelist-only Merkl campaign.
- **Check:** DeFiLlama's base and reward legs, Morpho's own net APY for the vault, and the Merkl campaign type.
- **Outcome:** reported 17 Nov 2026 in [pharos-watch#2095](https://github.com/TokenBrice/pharos-watch/issues/2095). My patch [#2096](https://github.com/TokenBrice/pharos-watch/pull/2096) was merged and the maintainer extended it to every intake path, as yield methodology v8.55.

## 4. Pharos: I tested my own proposal on-chain and recommended against it

- **Proposal:** cap spikes in the 30-day APY, on the idea that spikes are noise.
- **Check:** 31 days of published daily rates against share-price growth. The largest spike was 15.37% published against 14.94% realized. The spikes were real yield.
- **Outcome:** I marked my pull request [#2114](https://github.com/TokenBrice/pharos-watch/pull/2114) as a draft and suggested measuring 30-day APY from the share price instead. The maintainer replayed the test on 114,000 production samples, agreed, and shipped that method in [#2136](https://github.com/TokenBrice/pharos-watch/pull/2136) as v8.57. One row went from +20.7% to −24.5%, because its share price had been falling.
- **Note:** the steakUSDT row in that pull request description used the wrong vault. See case 8.

## 5. Yearn Curation: risk reports described multisigs that had since changed

- **Reported against the chain:**
  - Reserve ETH+ guardian: 2-of-8 on-chain, 3-of-6 in the report. [risk-score#606](https://github.com/yearn/risk-score/issues/606)
  - Yearn's Brain multisig: 3-of-6 on-chain, 3-of-8 in six reports. [#607](https://github.com/yearn/risk-score/issues/607)
  - Mezo MUSD owner: 4-of-7 on-chain, 5-of-9 in the report. [#608](https://github.com/yearn/risk-score/issues/608)
- **Check:** `getThreshold()` and `getOwners()` on each Safe.
- **Why it matters:** each report lists a signer change as a trigger for reassessment.
- **What passed:** the 73 dated figures I re-read at their cited blocks all matched. The reports were right when written and drifted afterwards.
- **Outcome:** reported 18 Nov 2026. Open.

## 6. Beefy: a Curve vault showed 17.6% while it was earning 3.5%

- **Published:** 17.56%. **On-chain:** 3.53%.
- **Cause:** the API takes the higher of Curve's daily and weekly figures. For pools that book fees once a week, the day after shows a whole week of fees as a daily rate.
- **Check:** the vault's share price and the pool's virtual price over 7 days.
- **Outcome:** reported 17 Nov 2026 in [beefy-api#1987](https://github.com/beefyfinance/beefy-api/issues/1987). Open. A pull request with a fix was closed without comment.

## 7. Beefy: a retired vault still returned a 1,012% APY

- **Finding:** the vault was retired in December 2025 and nothing is withdrawable on-chain, but the API kept serving a frozen figure. 818 of 3,029 retired vaults still carried an APY above zero.
- **Outcome:** reported 17 Nov 2026 in [beefy-api#1988](https://github.com/beefyfinance/beefy-api/issues/1988). Open.

## 8. Pharos: my own wrong claim, and its correction

- **What I claimed:** that DeFiLlama published the steakUSDT pool gross of a 5% vault fee, about 0.2 points high.
- **What was true:** two vaults share the symbol `steakUSDT`. The tracked pool is the fee-free one. I had read the share price of the other, which charges 5%. The steady 5% gap was the fee difference between two vaults.
- **Correct figures:** published 4.108%, realized 4.178% for the tracked vault. For the two fee-bearing vaults Pharos tracks, DeFiLlama already publishes the net rate: gtUSDC 4.664% against 4.659%, bbqUSDC 6.457% against 6.452%.
- **Outcome:** the maintainer found the mix-up independently, and I posted the full correction in [pharos-watch#2131](https://github.com/TokenBrice/pharos-watch/issues/2131#issuecomment-7033823303) on 20 Nov 2026. The issue is closed.
- **What changed:** the script in this repository resolves a vault from the address in DeFiLlama's pool key and confirms `asset()` on-chain. It never resolves by symbol.

## Also

15 of my pull requests to DefiLlama's TVL adapters were merged between 20 Oct and 23 Nov 2026 ([list](https://github.com/DefiLlama/DefiLlama-Adapters/pulls?q=is%3Apr+author%3Arobertofd31+is%3Amerged)): missing pools and chains, double counting, and vaults attributed to the wrong curator.

Most numbers pass. The [reports](reports/) list every pool checked, including the ones that match.
