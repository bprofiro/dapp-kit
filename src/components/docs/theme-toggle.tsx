'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  // null até montar: evita hydration mismatch (o servidor não sabe o tema)
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  }, [])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // storage indisponível: o tema vale só para esta visita
    }
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Usar tema claro' : 'Usar tema escuro'}
      className="rounded-md border px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
    >
      {theme === null ? 'Tema' : theme === 'dark' ? 'Claro' : 'Escuro'}
    </button>
  )
}
