# Catálogo Inteligente

SaaS B2B para microlojistas que vendem por WhatsApp, Instagram e canais informais. O produto transforma um catálogo simples em uma vitrine pública com busca inteligente, captura de leads e um painel operacional para o lojista.

O nicho inicial do MVP é smartphones e pequenos eletrônicos.

## Stack

- Next.js
- React
- TypeScript
- Prisma
- PostgreSQL
- CSS global customizado
- Lucide React para ícones

## O Que Já Existe

### Loja pública

- `GET /[storeSlug]`
- `GET /[storeSlug]/search`
- `GET /[storeSlug]/products/[productSlug]`

A loja pública lê dados reais do banco via APIs internas.

### Painel do lojista

- `/app/businesses`
- `/app/[businessId]/dashboard`
- `/app/[businessId]/catalog`
- `/app/[businessId]/catalog/import`
- `/app/[businessId]/catalog/review-import`
- `/app/[businessId]/products/new`
- `/app/[businessId]/products/[productId]`
- `/app/[businessId]/leads`
- `/app/[businessId]/leads/[leadId]`
- `/app/[businessId]/assistant`
- `/app/[businessId]/insights`
- `/app/[businessId]/settings`

### APIs

Rotas públicas:

```text
GET  /api/public/[storeSlug]/store
GET  /api/public/[storeSlug]/products
GET  /api/public/[storeSlug]/products/[productSlug]
GET  /api/public/[storeSlug]/search?q=...
POST /api/public/[storeSlug]/search
POST /api/public/[storeSlug]/leads
```

Rotas do painel:

```text
GET  /api/app/businesses
POST /api/app/businesses

GET  /api/app/[businessId]/dashboard
GET  /api/app/[businessId]/catalog
POST /api/app/[businessId]/catalog

GET  /api/app/[businessId]/products/[productId]
PUT  /api/app/[businessId]/products/[productId]

GET  /api/app/[businessId]/catalog/import
POST /api/app/[businessId]/catalog/import
POST /api/app/[businessId]/catalog/import/[batchId]/publish

GET  /api/app/[businessId]/leads
GET  /api/app/[businessId]/leads/[leadId]
PATCH /api/app/[businessId]/leads/[leadId]

POST /api/app/[businessId]/assistant
GET  /api/app/[businessId]/insights
GET  /api/app/[businessId]/settings
PUT  /api/app/[businessId]/settings
```

## Banco De Dados

O projeto usa PostgreSQL com Prisma.

Schema:

```text
prisma/schema.prisma
```

Tabelas principais:

```text
users
businesses
business_members
products
product_import_batches
product_import_items
search_sessions
search_results
leads
inventory_events
assistant_actions
insights
analytics_events
```

Tudo que é operacional fica vinculado a `business_id`.

## Setup Local

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` local com a variável de banco:

```env
DATABASE_URL="postgresql://SEU_USUARIO@localhost:5432/catalogo_inteligente?schema=public"
NEXT_PUBLIC_APP_URL="http://127.0.0.1:3000"
```

No ambiente local atual, a URL usada foi:

```env
DATABASE_URL="postgresql://dora@localhost:5432/catalogo_inteligente?schema=public"
```

Crie a database se ela ainda não existir:

```bash
createdb catalogo_inteligente
```

Rode as migrations:

```bash
npm run prisma:migrate
```

Gere o Prisma Client, se necessário:

```bash
npm run prisma:generate
```

Suba o servidor:

```bash
npm run dev -- -H 127.0.0.1 -p 3000
```

Acesse:

```text
http://127.0.0.1:3000/app/businesses
```

## Scripts

```bash
npm run dev
npm run build
npm run typecheck
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

## Fluxo Para Começar Do Zero

1. Acesse `/app/businesses`.
2. Crie um novo business.
3. Configure dados públicos em `/app/[businessId]/settings`.
4. Cadastre produtos em `/app/[businessId]/catalog`.
5. Acesse a loja pública pelo slug criado.
6. Faça buscas na vitrine pública.
7. Acompanhe leads, dashboard, insights e assistente no painel.

## Observação Sobre Pgvector

O guia do produto prevê `pgvector` para embeddings.

No ambiente local atual, o PostgreSQL 16 não tinha a extensão `vector` disponível. Por isso, o campo `embedding` está como `JSONB` temporariamente no schema.

Quando o projeto usar Supabase ou um PostgreSQL com `pgvector` habilitado, esse campo deve ser migrado para `vector`.

## Arquivos Sensíveis

Arquivos de ambiente não devem ser versionados.

O `.gitignore` já ignora:

```text
.env
.env.*
.envexample
```

Não coloque chaves de API, credenciais do Supabase ou strings de conexão reais no Git.
