'use client'

import type { Address } from 'viem'

export type TokenAmountInputProps = {
  token: Address | 'native'
  decimals: number
  symbol: string
  /** Value in base units (wei). undefined = empty. */
  value: bigint | undefined
  onValueChange: (value: bigint | undefined) => void
  /** Default: connected account's balance. */
  max?: bigint
  /** For the native token: how much to keep for gas when MAX is clicked. */
  gasReserve?: bigint
  label?: string
  id?: string
  className?: string
}

/**
 * TODO(brenda):
 *  - keep the typed string and convert with parseUnits (never floats)
 *  - accept both comma and dot as decimal separator; reject more decimals than `decimals`
 *  - inputMode="decimal", not type="number"
 *  - MAX: exact balance as bigint (minus gasReserve for native)
 *  - balance error tied to the input via aria-describedby + aria-invalid
 */
export function TokenAmountInput(props: TokenAmountInputProps) {
  void props
  return null
}
