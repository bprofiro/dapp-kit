import { isAddress, isHash, type Address, type Chain, type Hash } from 'viem'

/**
 * Builds explorer links ONLY from the chain config (never from user input,
 * query strings or RPC responses) and validates the hash/address first.
 * Returns undefined when a safe link can't be built.
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
