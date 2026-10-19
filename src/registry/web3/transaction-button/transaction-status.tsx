'use client'

import type { Hash } from 'viem'
import type { TransactionState } from './types'

type TransactionStatusProps = {
  state: TransactionState
  explorerUrl?: (hash: Hash) => string | undefined
  className?: string
}

/**
 * Região aria-live que anuncia as mudanças de estado e mostra o link do explorer.
 * Fica FORA do botão: mudança de texto dentro do próprio botão é anunciada de
 * forma inconsistente entre leitores de tela.
 *
 * TODO(brenda):
 *  - mensagem por estado (pending: "Transação enviada. Aguardando confirmação.")
 *  - erro: mostrar error.title + error.description, nunca error.cause
 *  - link do explorer com rel="noopener noreferrer" e target="_blank",
 *    montado só por buildExplorerTxUrl (lib/explorer.ts)
 *  - use role="status" para progresso; role="alert" só para erro
 */
export function TransactionStatus({ state, explorerUrl, className }: TransactionStatusProps) {
  void explorerUrl
  return (
    <div aria-live="polite" aria-atomic="true" className={className} data-status={state.status}>
      {/* TODO(brenda) */}
    </div>
  )
}
