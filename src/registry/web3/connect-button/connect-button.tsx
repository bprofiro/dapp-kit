'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { Address } from 'viem'
import type { Connector } from 'wagmi'

export type ConnectButtonState = 'disconnected' | 'connecting' | 'connected' | 'wrong-chain'

export type ConnectButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'> & {
  /** Default: "Connect wallet" */
  label?: ReactNode
  /** Default: 'ens', falling back to the address. */
  accountDisplay?: 'address' | 'ens' | 'ens-avatar'
  showBalance?: boolean
  /** Default: 'icon' */
  showChain?: boolean | 'icon'
  /** Filter/sort the connectors shown in the dialog. */
  connectors?: (connectors: readonly Connector[]) => readonly Connector[]
  onConnect?: (info: { address: Address; chainId: number }) => void
  onDisconnect?: () => void
}

/**
 * TODO(brenda):
 *  - useConnection() (wagmi v3; previously useAccount)
 *  - disconnected → opens <WalletDialog>; connected → <AccountMenu>
 *  - current chain not in config.chains → 'wrong-chain' state (warning button)
 *  - expose data-state on the <button> for styling
 *  - ENS: only show a name whose reverse resolution is VERIFIED (name → address
 *    must resolve back to the same address). Check whether getEnsName in your
 *    viem version already does this forward check; if not, resolve with
 *    useEnsAddress and compare.
 *    Never show an ENS name without the address nearby on send screens.
 */
export function ConnectButton(props: ConnectButtonProps) {
  void props
  return null
}
