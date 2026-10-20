'use client'

import type { Abi, ContractFunctionName } from 'viem'
import type { TransactionFlow, TransactionFlowOptions } from './types'

/**
 * TransactionButton state machine (headless).
 *
 * TODO(brenda) — suggested order for deriving the state:
 *  1. useConnection()             → 'disconnected'
 *  2. useChainId() !== chainId    → 'wrong-chain'           (run = switchChain)
 *  3. useBalance / useReadContract(balanceOf) loading → 'checking'
 *  4. balance < requires.amount   → 'insufficient-balance'
 *  5. allowance < approval.amount → 'needs-approval'        (run = approve)
 *  6. useSimulateContract failed  → 'error' (kind 'reverted') BEFORE asking for a signature
 *  7. otherwise                   → 'ready'                 (run = write)
 *  Mutations: useWriteContract().mutateAsync (wagmi v3) + useWaitForTransactionReceipt.
 *
 * Security rules this hook must guarantee:
 *  - Send the request returned by the simulation (simulate.data.request), don't
 *    rebuild the args: what was simulated is what gets signed.
 *  - Re-check chainId right before signing (the wallet can switch chains
 *    between render and click).
 *  - 'exact' approval by default; never an implicit maxUint256.
 *  - Re-read the allowance after the approval confirms; don't assume it.
 *  - Block double clicks: only one mutation in flight at a time.
 *  - User rejection (UserRejectedRequestError, code 4001) → 'rejected', not 'error'.
 */
export function useTransactionFlow<
  const abi extends Abi,
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
>(options: TransactionFlowOptions<abi, functionName>): TransactionFlow {
  void options
  // TODO(brenda): implement
  return {
    state: { status: 'disconnected' },
    run: () => {},
    reset: () => {},
  }
}
