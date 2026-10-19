'use client'

import type { Connector } from 'wagmi'

export type WalletDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  connectors?: (connectors: readonly Connector[]) => readonly Connector[]
}

/**
 * Modal de conexão (Radix Dialog).
 *
 * TODO(brenda):
 *  - lista: useConnectors() (wagmi v3; useConnect().connectors foi removido)
 *  - carteiras EIP-6963 vêm com connector.icon: é uma data URI fornecida pela
 *    própria extensão. Renderizar SÓ em <img src>, nunca com
 *    dangerouslySetInnerHTML/inline SVG (data:image/svg+xml em <img> não executa script)
 *  - aceitar só ícones que começam com "data:image/" (descartar http(s) e javascript:)
 *  - WalletConnect: ouvir o evento 'display_uri' do connector e desenhar o QR
 *    localmente; nunca mandar o URI para um serviço externo gerar o QR
 *  - mobile: em vez de QR, botão que abre o deep link do URI
 *  - estados: lista → conectando (com "Cancelar") → erro (com "Tentar de novo")
 *  - texto fixo no rodapé: "Nunca peça nem digite sua frase de recuperação"
 */
export function WalletDialog(props: WalletDialogProps) {
  void props
  return null
}
