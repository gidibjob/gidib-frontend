This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), integrado ao backend Supabase (ver `../gidib-backend`).

## Setup

Copie `.env.local.example` para `.env.local` e preencha com as chaves do projeto Supabase:

```bash
cp .env.local.example .env.local
```

## Getting Started

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Supabase

Helpers de client em `src/lib/supabase/`:

- `client.ts` — client-side (browser)
- `server.ts` — server components / route handlers
- `middleware.ts` — refresh de sessão via middleware
