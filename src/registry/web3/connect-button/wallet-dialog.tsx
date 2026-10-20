'use client'

import type { Connector } from 'wagmi'

export type WalletDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  connectors?: (connectors: readonly Connector[]) => readonly Connector[]
}

/**
 * Connect dialog (Radix Dialog).
 *
 * TODO(brenda):
 *  - list: useConnectors() (wagmi v3; useConnect().connectors was removed)
 *  - EIP-6963 wallets come with connector.icon: a data URI supplied by the
 *    extension itself. Render it ONLY via <img src>, never with
 *    dangerouslySetInnerHTML/inline SVG (data:image/svg+xml inside <img> can't run scripts)
 *  - only accept icons starting with "data:image/" (drop http(s) and javascript:)
 *  - WalletConnect: listen to the connector's 'display_uri' event and render the
 *    QR locally; never send the URI to an external service to generate the QR
 *  - mobile: instead of a QR, a button that opens the URI's deep link
 *  - states: list → connecting (with "Cancel") → error (with "Try again")
 *  - fixed footer copy: "Never share or type your recovery phrase"
 */
export function WalletDialog(props: WalletDialogProps) {
  void props
  return null
}
