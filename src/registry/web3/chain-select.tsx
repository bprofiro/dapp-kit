'use client'

export type ChainSelectProps = {
  /** Default: every chain in config.chains (useChains in wagmi v3). */
  chainIds?: readonly number[]
  className?: string
}

/**
 * TODO(brenda):
 *  - useChains() + useSwitchChain().mutate (wagmi v3)
 *  - unsupported current chain → highlight "Unsupported network"
 *  - never call wallet_addEthereumChain with an RPC from outside the config
 */
export function ChainSelect(props: ChainSelectProps) {
  void props
  return null
}
