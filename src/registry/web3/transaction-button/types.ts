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

/** Todos os estados possíveis do botão. Cada um carrega só o que precisa. */
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
  // o receipt completo vai para onSuccess; o estado guarda só o que a UI mostra
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
  /** Frase curta, ex.: "A transação seria revertida" */
  title: string
  /** Explicação legível, ex.: "O vault está pausado (EnforcedPause)" */
  description: string
  /** Erro original, só para log. Nunca renderize isto na UI. */
  cause: unknown
}

export type ApprovalConfig = {
  token: Address
  spender: Address
  amount: bigint
  /**
   * 'exact' (padrão) aprova só o valor da operação.
   * 'max' aprova maxUint256: menos assinaturas, mas se o spender for
   * comprometido, o saldo inteiro do token fica exposto. Só use se o
   * integrador pedir explicitamente.
   */
  mode?: 'exact' | 'max'
}

export type BalanceRequirement = {
  token: Address | 'native'
  amount: bigint
}

/** O que é preciso para executar a chamada (o mesmo formato do writeContract do wagmi). */
export type ContractCall<
  abi extends Abi,
  functionName extends ContractFunctionName<abi, WriteMutability>,
> = {
  address: Address
  abi: abi
  functionName: functionName
  args: ContractFunctionArgs<abi, WriteMutability, functionName>
  value?: bigint
  /** Obrigatório: é o que define o estado "rede errada". */
  chainId: number
}

export type TransactionFlowOptions<
  abi extends Abi,
  functionName extends ContractFunctionName<abi, WriteMutability>,
> = ContractCall<abi, functionName> & {
  approval?: ApprovalConfig
  requires?: BalanceRequirement
  /** Simula antes de pedir assinatura. Padrão: true. */
  simulate?: boolean
  /** Confirmações a esperar. Padrão: 1. */
  confirmations?: number
  onSubmitted?: (hash: Hash) => void
  onSuccess?: (receipt: TransactionReceipt) => void
  onError?: (error: ReadableTxError) => void
  /** Override de mensagens por app (retorne undefined para usar o padrão). */
  formatError?: (error: unknown) => ReadableTxError | undefined
  /** Volta para 'ready' depois do sucesso (ms). Padrão: false. */
  resetAfter?: number | false
}

export type TransactionFlow = {
  state: TransactionState
  /** Ação do clique no estado atual (conectar, trocar rede, aprovar, enviar, tentar de novo). */
  run: () => void
  reset: () => void
}

export type TransactionButtonLabels = Partial<Record<TransactionStatus, ReactNode>>

// 'value' sai porque colide com o value (bigint) da chamada ao contrato
type NativeButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'onClick' | 'onError' | 'children' | 'value'>

export type TransactionButtonViewProps = NativeButtonProps & {
  state: TransactionState
  onAction: () => void
  /** Rótulo no estado 'ready'. */
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
    /** Padrão: chain.blockExplorers.default da config. */
    explorerUrl?: (hash: Hash, chainId: number) => string | undefined
  }
