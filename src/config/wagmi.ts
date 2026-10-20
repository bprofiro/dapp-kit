import { cookieStorage, createConfig, createStorage, fallback, http, type Transport } from 'wagmi'
import { arbitrum, base, mainnet } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

/**
 * No 'use client': this file is also imported by the (server) layout to read
 * the cookie and build the initialState.
 */

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

/** Dedicated RPC first; the chain's public RPC as fallback. */
function rpc(url: string | undefined): Transport {
  return url ? fallback([http(url), http()]) : http()
}

export const chains = [mainnet, base, arbitrum] as const

export function getConfig() {
  return createConfig({
    chains,
    // EIP-6963: installed wallets announce themselves (MetaMask, Rabby…).
    // It's already true by default; explicit because the wallet dialog relies on it.
    multiInjectedProviderDiscovery: true,
    connectors: [
      injected(),
      ...(projectId
        ? [
            walletConnect({
              projectId,
              // The kit renders its own QR code; don't load WalletConnect's modal.
              showQrModal: false,
              metadata: {
                name: 'dApp Kit',
                description: 'React components for dApps',
                url: appUrl, // must match the real domain (Verify API)
                icons: [`${appUrl}/icon.png`],
              },
            }),
          ]
        : []),
      coinbaseWallet({ appName: 'dApp Kit' }),
    ],
    ssr: true,
    storage: createStorage({ storage: cookieStorage }),
    transports: {
      [mainnet.id]: rpc(process.env.NEXT_PUBLIC_RPC_URL_MAINNET),
      [base.id]: rpc(process.env.NEXT_PUBLIC_RPC_URL_BASE),
      [arbitrum.id]: rpc(process.env.NEXT_PUBLIC_RPC_URL_ARBITRUM),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
