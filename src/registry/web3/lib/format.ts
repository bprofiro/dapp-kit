import type { Address } from 'viem'

/**
 * TODO(brenda): formatTokenAmount(value: bigint, decimals: number, opts?)
 *  - usar formatUnits do viem, nunca Number() em bigint
 *  - Intl.NumberFormat com locale do usuário
 *  - "< 0,0001" para valores muito pequenos, sem notação científica
 */

/**
 * Endereço encurtado para LISTAS. Mantém 6 caracteres no começo e 4 no fim:
 * ataques de "address poisoning" geram endereços com o mesmo começo e fim
 * curtos (0x12…ab). Em telas de confirmação, mostre o endereço completo.
 */
export function shortenAddress(address: Address, start = 6, end = 4): string {
  return `${address.slice(0, start + 2)}…${address.slice(-end)}`
}
