'use client'

import type { Address } from 'viem'

export type TokenBalanceProps = {
  /** 'native' para o token nativo da chain. */
  token: Address | 'native'
  /** Padrão: conta conectada. */
  account?: Address
  chainId?: number
  showSymbol?: boolean
  className?: string
}

/**
 * TODO(brenda):
 *  - wagmi v3 removeu balance.formatted: formatar com formatUnits + Intl
 *  - symbol/name vêm do contrato (dados de terceiro): texto puro, cortar
 *    tamanho, nunca virar link. Tokens de spam usam o symbol para phishing
 *    ("VISIT-claim-site.xyz").
 *  - logos: só de uma lista de tokens que VOCÊ controla; nada de URL vinda do contrato
 *  - skeleton enquanto carrega; "—" quando desconectado
 */
export function TokenBalance(props: TokenBalanceProps) {
  void props
  return null
}
