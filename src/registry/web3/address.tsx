'use client'

import type { Address as AddressType } from 'viem'

export type AddressProps = {
  address: AddressType
  /** Default: true. Shows the (verified) ENS name when available. */
  ens?: boolean
  /** Default: true */
  copyable?: boolean
  /** 'short' in lists; 'full' on confirmation/send screens. Default: 'short'. */
  variant?: 'short' | 'full'
  explorerLink?: boolean
  className?: string
}

/**
 * TODO(brenda):
 *  - always normalize with getAddress (checksum) before displaying/copying
 *  - 'short' variant uses shortenAddress (6+4, see lib/format.ts)
 *  - title/aria-label with the full address
 *  - copy feedback via aria-live ("Address copied")
 */
export function Address(props: AddressProps) {
  void props
  return null
}
