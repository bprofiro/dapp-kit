import type { ReadableTxError } from '../transaction-button/types'

/**
 * Converte qualquer erro do viem/wagmi em algo que dá para mostrar ao usuário.
 *
 * TODO(brenda):
 *  - err instanceof BaseError → err.walk() para achar a causa raiz
 *  - UserRejectedRequestError (code 4001) → tratar como 'rejected' no hook, não aqui
 *  - ContractFunctionRevertedError → data.errorName (custom error da ABI) ou reason
 *  - InsufficientFundsError → 'insufficient-gas-funds'
 *  - ChainMismatchError / SwitchChainError → 'chain-mismatch'
 *  - HttpRequestError (429/5xx) → 'rpc' ("A rede está instável. Tente de novo.")
 *  - fallback 'unknown' com mensagem genérica
 *
 * Segurança: a mensagem final é texto puro. Nunca renderizar como HTML e nunca
 * transformar em link: reason/errorName vêm do contrato ou do RPC, ou seja,
 * de terceiros (pode conter "visite site-falso.xyz para resgatar").
 * Corte strings longas.
 */
export function parseTxError(error: unknown): ReadableTxError {
  return {
    kind: 'unknown',
    title: 'Algo deu errado',
    description: 'Não foi possível concluir a transação.',
    cause: error,
  }
}
