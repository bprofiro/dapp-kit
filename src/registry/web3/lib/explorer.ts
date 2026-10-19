import { isAddress, isHash, type Address, type Chain, type Hash } from 'viem'

/**
 * Monta links de explorer SÓ a partir da config da chain (nunca de input do
 * usuário, query string ou resposta de RPC) e valida o hash/endereço antes.
 * Retorna undefined quando não dá para montar um link seguro.
 */
export function buildExplorerTxUrl(chain: Chain | undefined, hash: Hash): string | undefined {
  const base = chain?.blockExplorers?.default.url
  if (!base || !isHash(hash)) return undefined
  return safeJoin(base, `tx/${hash}`)
}

export function buildExplorerAddressUrl(chain: Chain | undefined, address: Address): string | undefined {
  const base = chain?.blockExplorers?.default.url
  if (!base || !isAddress(address, { strict: false })) return undefined
  return safeJoin(base, `address/${address}`)
}

function safeJoin(base: string, path: string): string | undefined {
  try {
    const url = new URL(path, base.endsWith('/') ? base : `${base}/`)
    return url.protocol === 'https:' ? url.toString() : undefined
  } catch {
    return undefined
  }
}
