import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const config = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      // texto de terceiros (symbol, reason de revert, nome de carteira) nunca vira HTML
      'react/no-danger': 'error',
    },
  },
  { ignores: ['.next/**', 'node_modules/**'] },
]

export default config
