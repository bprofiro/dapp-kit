import type { NextConfig } from 'next'

/**
 * Cabeçalhos de segurança da página de docs/demo.
 *
 * Em dApp, o mais importante aqui é `frame-ancestors 'none'`: impede que
 * outro site carregue sua página num iframe invisível e engane o usuário
 * para clicar em "Confirmar" (clickjacking).
 *
 * TODO(brenda): CSP completa com nonce para scripts. Precisa listar em
 * connect-src os RPCs e o relay do WalletConnect (wss://relay.walletconnect.com,
 * https://rpc.walletconnect.com, https://explorer-api.walletconnect.com …).
 * Comece em modo report-only e aperte depois.
 */
const securityHeaders = [
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'" },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
