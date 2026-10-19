'use client'

import { cn } from '@/lib/cn'
import type { TransactionButtonLabels, TransactionButtonViewProps, TransactionState } from './types'

/**
 * Parte puramente visual. Recebe o estado pronto, não fala com a carteira.
 * É o que a demo usa no modo mock.
 */

const defaultLabels: Required<Omit<TransactionButtonLabels, 'ready'>> = {
  disconnected: 'Conectar carteira',
  checking: 'Verificando…',
  'wrong-chain': 'Trocar de rede',
  'insufficient-balance': 'Saldo insuficiente',
  'needs-approval': 'Aprovar',
  'approve-signing': 'Confirme na carteira…',
  'approve-pending': 'Aprovando…',
  signing: 'Confirme na carteira…',
  pending: 'Processando…',
  success: 'Concluído',
  rejected: 'Tentar novamente',
  error: 'Tentar novamente',
}

/** Estados em que o clique não faz nada. */
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
      // aria-disabled em vez de disabled: o botão mantém o foco durante a transação
      aria-disabled={isInert || undefined}
      aria-busy={state.status === 'checking' || state.status.endsWith('pending') || state.status.endsWith('signing') || undefined}
      onClick={() => {
        if (!isInert) onAction()
      }}
      className={cn(
        // TODO(brenda): estilos finais por data-status (ver design)
        'inline-flex h-11 min-w-44 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium',
        'bg-primary text-primary-foreground aria-disabled:cursor-not-allowed',
        className,
      )}
    >
      {/* TODO(brenda): ícone/spinner por estado */}
      <span>{label}</span>
    </button>
  )
}
