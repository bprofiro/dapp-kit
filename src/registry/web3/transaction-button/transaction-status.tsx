'use client'

import type { Hash } from 'viem'
import type { TransactionState } from './types'

type TransactionStatusProps = {
  state: TransactionState
  explorerUrl?: (hash: Hash) => string | undefined
  className?: string
}

/**
 * aria-live region that announces state changes and shows the explorer link.
 * It lives OUTSIDE the button: text changes inside the button itself are
 * announced inconsistently across screen readers.
 *
 * TODO(brenda):
 *  - message per state (pending: "Transaction submitted. Waiting for confirmation.")
 *  - error: show error.title + error.description, never error.cause
 *  - explorer link with rel="noopener noreferrer" and target="_blank",
 *    built only by buildExplorerTxUrl (lib/explorer.ts)
 *  - role="status" for progress; role="alert" only for errors
 */
export function TransactionStatus({ state, explorerUrl, className }: TransactionStatusProps) {
  void explorerUrl
  return (
    <div aria-live="polite" aria-atomic="true" className={className} data-status={state.status}>
      {/* TODO(brenda) */}
    </div>
  )
}
