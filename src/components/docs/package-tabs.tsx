'use client'

import { useId, useState, type KeyboardEvent } from 'react'
import { CopyButton } from './copy-button'
import { cn } from '@/lib/cn'

const managers = ['pnpm', 'npm', 'yarn', 'bun'] as const
type Manager = (typeof managers)[number]

const verbs: Record<Manager, string> = {
  pnpm: 'pnpm add',
  npm: 'npm install',
  yarn: 'yarn add',
  bun: 'bun add',
}

type PackageTabsProps = {
  packages: readonly string[]
  dev?: boolean
}

/**
 * pnpm/npm/yarn/bun tabs following the ARIA tabs pattern (arrow keys switch tabs).
 * TODO(brenda): remember the choice (localStorage with try/catch) and sync it
 * across every block on the page.
 */
export function PackageTabs({ packages, dev = false }: PackageTabsProps) {
  const [active, setActive] = useState<Manager>('pnpm')
  const id = useId()
  const command = `${verbs[active]}${dev ? ' -D' : ''} ${packages.join(' ')}`

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    const index = managers.indexOf(active)
    const delta = event.key === 'ArrowRight' ? 1 : -1
    const next = managers[(index + delta + managers.length) % managers.length]
    if (next) {
      setActive(next)
      document.getElementById(`${id}-tab-${next}`)?.focus()
    }
  }

  return (
    <div className="overflow-hidden rounded-md border bg-card">
      <div className="flex items-center justify-between border-b px-1">
        <div role="tablist" aria-label="Package manager" className="flex" onKeyDown={onKeyDown}>
          {managers.map((manager) => (
            <button
              key={manager}
              id={`${id}-tab-${manager}`}
              role="tab"
              type="button"
              aria-selected={active === manager}
              aria-controls={`${id}-panel`}
              tabIndex={active === manager ? 0 : -1}
              onClick={() => setActive(manager)}
              className={cn(
                'border-b-2 border-transparent px-3 py-2 font-mono text-xs text-muted-foreground',
                active === manager && 'border-accent text-foreground',
              )}
            >
              {manager}
            </button>
          ))}
        </div>
        <CopyButton value={command} />
      </div>
      <pre
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
        className="overflow-x-auto p-4 font-mono text-[13px]"
      >
        <code>{command}</code>
      </pre>
    </div>
  )
}
