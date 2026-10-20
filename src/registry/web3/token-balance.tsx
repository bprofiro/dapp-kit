'use client'

import type { Address } from 'viem'

export type TokenBalanceProps = {
  /** 'native' for the chain's native token. */
  token: Address | 'native'
  /** Default: connected account. */
  account?: Address
  chainId?: number
  showSymbol?: boolean
  className?: string
}

/**
 * TODO(brenda):
 *  - wagmi v3 removed balance.formatted: format with formatUnits + Intl
 *  - symbol/name come from the contract (third-party data): plain text,
 *    length-capped, never a link. Spam tokens use the symbol for phishing
 *    ("VISIT-claim-site.xyz").
 *  - logos: only from a token list YOU control; never a URL coming from the contract
 *  - skeleton while loading; "—" when disconnected
 */
export function TokenBalance(props: TokenBalanceProps) {
  void props
  return null
}
