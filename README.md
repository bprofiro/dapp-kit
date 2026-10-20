# dapp-kit

React components for Web3 frontends, built on wagmi and viem. Like shadcn/ui, you copy
the component source into your own project instead of depending on a closed package.

> **Status: scaffold.** Configuration, providers, types and empty component files are in
> place. Each component file has a `TODO(brenda)` block listing what is missing and the
> security rules that component must follow.

## Stack

Next.js (App Router) · TypeScript (strict) · Tailwind CSS 4 · wagmi 3 · viem 2 · TanStack Query 5

## Getting started

Requires Node.js 20.9+ and pnpm 10.16+ (`corepack enable pnpm` on Node 20–24, or `npm install -g pnpm@10`).

```bash
cp .env.example .env.local   # fill in your WalletConnect projectId
pnpm install
pnpm dev                     # opens /docs/integration
pnpm typecheck
```

`package.json` uses `^` ranges on the current majors. `pnpm install` writes the exact
versions to the lockfile — **commit the lockfile**. Run `pnpm outdated` to check for newer releases.

## What is ready

| File | Status |
| --- | --- |
| `src/config/wagmi.ts` | Ready. Ethereum, Base, Arbitrum; injected (EIP-6963), WalletConnect, Coinbase Wallet; cookie-based SSR |
| `src/app/providers.tsx`, `src/app/layout.tsx` | Ready. `cookieToInitialState` prevents hydration mismatches |
| `src/app/globals.css` | Light/dark tokens, visible focus, reduced motion |
| `next.config.ts` | Security headers (anti-clickjacking, etc.). Full CSP is a TODO |
| `pnpm-workspace.yaml`, `.npmrc` | Supply-chain safeguards (minimum release age, exact versions) |
| `src/registry/web3/transaction-button/types.ts` | Full API (states, props) |
| `src/registry/web3/lib/explorer.ts` | Ready. Validated explorer links |
| `src/registry/abis/erc4626.ts` | ABI with `as const` |
| `src/components/docs/*` | Copy button, package-manager tabs (ARIA tabs), callout and theme toggle work; syntax highlighting is a TODO |

## What is left (TODOs)

- `use-transaction-flow.ts` — the state machine
- `transaction-button-view.tsx` — per-state visuals (already exposes `data-status` and `aria-disabled`)
- `transaction-status.tsx` — `aria-live` messages and explorer link
- `lib/parse-tx-error.ts` — viem errors to readable text
- `connect-button/*` — button, wallet dialog, account menu
- `address.tsx`, `token-balance.tsx`, `chain-select.tsx`, `token-amount-input.tsx`
- `components/demo/live-demo.tsx` — state picker and "simulate full flow"
- Content of `src/app/docs/integration/page.tsx`
- The `/docs/components/*` pages linked from the sidebar don't exist yet

## Security rules

1. Third-party data never becomes HTML or a link: token `symbol`, `name`, revert reasons,
   wallet names and icons. Plain text, length-capped. (`react/no-danger` is an ESLint error.)
2. What is simulated is what gets signed: send `simulate.data.request`.
3. Exact approvals by default. `maxUint256` only with an explicit opt-in.
4. Full checksummed address on confirmation screens; copy from the value, never from the rendered text.
5. Explorer links are built only from the chain config (`lib/explorer.ts`).
6. Wallet icons only as `<img src="data:image/...">`.
7. No runtime CDNs; minimal dependencies; commit the lockfile.

## License

TBD.
