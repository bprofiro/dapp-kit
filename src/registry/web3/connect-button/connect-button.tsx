'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { Address } from 'viem'
import type { Connector } from 'wagmi'

export type ConnectButtonState = 'disconnected' | 'connecting' | 'connected' | 'wrong-chain'

export type ConnectButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'> & {
  /** Padrão: "Conectar carteira" */
  label?: ReactNode
  /** Padrão: 'ens' com fallback para o endereço. */
  accountDisplay?: 'address' | 'ens' | 'ens-avatar'
  showBalance?: boolean
  /** Padrão: 'icon' */
  showChain?: boolean | 'icon'
  /** Filtrar/ordenar conectores mostrados no modal. */
  connectors?: (connectors: readonly Connector[]) => readonly Connector[]
  onConnect?: (info: { address: Address; chainId: number }) => void
  onDisconnect?: () => void
}

/**
 * TODO(brenda):
 *  - useConnection() (wagmi v3; antes era useAccount)
 *  - desconectado → abre <WalletDialog>; conectado → <AccountMenu>
 *  - chain atual fora de config.chains → estado 'wrong-chain' (botão de alerta)
 *  - expor data-state no <button> para estilização
 *  - ENS: exibir só nome com resolução reversa VERIFICADA (nome → endereço tem
 *    que voltar ao mesmo endereço). Confirme se o getEnsName da sua versão do
 *    viem já faz esse forward-check; se não, resolva com useEnsAddress e compare.
 *    Nunca mostre ENS sem o endereço por perto em telas de envio.
 */
export function ConnectButton(props: ConnectButtonProps) {
  void props
  return null
}
