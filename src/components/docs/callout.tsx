import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type CalloutProps = {
  tone?: 'note' | 'warning' | 'danger'
  title?: string
  children: ReactNode
}

const tones = {
  note: 'border-l-accent',
  warning: 'border-l-warning',
  danger: 'border-l-destructive',
} as const

export function Callout({ tone = 'note', title, children }: CalloutProps) {
  return (
    <aside className={cn('rounded-r-md border border-l-4 bg-muted/50 px-4 py-3 text-sm', tones[tone])}>
      {title && <p className="mb-1 font-medium">{title}</p>}
      <div className="text-muted-foreground">{children}</div>
    </aside>
  )
}
