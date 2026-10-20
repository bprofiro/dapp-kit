import type { ReadableTxError } from '../transaction-button/types'

/**
 * Turns any viem/wagmi error into something that can be shown to the user.
 *
 * TODO(brenda):
 *  - err instanceof BaseError → err.walk() to find the root cause
 *  - UserRejectedRequestError (code 4001) → handled as 'rejected' in the hook, not here
 *  - ContractFunctionRevertedError → data.errorName (custom error from the ABI) or reason
 *  - InsufficientFundsError → 'insufficient-gas-funds'
 *  - ChainMismatchError / SwitchChainError → 'chain-mismatch'
 *  - HttpRequestError (429/5xx) → 'rpc' ("The network is unstable. Try again.")
 *  - fallback 'unknown' with a generic message
 *
 * Security: the final message is plain text. Never render it as HTML and never
 * turn it into a link: reason/errorName come from the contract or the RPC,
 * i.e. from third parties (it may contain "visit fake-site.xyz to claim").
 * Truncate long strings.
 */
export function parseTxError(error: unknown): ReadableTxError {
  return {
    kind: 'unknown',
    title: 'Something went wrong',
    description: 'The transaction could not be completed.',
    cause: error,
  }
}
