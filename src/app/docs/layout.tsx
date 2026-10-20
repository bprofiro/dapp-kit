import Link from 'next/link'
import type { ReactNode } from 'react'
import { ThemeToggle } from '@/components/docs/theme-toggle'

const nav = [
  {
    title: 'Getting started',
    items: [{ href: '/docs/integration', label: 'wagmi integration' }],
  },
  {
    title: 'Components',
    items: [
      { href: '/docs/components/connect-button', label: 'ConnectButton' },
      { href: '/docs/components/transaction-button', label: 'TransactionButton' },
      { href: '/docs/components/address', label: 'Address' },
      { href: '/docs/components/token-balance', label: 'TokenBalance' },
      { href: '/docs/components/chain-select', label: 'ChainSelect' },
      { href: '/docs/components/token-amount-input', label: 'TokenAmountInput' },
    ],
  },
] as const

/**
 * TODO(brenda): mobile menu (sheet), active item with aria-current="page",
 * "Skip to content" link.
 */
export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
        <Link href="/docs/integration" className="font-mono text-sm font-medium">
          dapp-kit
        </Link>
        <ThemeToggle />
      </header>
      <div className="mx-auto flex max-w-6xl gap-10 px-4 md:px-6">
        <nav aria-label="Documentation" className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-56 shrink-0 overflow-y-auto py-8 md:block">
          {nav.map((group) => (
            <div key={group.title} className="mb-6">
              <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">{group.title}</p>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="block rounded-sm px-2 py-1 text-sm hover:bg-muted">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <main id="content" className="min-w-0 flex-1 py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
