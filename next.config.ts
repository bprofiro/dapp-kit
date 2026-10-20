import type { NextConfig } from 'next'

/**
 * Security headers for the docs/demo site.
 *
 * For a dApp, the most important one is `frame-ancestors 'none'`: it stops
 * another site from loading your page in an invisible iframe and tricking the
 * user into clicking "Confirm" (clickjacking).
 *
 * TODO(brenda): full CSP with a nonce for scripts. connect-src must list the
 * RPCs and the WalletConnect relay (wss://relay.walletconnect.com,
 * https://rpc.walletconnect.com, https://explorer-api.walletconnect.com …).
 * Start in report-only mode and tighten later.
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
