import type { Address } from 'viem'

/**
 * TODO(brenda): formatTokenAmount(value: bigint, decimals: number, opts?)
 *  - use viem's formatUnits, never Number() on a bigint
 *  - Intl.NumberFormat with the user's locale
 *  - "< 0.0001" for very small values, no scientific notation
 */

/**
 * Shortened address for LISTS. Keeps 6 characters at the start and 4 at the
 * end: address-poisoning attacks generate addresses that share a short
 * prefix and suffix (0x12…ab). On confirmation screens, show the full address.
 */
export function shortenAddress(address: Address, start = 6, end = 4): string {
  return `${address.slice(0, start + 2)}…${address.slice(-end)}`
}
