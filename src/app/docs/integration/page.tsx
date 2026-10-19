import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { LiveDemo } from '@/components/demo/live-demo'
import { PackageTabs } from '@/components/docs/package-tabs'

export const metadata: Metadata = {
  title: 'Integração com wagmi',
}

const sections = [
  { id: 'instalacao', title: 'Instalação' },
  { id: 'configuracao', title: 'Configuração' },
  { id: 'primeiro-uso', title: 'Primeiro uso' },
  { id: 'demo', title: 'Demo ao vivo' },
  { id: 'problemas-comuns', title: 'Problemas comuns' },
] as const

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-title`} className="scroll-mt-20 space-y-4 border-t pt-10 first:border-t-0 first:pt-0">
      <h2 id={`${id}-title`} className="text-xl font-semibold tracking-tight">
        <a href={`#${id}`} id={id}>
          {title}
        </a>
      </h2>
      {children}
    </section>
  )
}

export default function IntegrationPage() {
  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1 space-y-10">
        <header className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">Começando</p>
          <h1 className="text-3xl font-semibold tracking-tight">Integração com wagmi</h1>
          <p className="text-muted-foreground">
            {/* TODO(brenda): parágrafo de abertura */}
          </p>
        </header>

        <Section id="instalacao" title="Instalação">
          <PackageTabs packages={['wagmi', 'viem@2.x', '@tanstack/react-query']} />
          {/* TODO(brenda): conectores do wagmi v3 são peer deps: @walletconnect/ethereum-provider, @coinbase/wallet-sdk */}
        </Section>

        <Section id="configuracao" title="Configuração">
          {/* TODO(brenda): config/wagmi.ts, providers.tsx, layout.tsx com cookieToInitialState */}
        </Section>

        <Section id="primeiro-uso" title="Primeiro uso">
          {/* TODO(brenda): ConnectButton + TransactionButton com approve + deposit (ERC-4626) */}
        </Section>

        <Section id="demo" title="Demo ao vivo">
          <LiveDemo />
        </Section>

        <Section id="problemas-comuns" title="Problemas comuns">
          {/* TODO(brenda): hydration mismatch, chain não configurada, rate limit do RPC público, ABI sem as const */}
        </Section>
      </article>

      <nav aria-label="Nesta página" className="sticky top-22 hidden h-fit w-44 shrink-0 lg:block">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Nesta página</p>
        <ul className="space-y-1.5 text-sm">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-muted-foreground hover:text-foreground">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
