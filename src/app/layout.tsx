import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import { headers } from 'next/headers'
import type { ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'
import { getConfig } from '@/config/wagmi'
import { Providers } from './providers'
import './globals.css'

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'dApp Kit', template: '%s · dApp Kit' },
  description: 'Componentes React para frontends Web3.',
}

/**
 * Aplica o tema antes da primeira pintura (evita flash).
 * TODO(brenda): quando a CSP com nonce entrar, passar o nonce para esta tag.
 */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light'}catch(e){}})()`

export default async function RootLayout({ children }: { children: ReactNode }) {
  const initialState = cookieToInitialState(getConfig(), (await headers()).get('cookie'))

  return (
    <html lang="pt-BR" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* conteúdo fixo, sem dado externo: único uso permitido de dangerouslySetInnerHTML */}
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  )
}
