import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type {
  Abi,
  Address,
  ContractFunctionArgs,
  ContractFunctionName,
  Hash,
  TransactionReceipt,
} from 'viem'

type WriteMutability = 'nonpayable' | 'payable'

/** Every state the button can be in. Each one carries only what it needs. */
export type TransactionState =
  | { status: 'disconnected' }
  | { status: 'checking' }
  | { status: 'wrong-chain'; expectedChainId: number }
  | { status: 'insufficient-balance'; required: bigint; available: bigint; symbol: string; decimals: number }
  | { status: 'needs-approval'; amount: bigint }
  | { status: 'approve-signing' }
  | { status: 'approve-pending'; hash: Hash }
  | { status: 'ready' }
  | { status: 'signing' }
  | { status: 'pending'; hash: Hash }
  // the full receipt goes to onSuccess; the state keeps only what the UI shows
  | { status: 'success'; hash: Hash; blockNumber: bigint }
  | { status: 'rejected' }
  | { status: 'error'; error: ReadableTxError }

export type TransactionStatus = TransactionState['status']

export type ReadableTxErrorKind =
  | 'reverted'
  | 'insufficient-gas-funds'
  | 'chain-mismatch'
  | 'rpc'
  | 'unknown'

export type ReadableTxError = {
  kind: ReadableTxErrorKind
  /** Short sentence, e.g. "Transaction would revert" */
  title: string
  /** Readable explanation, e.g. "The vault is paused (EnforcedPause)" */
  description: string
  /** Original error, for logging only. Never render this in the UI. */
  cause: unknown
}

export type ApprovalConfig = {
  token: Address
  spender: Address
  amount: bigint
  /**
   * 'exact' (default) approves only the amount of this operation.
   * 'max' approves maxUint256: fewer signatures, but if the spender is ever
   * compromised, the user's whole token balance is exposed. Only use it when
   * the integrator explicitly asks for it.
   */
  mode?: 'exact' | 'max'
}

export type BalanceRequirement = {
  token: Address | 'native'
  amount: bigint
}

/** What is needed to execute the call (same shape as wagmi's writeContract). */
export type ContractCall<
  abi extends Abi,
  functionName extends ContractFunctionName<abi, WriteMutability>,
> = {
  address: Address
  abi: abi
  functionName: functionName
  args: ContractFunctionArgs<abi, WriteMutability, functionName>
  value?: bigint
  /** Required: it's what defines the 'wrong-chain' state. */
  chainId: number
}

export type TransactionFlowOptions<
  abi extends Abi,
  functionName extends ContractFunctionName<abi, WriteMutability>,
> = ContractCall<abi, functionName> & {
  approval?: ApprovalConfig
  requires?: BalanceRequirement
  /** Simulate before asking for a signature. Default: true. */
  simulate?: boolean
  /** Confirmations to wait for. Default: 1. */
  confirmations?: number
  onSubmitted?: (hash: Hash) => void
  onSuccess?: (receipt: TransactionReceipt) => void
  onError?: (error: ReadableTxError) => void
  /** Per-app message override (return undefined to fall back to the default). */
  formatError?: (error: unknown) => ReadableTxError | undefined
  /** Return to 'ready' after success (ms). Default: false. */
  resetAfter?: number | false
}

export type TransactionFlow = {
  state: TransactionState
  /** Click action for the current state (connect, switch chain, approve, submit, retry). */
  run: () => void
  reset: () => void
}

export type TransactionButtonLabels = Partial<Record<TransactionStatus, ReactNode>>

// 'value' is omitted because it clashes with the contract call's value (bigint)
type NativeButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'onClick' | 'onError' | 'children' | 'value'>

export type TransactionButtonViewProps = NativeButtonProps & {
  state: TransactionState
  onAction: () => void
  /** Label in the 'ready' state. */
  children: ReactNode
  labels?: TransactionButtonLabels
}

export type TransactionButtonProps<
  abi extends Abi,
  functionName extends ContractFunctionName<abi, WriteMutability>,
> = TransactionFlowOptions<abi, functionName> &
  NativeButtonProps & {
    children: ReactNode
    labels?: TransactionButtonLabels
    /** Default: chain.blockExplorers.default from the config. */
    explorerUrl?: (hash: Hash, chainId: number) => string | undefined
  }
