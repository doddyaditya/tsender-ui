# TSender UI

A fully client-side interface for the TSender contract.

Smart contracts: https://github.com/Cyfrin/TSender/

## Getting Started

### Requirements

- **Node** — confirm installation with `node --version` (e.g. `v23.0.1`)
- **pnpm** — confirm with `pnpm --version` (e.g. `10.1.0`)
- **git** — confirm with `git --version` (e.g. `git version 2.33.0`)

### Environment Variables

Create a `.env.local` file containing:

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` — your project ID from [reown cloud](https://cloud.reown.com/)

### Setup

```bash
git clone https://github.com/doddyaditya/tsender-ui
cd tsender-ui
pnpm install
pnpm anvil
```

Connect a MetaMask or Rabby wallet to your local Anvil instance. It is recommended to use the default Anvil wallet, since it is preloaded with mock tokens.

Then, in a separate terminal, run:

```bash
pnpm run dev
```

## Testing

### Unit

```bash
pnpm test:unit
```
