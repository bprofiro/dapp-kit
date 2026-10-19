# dapp-kit — casca

Esqueleto do kit: configuração, providers, tipos e arquivos vazios dos componentes.
A lógica dos componentes é sua — cada arquivo tem um bloco `TODO(brenda)` com o que
falta e as regras de segurança que aquele componente precisa respeitar.

## Rodar

```bash
cp .env.example .env.local   # preencha o projectId do WalletConnect
pnpm install
pnpm dev                     # abre em /docs/integration
pnpm typecheck
```

As versões no `package.json` usam `^` nas majors atuais (wagmi 3, viem 2, Next 16,
TanStack Query 5, Tailwind 4). O `pnpm install` gera o lockfile com as versões exatas —
**commite o lockfile**. Rode `pnpm outdated` para conferir se há algo mais novo.

## O que já está pronto

| Arquivo | Estado |
| --- | --- |
| `src/config/wagmi.ts` | Pronto. Ethereum, Base, Arbitrum; injected (EIP-6963), WalletConnect, Coinbase; SSR com cookie |
| `src/app/providers.tsx`, `src/app/layout.tsx` | Prontos. `cookieToInitialState` evita hydration mismatch |
| `src/app/globals.css` | Tokens claro/escuro (mesmos valores do design), foco visível, reduced motion |
| `next.config.ts` | Cabeçalhos de segurança (anti-clickjacking etc.). CSP completa é TODO |
| `pnpm-workspace.yaml`, `.npmrc` | Proteções de supply chain (idade mínima de release, versões exatas) |
| `src/registry/web3/transaction-button/types.ts` | API completa (estados, props) |
| `src/registry/web3/lib/explorer.ts` | Pronto. Links de explorer validados |
| `src/registry/abis/erc4626.ts` | ABI `as const` |
| `src/components/docs/*` | Copy button, abas de pacote (ARIA tabs), callout, toggle de tema funcionais; realce de sintaxe é TODO |

## O que é seu (TODOs)

- `use-transaction-flow.ts` — a máquina de estados
- `transaction-button-view.tsx` — visual por estado (já tem `data-status` e `aria-disabled`)
- `transaction-status.tsx` — mensagens `aria-live` e link do explorer
- `lib/parse-tx-error.ts` — erros do viem em texto legível
- `connect-button/*` — botão, modal de carteiras, menu da conta
- `address.tsx`, `token-balance.tsx`, `chain-select.tsx`, `token-amount-input.tsx`
- `components/demo/live-demo.tsx` — seletor de estados e "simular fluxo"
- Conteúdo da página `src/app/docs/integration/page.tsx`
- As páginas `/docs/components/*` do menu ainda não existem

## Regras de segurança do kit (resumo)

1. Nenhum dado de terceiro vira HTML ou link: `symbol`, `name`, motivo de revert,
   nome/ícone de carteira. Texto puro, com tamanho máximo. (`react/no-danger` está como erro no ESLint.)
2. O que é simulado é o que é assinado: enviar `simulate.data.request`.
3. Approve exato por padrão. `maxUint256` só com opt-in explícito.
4. Endereço completo e checksum em telas de confirmação; copiar sempre do valor, não do texto.
5. Links de explorer só a partir da config da chain (`lib/explorer.ts`).
6. Ícones de carteira só como `<img src="data:image/...">`.
7. Nada de CDN em runtime; dependências mínimas, lockfile commitado.
