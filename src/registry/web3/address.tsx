'use client'

import type { Address as AddressType } from 'viem'

export type AddressProps = {
  address: AddressType
  /** Padrão: true. Mostra o nome ENS (com verificação) quando houver. */
  ens?: boolean
  /** Padrão: true */
  copyable?: boolean
  /** 'short' em listas; 'full' em telas de confirmação/envio. Padrão: 'short'. */
  variant?: 'short' | 'full'
  explorerLink?: boolean
  className?: string
}

/**
 * TODO(brenda):
 *  - sempre normalizar com getAddress (checksum) antes de exibir/copiar
 *  - variant 'short' usa shortenAddress (6+4, ver lib/format.ts)
 *  - title/aria-label com o endereço completo
 *  - feedback de cópia via aria-live ("Endereço copiado")
 */
export function Address(props: AddressProps) {
  void props
  return null
}
