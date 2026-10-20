'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'

type CopyButtonProps = {
  value: string
  label?: string
  className?: string
}

export function CopyButton({ value, label = 'Copy', className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard blocked (iframe/permissions); TODO(brenda): visual fallback
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
      <span aria-hidden="true">{copied ? 'Copied' : label}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied to clipboard' : label}
      </span>
    </button>
  )
}
