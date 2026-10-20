import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const config = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      // third-party text (token symbol, revert reason, wallet name) never becomes HTML
      'react/no-danger': 'error',
    },
  },
  { ignores: ['.next/**', 'node_modules/**'] },
]

export default config
