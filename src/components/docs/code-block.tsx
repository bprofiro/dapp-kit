import { CopyButton } from './copy-button'

type CodeBlockProps = {
  code: string
  /** Nome do arquivo mostrado no cabeçalho, ex.: "config/wagmi.ts" */
  title?: string
  lang?: 'ts' | 'tsx' | 'bash' | 'json' | 'css'
}

/**
 * TODO(brenda): realce de sintaxe com Shiki no servidor (sem JS no cliente),
 * com tema claro/escuro via CSS variables.
 */
export function CodeBlock({ code, title, lang = 'ts' }: CodeBlockProps) {
  return (
    <figure className="overflow-hidden rounded-md border bg-card">
      <figcaption className="flex items-center justify-between border-b px-3 py-1.5">
        <span className="font-mono text-xs text-muted-foreground">{title ?? lang}</span>
        <CopyButton value={code} />
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed" tabIndex={0}>
        <code data-lang={lang}>{code}</code>
      </pre>
    </figure>
  )
}
