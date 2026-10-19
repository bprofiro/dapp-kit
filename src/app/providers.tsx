'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { WagmiProvider, type State } from 'wagmi'
import { getConfig } from '@/config/wagmi'

type ProvidersProps = {
  children: ReactNode
  initialState: State | undefined
}

export function Providers({ children, initialState }: ProvidersProps) {
  // useState garante uma instância por cliente (e nunca compartilhada entre
  // requisições no servidor).
  const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
