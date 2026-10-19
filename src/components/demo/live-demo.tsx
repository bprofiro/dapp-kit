'use client'

import { useState } from 'react'
import { TransactionButtonView } from '@/registry/web3/transaction-button/transaction-button-view'
import type { TransactionState, TransactionStatus } from '@/registry/web3/transaction-button/types'

/**
 * Demo da página de integração.
 * Modo mock: a MESMA view do componente real, alimentada por estados de exemplo.
 *
 * TODO(brenda):
 *  - seletor de estados acessível (radiogroup) ao lado do botão
 *  - "Simular fluxo completo": percorre needs-approval → … → success com
 *    tempos realistas (respeitando prefers-reduced-motion)
 *  - aba "Carteira real" com o TransactionButton de verdade numa testnet
 *  - deixar claro na UI que o modo mock não assina nada
 */

const sampleHash = '0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060' as const

type StateFor<S extends TransactionStatus> = Extract<TransactionState, { status: S }>

export const mockStates: { [S in TransactionStatus]: StateFor<S> } = {
  disconnected: { status: 'disconnected' },
  checking: { status: 'checking' },
  'wrong-chain': { status: 'wrong-chain', expectedChainId: 8453 },
  'insufficient-balance': {
    status: 'insufficient-balance',
    required: 250_000_000n,
    available: 120_500_000n,
    symbol: 'USDC',
    decimals: 6,
  },
  'needs-approval': { status: 'needs-approval', amount: 250_000_000n },
  'approve-signing': { status: 'approve-signing' },
  'approve-pending': { status: 'approve-pending', hash: sampleHash },
  ready: { status: 'ready' },
  signing: { status: 'signing' },
  pending: { status: 'pending', hash: sampleHash },
  success: { status: 'success', hash: sampleHash, blockNumber: 21_874_302n },
  rejected: { status: 'rejected' },
  error: {
    status: 'error',
    error: {
      kind: 'reverted',
      title: 'A transação seria revertida',
      description: 'O vault está pausado (EnforcedPause).',
      cause: null,
    },
  },
}

export function LiveDemo() {
  const [status, setStatus] = useState<TransactionStatus>('ready')
  void setStatus
  return (
    <div className="rounded-md border bg-card p-6">
      <TransactionButtonView state={mockStates[status]} onAction={() => {}}>
        Depositar 250 USDC
      </TransactionButtonView>
    </div>
  )
}
