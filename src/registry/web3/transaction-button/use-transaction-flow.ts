'use client'

import type { Abi, ContractFunctionName } from 'viem'
import type { TransactionFlow, TransactionFlowOptions } from './types'

/**
 * Máquina de estados do TransactionButton (headless).
 *
 * TODO(brenda) — ordem sugerida de derivação do estado:
 *  1. useConnection()            → 'disconnected'
 *  2. useChainId() !== chainId   → 'wrong-chain'           (run = switchChain)
 *  3. useBalance / useReadContract(balanceOf) carregando → 'checking'
 *  4. saldo < requires.amount    → 'insufficient-balance'
 *  5. allowance < approval.amount → 'needs-approval'      (run = approve)
 *  6. useSimulateContract falhou → 'error' (kind 'reverted') ANTES de pedir assinatura
 *  7. senão                      → 'ready'                 (run = write)
 *  Mutações: useWriteContract().mutateAsync (wagmi v3) + useWaitForTransactionReceipt.
 *
 * Regras de segurança que este hook deve garantir:
 *  - Enviar o request devolvido pela simulação (simulate.data.request), não
 *    reconstruir os args: o que foi simulado é o que é assinado.
 *  - Conferir chainId de novo imediatamente antes de assinar (a carteira pode
 *    trocar de rede entre o render e o clique).
 *  - Approve em modo 'exact' por padrão; nunca maxUint256 implícito.
 *  - Re-ler a allowance depois do approve confirmar, não assumir.
 *  - Bloquear duplo clique: só um mutate em voo por vez.
 *  - Erro de usuário recusando (UserRejectedRequestError, code 4001) → 'rejected', não 'error'.
 */
export function useTransactionFlow<
  const abi extends Abi,
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
>(options: TransactionFlowOptions<abi, functionName>): TransactionFlow {
  void options
  // TODO(brenda): implementar
  return {
    state: { status: 'disconnected' },
    run: () => {},
    reset: () => {},
  }
}
