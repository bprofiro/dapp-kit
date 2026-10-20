'use client'

import type { Abi, ContractFunctionName } from 'viem'
import { TransactionButtonView } from './transaction-button-view'
import { TransactionStatus } from './transaction-status'
import type { TransactionButtonProps } from './types'
import { useTransactionFlow } from './use-transaction-flow'

/**
 * Composite component: hook (logic) + view (visuals) + status (aria-live).
 * For a different UI, use useTransactionFlow directly.
 */
export function TransactionButton<
  const abi extends Abi,
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
>(props: TransactionButtonProps<abi, functionName>) {
  const {
    address, abi, functionName, args, value, chainId,
    approval, requires, simulate, confirmations,
    onSubmitted, onSuccess, onError, formatError, resetAfter,
    children, labels, explorerUrl, ...buttonProps
  } = props

  const flow = useTransactionFlow<abi, functionName>({
    address, abi, functionName, args, value, chainId,
    approval, requires, simulate, confirmations,
    onSubmitted, onSuccess, onError, formatError, resetAfter,
  })

  return (
    <div className="flex flex-col items-start gap-2">
      <TransactionButtonView {...buttonProps} state={flow.state} onAction={flow.run} labels={labels}>
        {children}
      </TransactionButtonView>
      <TransactionStatus
        state={flow.state}
        explorerUrl={explorerUrl ? (hash) => explorerUrl(hash, chainId) : undefined}
      />
    </div>
  )
}
