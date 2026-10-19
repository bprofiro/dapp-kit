'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'

type CopyButtonProps = {
  value: string
  label?: string
  className?: string
}

export function CopyButton({ value, label = 'Copiar', className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard bloqueado (iframe/permissão); TODO(brenda): fallback visual
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        'rounded-sm px-2 py-1 font-mono text-xs text-muted-foreground hover:bg-muted hover:text-foreground',
        className,
      )}
    >
      <span aria-hidden="true">{copied ? 'Copiado' : label}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copiado para a área de transferência' : label}
      </span>
    </button>
  )
}
