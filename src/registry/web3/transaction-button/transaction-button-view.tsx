'use client'

import { cn } from '@/lib/cn'
import type { TransactionButtonLabels, TransactionButtonViewProps, TransactionState } from './types'

/**
 * Purely visual part. Receives a ready-made state; never talks to the wallet.
 * This is what the demo uses in mock mode.
 */

const defaultLabels: Required<Omit<TransactionButtonLabels, 'ready'>> = {
  disconnected: 'Connect wallet',
  checking: 'Checking…',
  'wrong-chain': 'Switch network',
  'insufficient-balance': 'Insufficient balance',
  'needs-approval': 'Approve',
  'approve-signing': 'Confirm in wallet…',
  'approve-pending': 'Approving…',
  signing: 'Confirm in wallet…',
  pending: 'Processing…',
  success: 'Done',
  rejected: 'Try again',
  error: 'Try again',
}

/** States where clicking does nothing. */
const inert = new Set<TransactionState['status']>([
  'checking',
  'insufficient-balance',
  'approve-signing',
  'approve-pending',
  'signing',
  'pending',
  'success',
])

export function TransactionButtonView({
  state,
  onAction,
  children,
  labels,
  className,
  ...props
}: TransactionButtonViewProps) {
  const isInert = inert.has(state.status)
  const label = state.status === 'ready' ? (labels?.ready ?? children) : (labels?.[state.status] ?? defaultLabels[state.status])

  return (
    <button
      type="button"
      {...props}
      data-status={state.status}
      // aria-disabled instead of disabled: the button keeps focus during the transaction
      aria-disabled={isInert || undefined}
      aria-busy={state.status === 'checking' || state.status.endsWith('pending') || state.status.endsWith('signing') || undefined}
      onClick={() => {
        if (!isInert) onAction()
      }}
      className={cn(
        // TODO(brenda): final per-data-status styles (see design)
        'inline-flex h-11 min-w-44 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium',
        'bg-primary text-primary-foreground aria-disabled:cursor-not-allowed',
        className,
      )}
    >
      {/* TODO(brenda): per-state icon/spinner */}
      <span>{label}</span>
    </button>
  )
}
