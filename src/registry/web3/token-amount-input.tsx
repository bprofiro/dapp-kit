'use client'

import type { Address } from 'viem'

export type TokenAmountInputProps = {
  token: Address | 'native'
  decimals: number
  symbol: string
  /** Valor em unidades base (wei). undefined = vazio. */
  value: bigint | undefined
  onValueChange: (value: bigint | undefined) => void
  /** Padrão: saldo da conta conectada. */
  max?: bigint
  /** Para token nativo: quanto reservar para gás ao clicar em MAX. */
  gasReserve?: bigint
  label?: string
  id?: string
  className?: string
}

/**
 * TODO(brenda):
 *  - guardar a string digitada e converter com parseUnits (nunca float)
 *  - aceitar vírgula e ponto como separador decimal; rejeitar mais casas que `decimals`
 *  - inputMode="decimal", não type="number"
 *  - MAX: valor exato do saldo em bigint (menos gasReserve se nativo)
 *  - erro de saldo ligado ao input por aria-describedby + aria-invalid
 */
export function TokenAmountInput(props: TokenAmountInputProps) {
  void props
  return null
}
