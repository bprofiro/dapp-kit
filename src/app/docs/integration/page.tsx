import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { LiveDemo } from '@/components/demo/live-demo'
import { PackageTabs } from '@/components/docs/package-tabs'

export const metadata: Metadata = {
  title: 'wagmi integration',
}

const sections = [
  { id: 'installation', title: 'Installation' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'first-use', title: 'First use' },
  { id: 'demo', title: 'Live demo' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
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
          <p className="font-mono text-xs text-muted-foreground">Getting started</p>
          <h1 className="text-3xl font-semibold tracking-tight">wagmi integration</h1>
          <p className="text-muted-foreground">
            {/* TODO(brenda): intro paragraph */}
          </p>
        </header>

        <Section id="installation" title="Installation">
          <PackageTabs packages={['wagmi', 'viem@2.x', '@tanstack/react-query']} />
          {/* TODO(brenda): wagmi v3 connectors are peer deps: @walletconnect/ethereum-provider, @coinbase/wallet-sdk */}
        </Section>

        <Section id="configuration" title="Configuration">
          {/* TODO(brenda): config/wagmi.ts, providers.tsx, layout.tsx with cookieToInitialState */}
        </Section>

        <Section id="first-use" title="First use">
          {/* TODO(brenda): ConnectButton + TransactionButton with approve + deposit (ERC-4626) */}
        </Section>

        <Section id="demo" title="Live demo">
          <LiveDemo />
        </Section>

        <Section id="troubleshooting" title="Troubleshooting">
          {/* TODO(brenda): hydration mismatch, chain not configured, public RPC rate limits, ABI without as const */}
        </Section>
      </article>

      <nav aria-label="On this page" className="sticky top-22 hidden h-fit w-44 shrink-0 lg:block">
        <p className="mb-2 text-xs font-medium text-muted-foreground">On this page</p>
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
