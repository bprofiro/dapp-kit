'use client'

export type ChainSelectProps = {
  /** Padrão: todas de config.chains (useChains no wagmi v3). */
  chainIds?: readonly number[]
  className?: string
}

/**
 * TODO(brenda):
 *  - useChains() + useSwitchChain().mutate (wagmi v3)
 *  - chain atual não suportada → mostrar "Rede não suportada" em destaque
 *  - nunca usar wallet_addEthereumChain com RPC vindo de fora da config
 */
export function ChainSelect(props: ChainSelectProps) {
  void props
  return null
}
