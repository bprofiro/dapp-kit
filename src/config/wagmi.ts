import { cookieStorage, createConfig, createStorage, fallback, http, type Transport } from 'wagmi'
import { arbitrum, base, mainnet } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

/**
 * Sem 'use client': este arquivo é importado também pelo layout (server)
 * para ler o cookie e montar o initialState.
 */

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

/** RPC dedicado primeiro; RPC público da chain como fallback. */
function rpc(url: string | undefined): Transport {
  return url ? fallback([http(url), http()]) : http()
}

export const chains = [mainnet, base, arbitrum] as const

export function getConfig() {
  return createConfig({
    chains,
    // EIP-6963: carteiras instaladas se anunciam sozinhas (MetaMask, Rabby…).
    // Já é true por padrão; deixado explícito porque o modal depende disso.
    multiInjectedProviderDiscovery: true,
    connectors: [
      injected(),
      ...(projectId
        ? [
            walletConnect({
              projectId,
              // O kit desenha o próprio QR; não carrega o modal do WalletConnect.
              showQrModal: false,
              metadata: {
                name: 'dApp Kit',
                description: 'Componentes React para dApps',
                url: appUrl, // precisa bater com o domínio real (Verify API)
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
