# Guia de Implementação do MVP — Catálogo Inteligente com IA para Microlojistas

## 1. Visão geral do produto

Este projeto é um SaaS B2B voltado para microlojistas e pequenos empreendedores que vendem principalmente por WhatsApp, Instagram ou canais informais, mas ainda não possuem um e-commerce estruturado.

O produto oferece uma página pública de loja com catálogo, busca inteligente por linguagem natural e direcionamento para WhatsApp. Do lado do lojista, oferece painel de administração, gestão de catálogo, registro de leads, atualização de estoque, assistente operacional e dashboard com métricas.

A proposta central é:

> Transformar catálogos desorganizados de WhatsApp/Instagram em vitrines inteligentes que ajudam clientes a encontrar o produto certo e geram leads qualificados para o lojista.

O MVP não terá checkout, pagamento, logística, emissão fiscal ou ERP completo.

O foco inicial recomendado é o nicho de smartphones e pequenos eletrônicos, porque esse segmento tem atributos objetivos, alta intenção de compra, venda frequente por WhatsApp e catálogo relativamente simples de estruturar.

---

## 2. Objetivo do MVP

O MVP deve validar três hipóteses principais:

1. Pequenos lojistas querem uma vitrine online simples, rápida e inteligente.
2. Clientes finais conseguem encontrar produtos melhores usando busca por linguagem natural.
3. Leads gerados por essa busca têm valor claro para o lojista.

O MVP deve provar que o produto consegue:

- criar rapidamente uma página de loja a partir de catálogo existente;
- organizar produtos desestruturados;
- permitir busca inteligente em linguagem natural;
- recomendar produtos com justificativa;
- registrar intenção do cliente;
- direcionar o cliente para WhatsApp;
- gerar métricas e insights para o lojista;
- permitir ações operacionais simples via assistente.

---

## 3. Posicionamento do produto

O produto não deve ser posicionado como “mais uma IA para e-commerce”.

O posicionamento recomendado é:

> Catálogo inteligente para microlojistas venderem melhor no WhatsApp e Instagram.

Ou:

> Uma vitrine online com busca inteligente que entende o que o cliente procura e recomenda os produtos certos.

A comunicação deve evitar jargões técnicos como:

- embeddings;
- LLM;
- vetores;
- machine learning;
- RAG;
- busca semântica.

A comunicação deve enfatizar:

- vender mais;
- atender melhor;
- montar loja rapidamente;
- transformar catálogo em página;
- receber leads qualificados;
- entender o que os clientes estão procurando;
- reduzir tempo de atendimento.

---

## 4. Público-alvo inicial

### ICP principal

Pequenos lojistas que vendem smartphones e eletrônicos por WhatsApp e Instagram.

Características:

- têm catálogo pequeno ou médio;
- vendem manualmente;
- usam WhatsApp como canal principal;
- postam produtos no Instagram;
- não têm site próprio ou têm site pouco usado;
- não querem complexidade de e-commerce completo;
- precisam responder muitos clientes;
- têm estoque dinâmico;
- querem parecer mais profissionais.

### Nichos futuros possíveis

Depois da validação inicial, o produto pode ser expandido para:

- assistência técnica;
- moda nichada;
- perfumaria;
- suplementos;
- autopeças;
- móveis;
- óticas;
- acessórios;
- informática.

---

## 5. Escopo do MVP

### Deve estar no MVP

1. Página pública da loja.
2. Catálogo público de produtos.
3. Busca inteligente por linguagem natural.
4. Resultado ranqueado com justificativa.
5. Página de produto.
6. Botão de direcionamento para WhatsApp.
7. Registro de lead.
8. Painel do lojista.
9. Seleção de business para usuários com mais de um negócio.
10. CRUD de produtos.
11. Controle simples de estoque no produto.
12. Importação inicial de catálogo.
13. Revisão da importação.
14. Dashboard básico.
15. Lista de leads.
16. Detalhe do lead.
17. Assistente operacional para ações simples.
18. Confirmação antes de alterações sensíveis.
19. Insights básicos.
20. Configurações da loja.

### Não deve estar no MVP

1. Checkout.
2. Pagamento.
3. Carrinho.
4. Logística.
5. Emissão fiscal.
6. ERP completo.
7. Marketplace.
8. Integração oficial profunda com Instagram.
9. Integração oficial profunda com WhatsApp Business API.
10. App mobile nativo.
11. Temas avançados customizáveis.
12. Campanhas de marketing.
13. Automação complexa de follow-up.
14. Recomendação preditiva avançada.
15. Multiusuário avançado com permissões complexas.

---

## 6. Fluxos principais do produto

## 6.1 Fluxo de onboarding do lojista

Objetivo: montar uma loja inteligente rapidamente, com o mínimo de esforço do cliente.

Fluxo ideal:

1. Lojista cria conta.
2. Lojista cria um business.
3. Lojista informa dados básicos:
   - nome da loja;
   - WhatsApp;
   - Instagram;
   - descrição;
   - cidade ou região, se necessário.
4. Lojista fornece catálogo existente:
   - texto colado;
   - print;
   - imagem;
   - PDF;
   - planilha;
   - link do Instagram, se possível;
   - conteúdo exportado do WhatsApp, se possível.
5. Sistema extrai produtos.
6. Sistema identifica atributos.
7. Sistema apresenta revisão.
8. Lojista aprova ou corrige.
9. Sistema publica a página pública da loja.

A experiência comercial desejada é:

> “Consegui montar sua loja inteligente rapidamente usando o catálogo que você já tinha.”

---

## 6.2 Fluxo do cliente final

1. Cliente acessa página pública da loja.
2. Cliente vê campo de busca inteligente.
3. Cliente digita uma necessidade em linguagem natural.

Exemplos:

- “Quero um celular barato com boa câmera até 2 mil reais.”
- “Preciso de um celular bom para jogos.”
- “Quero um iPhone bom para fotos.”
- “Quero um celular com bateria forte.”

4. Sistema interpreta a intenção.
5. Sistema extrai filtros e preferências.
6. Sistema busca no catálogo do business.
7. Sistema ranqueia produtos.
8. Sistema exibe recomendações com justificativa.
9. Cliente clica em “Tenho interesse no WhatsApp”.
10. Sistema registra lead.
11. Cliente é direcionado ao WhatsApp do lojista com mensagem contextual.

---

## 6.3 Fluxo operacional do lojista

O lojista acessa o painel e pode:

- ver dashboard;
- gerenciar catálogo;
- atualizar estoque;
- visualizar leads;
- marcar venda;
- consultar insights;
- conversar com assistente operacional.

Exemplo de ação via assistente:

> “Efetuei a venda de um S20 FE.”

O sistema deve:

1. Interpretar a ação.
2. Encontrar produto correspondente.
3. Verificar leads recentes relacionados.
4. Propor vínculo com lead, se possível.
5. Exibir confirmação.
6. Ao confirmar:
   - registrar venda;
   - reduzir estoque;
   - atualizar status do lead;
   - criar evento de inventário;
   - atualizar métricas.

---

## 7. Princípios de produto

1. Mobile-first.
2. Pouca fricção.
3. Linguagem simples.
4. Ações comerciais claras.
5. Tudo deve girar ao redor do business.
6. Toda intenção do cliente deve ser registrada.
7. Toda ação crítica do assistente deve pedir confirmação.
8. Estoque e catálogo devem ficar juntos no MVP.
9. O dashboard deve mostrar decisões, não apenas números.
10. O lojista deve sentir valor nos primeiros minutos.

---

## 8. Modelo de dados inicial

A arquitetura deve ser multi-tenant.

A entidade central é `business`.

Um usuário pode ter mais de um business.

Todas as entidades operacionais importantes devem estar vinculadas a um `business_id`.

---

## 8.1 Tabela `users`

Representa o usuário autenticado.

Campos sugeridos:

```sql
id uuid primary key
name text
email text unique not null
created_at timestamp
updated_at timestamp
```

---

## 8.2 Tabela `businesses`

Representa uma loja ou negócio específico.

Campos sugeridos:

```sql
id uuid primary key
owner_user_id uuid references users(id)
name text not null
slug text unique not null
description text
logo_url text
whatsapp_number text -- dado sensível; armazenar criptografado ou em coluna protegida
instagram_handle text
public_url text
status text -- active, inactive, draft
created_at timestamp
updated_at timestamp
```

Observação:

Um mesmo usuário pode possuir múltiplos businesses.

---

## 8.3 Tabela `business_members`

Permite expansão futura para equipes.

Campos sugeridos:

```sql
id uuid primary key
business_id uuid references businesses(id)
user_id uuid references users(id)
role text -- owner, admin, staff
scopes text[] -- permissões específicas, quando necessário
created_at timestamp
```

No MVP pode existir apenas o owner, mas a tabela já prepara o produto para expansão.

O sistema deve ter papéis e escopos bem definidos desde o início, mesmo que nem todos sejam expostos na interface do MVP.

Papéis iniciais recomendados:

- `owner`: dono do business, pode gerenciar tudo;
- `admin`: pode gerenciar catálogo, leads, dashboard, insights e configurações operacionais;
- `staff`: pode ver catálogo, atualizar estoque e gerenciar leads;
- `viewer`: acesso somente leitura para dashboard, leads e catálogo.

Escopos recomendados:

- `business:read`;
- `business:update`;
- `members:read`;
- `members:manage`;
- `products:read`;
- `products:create`;
- `products:update`;
- `products:delete`;
- `products:publish`;
- `inventory:read`;
- `inventory:update`;
- `leads:read`;
- `leads:update`;
- `sales:register`;
- `assistant:use`;
- `assistant:confirm_action`;
- `insights:read`;
- `insights:update`;
- `settings:read`;
- `settings:update`;
- `analytics:read`;
- `imports:create`;
- `imports:review`;
- `imports:publish`.

O papel define o conjunto padrão de permissões. Os escopos podem ser usados depois para exceções, planos pagos ou permissões mais granulares.

---

## 8.4 Tabela `products`

Representa produtos do catálogo.

Campos sugeridos:

```sql
id uuid primary key
business_id uuid references businesses(id)
title text not null
slug text
description text
price numeric
currency text default 'BRL'
stock_quantity integer default 0
condition text -- new, used, refurbished
status text -- active, inactive, out_of_stock, draft
brand text
category text
main_image_url text
images jsonb
attributes jsonb
search_text text
embedding vector
created_at timestamp
updated_at timestamp
```

Observações:

- `attributes` deve armazenar atributos normalizados.
- `embedding` deve ser usado para busca semântica.
- `search_text` pode combinar título, descrição e atributos para indexação.

Exemplo de `attributes` para smartphone:

```json
{
  "brand": "Samsung",
  "model": "S20 FE",
  "storage_gb": 128,
  "ram_gb": 6,
  "battery_mah": 4500,
  "camera_mp": 12,
  "screen_size": 6.5,
  "color": "Azul",
  "network": "4G"
}
```

---

## 8.5 Tabela `product_import_batches`

Representa uma tentativa de importação de catálogo.

```sql
id uuid primary key
business_id uuid references businesses(id)
source_type text -- pasted_text, image, pdf, spreadsheet, instagram, whatsapp_export
source_payload jsonb
status text -- processing, needs_review, completed, failed
created_at timestamp
updated_at timestamp
```

---

## 8.6 Tabela `product_import_items`

Produtos detectados antes da publicação.

```sql
id uuid primary key
batch_id uuid references product_import_batches(id)
business_id uuid references businesses(id)
raw_content text
detected_title text
detected_description text
detected_price numeric
detected_stock_quantity integer
detected_attributes jsonb
confidence_score numeric
status text -- pending_review, approved, rejected, published
created_at timestamp
updated_at timestamp
```

---

## 8.7 Tabela `search_sessions`

Representa sessões de busca do cliente final.

```sql
id uuid primary key
business_id uuid references businesses(id)
visitor_id text
session_id text
original_query text
interpreted_query jsonb
created_at timestamp
```

Exemplo de `interpreted_query`:

```json
{
  "intent": "buy_smartphone",
  "max_price": 2000,
  "priorities": ["camera", "battery"],
  "excluded_brands": [],
  "preferred_brands": [],
  "use_case": "general",
  "must_have": [],
  "nice_to_have": ["good_camera", "long_battery"]
}
```

---

## 8.8 Tabela `search_results`

Registra produtos retornados em uma busca.

```sql
id uuid primary key
business_id uuid references businesses(id)
search_session_id uuid references search_sessions(id)
product_id uuid references products(id)
rank integer
score numeric
match_reasons jsonb
created_at timestamp
```

Exemplo de `match_reasons`:

```json
{
  "price": "Dentro do limite informado",
  "camera": "Atende à prioridade de boa câmera",
  "battery": "Bateria considerada boa para a faixa de preço"
}
```

---

## 8.9 Tabela `leads`

Registra intenção comercial.

```sql
id uuid primary key
business_id uuid references businesses(id)
search_session_id uuid references search_sessions(id)
product_id uuid references products(id)
original_query text
interpreted_query jsonb
lead_source text -- store_search, product_page, whatsapp_click
status text -- new, contacted, in_progress, sold, lost
whatsapp_clicked boolean default false
converted boolean default false
converted_at timestamp
created_at timestamp
updated_at timestamp
```

Ponto importante:

Mesmo que não exista identificação pessoal do cliente no MVP, a intenção deve ser registrada.

---

## 8.10 Tabela `inventory_events`

Registra alterações de estoque.

```sql
id uuid primary key
business_id uuid references businesses(id)
product_id uuid references products(id)
lead_id uuid references leads(id)
event_type text -- sale, manual_adjustment, restock, return
quantity_delta integer
previous_stock integer
new_stock integer
source text -- manual, assistant, import
notes text
created_at timestamp
```

---

## 8.11 Tabela `assistant_actions`

Registra ações solicitadas via assistente.

```sql
id uuid primary key
business_id uuid references businesses(id)
user_id uuid references users(id)
raw_command text
interpreted_action jsonb
status text -- pending_confirmation, confirmed, cancelled, failed
result jsonb
created_at timestamp
updated_at timestamp
```

Exemplo:

```json
{
  "action": "register_sale",
  "product_match": {
    "product_id": "uuid",
    "title": "Samsung S20 FE",
    "confidence": 0.91
  },
  "suggested_lead_id": "uuid",
  "quantity": 1
}
```

---

## 8.12 Tabela `insights`

Registra sugestões e pontos de atenção.

```sql
id uuid primary key
business_id uuid references businesses(id)
type text -- demand_gap, stock_alert, conversion_alert, product_opportunity, search_no_result
title text
description text
impact_level text -- low, medium, high
suggested_action text
status text -- new, viewed, dismissed, resolved
metadata jsonb
created_at timestamp
updated_at timestamp
```

---

## 9. Motor de IA e busca

## 9.1 Pipeline de busca

Quando o cliente final fizer uma busca:

1. Receber query natural.
2. Interpretar query com LLM.
3. Extrair filtros estruturados.
4. Gerar embedding da query.
5. Buscar produtos candidatos com:
   - filtros objetivos;
   - busca semântica;
   - texto;
   - disponibilidade.
6. Aplicar reranking.
7. Gerar justificativas.
8. Registrar sessão.
9. Registrar resultados.
10. Exibir recomendações.

---

## 9.2 Interpretação da query

Entrada:

```text
Quero um celular até 2 mil com câmera boa e bateria forte
```

Saída esperada:

```json
{
  "intent": "buy_smartphone",
  "category": "smartphone",
  "max_price": 2000,
  "min_price": null,
  "priorities": ["camera", "battery"],
  "use_case": null,
  "preferred_brands": [],
  "excluded_brands": [],
  "required_attributes": {},
  "avoid_attributes": {},
  "urgency": null
}
```

---

## 9.3 Busca híbrida

Não depender apenas de embeddings.

A busca deve combinar:

- filtros estruturados;
- preço;
- disponibilidade;
- categoria;
- atributos;
- embeddings;
- texto;
- regras de negócio.

Exemplo:

Se o usuário informou “até R$ 2000”, produtos acima desse valor não devem aparecer como primeira opção, mesmo que semanticamente pareçam bons.

---

## 9.4 Ranking sugerido

Critérios:

1. Disponibilidade em estoque.
2. Compatibilidade de preço.
3. Compatibilidade com prioridades.
4. Similaridade semântica.
5. Qualidade dos atributos.
6. Popularidade/clicks, quando houver dados.
7. Conversão histórica, quando houver dados.

---

## 9.5 Justificativa de recomendação

Cada produto recomendado deve ter uma explicação curta.

Exemplo:

> Recomendamos este modelo porque está dentro do orçamento informado, tem boa câmera e bateria forte para uso diário.

Evitar justificativas longas.

---

## 9.6 Busca sem resultado

Quando não houver produto ideal:

1. Mostrar produtos próximos.
2. Explicar que não encontrou match perfeito.
3. Manter CTA para WhatsApp.
4. Registrar busca sem resultado.
5. Gerar insight futuro para lojista.

Exemplo de insight:

> Muitos clientes buscaram celulares até R$ 1500, mas sua loja tem poucas opções nessa faixa.

---

## 10. Assistente operacional

O assistente operacional é uma das principais diferenciações do produto.

Ele deve permitir que o lojista execute tarefas usando linguagem natural.

### Ações iniciais suportadas

1. Registrar venda.
2. Atualizar estoque.
3. Alterar preço.
4. Ativar produto.
5. Desativar produto.
6. Consultar produtos sem estoque.
7. Consultar produtos mais buscados.
8. Consultar produtos parados.
9. Consultar leads recentes.

### Exemplos de comandos

```text
Vendi um S20 FE.
```

```text
Chegaram 3 unidades do iPhone 11.
```

```text
Aumenta o preço do S20 FE para 1899.
```

```text
Remove o Moto G84 do catálogo.
```

```text
Quais produtos estão parados?
```

### Regras importantes

1. Nunca executar ação sensível sem confirmação.
2. Sempre mostrar o que será alterado.
3. Se houver ambiguidade, pedir escolha entre opções.
4. Registrar comando bruto.
5. Registrar interpretação.
6. Registrar resultado.
7. Vincular ação ao business.
8. Vincular venda a lead, quando possível.

---

## 11. Dashboard e métricas

O dashboard deve ajudar o lojista a tomar decisão.

### Métricas obrigatórias

1. Visitas à loja.
2. Buscas realizadas.
3. Cliques no WhatsApp.
4. Leads gerados.
5. Produtos mais clicados.
6. Produtos mais buscados.
7. Buscas sem resultado.
8. Leads vendidos.
9. Taxa de conversão de lead para venda registrada.
10. Produtos sem estoque.

### Métricas derivadas

1. Termos mais buscados.
2. Faixas de preço mais buscadas.
3. Marcas mais buscadas.
4. Produtos com muitos cliques e poucas vendas.
5. Produtos parados.
6. Rupturas de estoque.
7. Oportunidades de estoque.

---

## 12. Insights

Os insights devem ser simples, acionáveis e comerciais.

Exemplos:

```text
Muitos clientes buscaram celulares até R$ 1500, mas sua loja tem poucas opções nessa faixa.
```

```text
O Samsung S20 FE teve muitos cliques, mas poucas vendas registradas. Verifique preço, disponibilidade ou abordagem comercial.
```

```text
Você está sem estoque em produtos com alta procura.
```

```text
Clientes estão buscando iPhone para fotos. Destaque produtos com boa câmera.
```

Cada insight deve ter:

- título;
- descrição;
- impacto;
- ação sugerida;
- status.

---

## 13. Identidade visual

## 13.1 Personalidade da marca

A marca deve transmitir:

1. Confiança.
2. Simplicidade.
3. Inteligência prática.
4. Foco em venda.
5. Agilidade.

Não deve parecer uma ferramenta técnica complexa.

---

## 13.2 Tom de voz

Direto, simples e comercial.

Evitar:

- linguagem excessivamente técnica;
- termos de IA desnecessários;
- promessas vagas.

Preferir:

- “Seu cliente encontra o produto certo mais rápido.”
- “Transforme seu catálogo em uma vitrine inteligente.”
- “Receba leads com intenção de compra organizada.”
- “Atualize estoque e produtos conversando com o assistente.”

---

## 13.3 Direção visual

Estilo geral:

- interface clara;
- mobile-first;
- cards grandes;
- bordas arredondadas;
- ícones simples;
- pouco ruído visual;
- destaque para CTAs comerciais;
- sensação de ferramenta simples e confiável.

---

## 13.4 Paleta de cores

### Primária

Verde comercial:

```text
#16A34A
```

Uso:

- botões principais;
- CTAs;
- estados positivos;
- destaques comerciais.

### Primária escura

```text
#166534
```

Uso:

- hover;
- estados ativos;
- títulos de destaque.

### Fundo claro

```text
#F8FAFC
```

Uso:

- fundo geral da aplicação.

### Cards

```text
#FFFFFF
```

Uso:

- cards;
- painéis;
- blocos de conteúdo.

### Texto principal

```text
#111827
```

Uso:

- títulos;
- textos importantes.

### Texto secundário

```text
#6B7280
```

Uso:

- descrições;
- labels;
- metadados.

### Bordas

```text
#E5E7EB
```

Uso:

- divisórias;
- contornos de cards;
- inputs.

### Alerta

```text
#F59E0B
```

Uso:

- pontos de atenção;
- insights médios;
- avisos.

### Erro / ruptura

```text
#DC2626
```

Uso:

- sem estoque;
- erros;
- alertas críticos.

---

## 13.5 Tipografia

Fonte recomendada:

```text
Inter
```

Alternativas:

- Geist;
- Manrope;
- Plus Jakarta Sans.

Hierarquia:

```text
H1: 32px / 40px, semibold ou bold
H2: 24px / 32px, semibold
H3: 18px / 28px, semibold
Texto base: 16px / 24px
Texto auxiliar: 14px / 20px
Labels: 12px / 16px, medium
```

---

## 13.6 Componentes base

### Botão primário

- fundo verde;
- texto branco;
- border-radius 12px;
- altura mínima 44px;
- peso visual forte.

### Botão secundário

- fundo branco;
- borda cinza;
- texto grafite;
- border-radius 12px.

### Botão crítico

- usar vermelho com moderação;
- preferir vermelho em texto ou fundo suave;
- evitar excesso de botões vermelhos sólidos.

### Cards

- fundo branco;
- borda `#E5E7EB`;
- raio 16px;
- sombra suave;
- padding 16px ou 24px.

### Inputs

- altura mínima 44px;
- borda cinza clara;
- foco com borda verde;
- placeholder simples.

### Badges

Exemplos:

- Em estoque;
- Sem estoque;
- Lead quente;
- Busca sem resultado;
- Produto recomendado;
- Vendido;
- Novo lead.

---

## 14. Arquitetura de rotas

## 14.1 Rotas públicas

```text
/[storeSlug]
/[storeSlug]/search
/[storeSlug]/products/[productSlug]
```

## 14.2 Rotas do app do lojista

```text
/app
/app/businesses
/app/[businessId]/dashboard
/app/[businessId]/catalog
/app/[businessId]/catalog/import
/app/[businessId]/catalog/review-import
/app/[businessId]/products/[productId]
/app/[businessId]/leads
/app/[businessId]/leads/[leadId]
/app/[businessId]/assistant
/app/[businessId]/insights
/app/[businessId]/settings
```

---

## 15. Wireframes

## 15.1 Loja pública — Home

Objetivo: permitir que o visitante encontre rapidamente o produto certo.

Elementos:

- logo/nome da loja;
- descrição curta;
- campo de busca inteligente;
- sugestões rápidas;
- produtos em destaque;
- botão ou CTA de WhatsApp.

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ Logo / Nome da loja                 WhatsApp │
├─────────────────────────────────────────────┤
│                                             │
│ Encontre o celular ideal para você           │
│ Conte o que você procura e veja sugestões    │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Ex: quero um celular até R$2000...       │ │
│ └─────────────────────────────────────────┘ │
│ [Buscar com IA]                              │
│                                             │
│ Sugestões rápidas:                           │
│ [Bom e barato] [Boa câmera] [Bateria forte] │
│                                             │
├─────────────────────────────────────────────┤
│ Produtos em destaque                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│ │ Produto  │ │ Produto  │ │ Produto  │      │
│ │ Preço    │ │ Preço    │ │ Preço    │      │
│ │ CTA      │ │ CTA      │ │ CTA      │      │
│ └──────────┘ └──────────┘ └──────────┘      │
└─────────────────────────────────────────────┘
```

---

## 15.2 Loja pública — Resultados da busca inteligente

Objetivo: mostrar recomendações com justificativa.

Elementos:

- query original do cliente;
- interpretação da IA;
- lista ranqueada de produtos;
- justificativa por produto;
- CTA para WhatsApp;
- alternativas caso não tenha match perfeito.

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ ← Voltar                              Loja   │
├─────────────────────────────────────────────┤
│ Você buscou:                                │
│ “celular até R$2000 com boa câmera”          │
│                                             │
│ Entendemos que você procura:                 │
│ [Até R$2000] [Boa câmera] [Boa bateria]     │
│                                             │
├─────────────────────────────────────────────┤
│ Melhor opção encontrada                      │
│ ┌─────────────────────────────────────────┐ │
│ │ Imagem                                   │ │
│ │ Samsung S20 FE                           │ │
│ │ R$ 1.799                                 │ │
│ │ Por que recomendamos:                    │ │
│ │ Boa câmera, bom desempenho, preço dentro │ │
│ │ do limite informado.                     │ │
│ │ [Tenho interesse no WhatsApp]            │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Outras opções                               │
│ ┌───────────────┐ ┌───────────────┐         │
│ │ Produto       │ │ Produto       │         │
│ └───────────────┘ └───────────────┘         │
└─────────────────────────────────────────────┘
```

---

## 15.3 Loja pública — Página de produto

Objetivo: dar informação suficiente para o cliente decidir falar com o vendedor.

Elementos:

- imagens;
- nome;
- preço;
- condição;
- especificações;
- estoque ou disponibilidade;
- CTA WhatsApp;
- produtos similares.

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ ← Voltar                              Loja   │
├─────────────────────────────────────────────┤
│ ┌───────────────┐                           │
│ │ Imagem grande │                           │
│ └───────────────┘                           │
│                                             │
│ Samsung S20 FE                              │
│ R$ 1.799                                    │
│ [Em estoque] [Usado]                        │
│                                             │
│ Especificações                              │
│ - 128GB                                     │
│ - 6GB RAM                                   │
│ - Câmera 12MP                               │
│ - Bateria 4500mAh                           │
│                                             │
│ [Falar com vendedor no WhatsApp]            │
│                                             │
│ Produtos parecidos                          │
│ ┌─────────┐ ┌─────────┐                     │
└─────────────────────────────────────────────┘
```

---

## 15.4 Loja pública — Estado sem resultado

Objetivo: não perder o lead mesmo quando não houver produto ideal.

Elementos:

- explicação simples;
- produtos próximos;
- CTA para falar com vendedor;
- registro da busca sem resultado.

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ Não encontramos uma opção perfeita           │
│                                             │
│ Mas encontramos alguns produtos parecidos:   │
│                                             │
│ ┌──────────────┐ ┌──────────────┐           │
│ │ Produto      │ │ Produto      │           │
│ └──────────────┘ └──────────────┘           │
│                                             │
│ Quer que o vendedor veja uma opção para você?│
│ [Chamar no WhatsApp]                         │
└─────────────────────────────────────────────┘
```

---

## 15.5 Painel — Login

Objetivo: acesso simples.

Elementos:

- logo;
- e-mail;
- senha ou magic link;
- botão entrar.

Para MVP, magic link pode reduzir fricção.

---

## 15.6 Painel — Seleção de business

Necessário porque um usuário pode ter mais de um negócio.

Elementos:

- lista de negócios;
- botão criar/adicionar negócio;
- status rápido de cada business.

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ Seus negócios                               │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ Loja do João Celulares                   │ │
│ │ 42 produtos • 18 leads esta semana       │ │
│ │ [Acessar painel]                         │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Acessórios João                          │ │
│ │ 24 produtos • 7 leads esta semana        │ │
│ │ [Acessar painel]                         │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ [+ Criar novo negócio]                      │
└─────────────────────────────────────────────┘
```

---

## 15.7 Painel — Dashboard principal

Objetivo: mostrar saúde comercial da loja.

Elementos:

- leads gerados;
- cliques no WhatsApp;
- buscas feitas;
- produtos mais clicados;
- buscas sem resultado;
- alertas de estoque;
- insights da IA.

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ Sidebar                Dashboard            │
│                        Loja do João         │
├───────────────┬─────────────────────────────┤
│ Dashboard     │ ┌──────┐ ┌──────┐ ┌──────┐  │
│ Catálogo      │ │Leads │ │Cliques│ │Buscas│  │
│ Leads         │ │  32  │ │  24   │ │ 118  │  │
│ Assistente    │ └──────┘ └──────┘ └──────┘  │
│ Insights      │                             │
│ Configurações │ Insights importantes         │
│               │ ┌─────────────────────────┐ │
│               │ │ Muitos clientes buscaram │ │
│               │ │ celular até R$1500.      │ │
│               │ └─────────────────────────┘ │
│               │                             │
│               │ Produtos mais procurados     │
│               │ ┌─────────────────────────┐ │
│               │ │ Samsung S20 FE           │ │
│               │ │ iPhone 11                │ │
│               │ └─────────────────────────┘ │
└───────────────┴─────────────────────────────┘
```

---

## 15.8 Painel — Catálogo

Objetivo: administrar produtos e estoque.

Elementos:

- busca interna;
- filtros: ativo, sem estoque, marca, preço;
- lista/tabela de produtos;
- estoque;
- status;
- ações rápidas;
- botão adicionar produto;
- botão importar catálogo.

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ Catálogo                         [+ Produto] │
│                                  [Importar] │
├─────────────────────────────────────────────┤
│ [Buscar produto...] [Marca] [Status]         │
├─────────────────────────────────────────────┤
│ Produto          Preço      Estoque  Status  │
│ S20 FE           1799       2        Ativo   │
│ iPhone 11        2100       1        Ativo   │
│ Moto G84         1399       0        Sem est.│
└─────────────────────────────────────────────┘
```

---

## 15.9 Painel — Cadastro/edição de produto

Objetivo: permitir ajuste manual com apoio da IA.

Elementos:

- nome;
- descrição;
- preço;
- estoque;
- imagens;
- atributos estruturados;
- botão “Melhorar descrição com IA”;
- botão “Extrair atributos com IA”.

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ Editar produto                              │
├─────────────────────────────────────────────┤
│ Nome                                        │
│ [Samsung S20 FE]                             │
│                                             │
│ Descrição                                   │
│ [textarea]                                  │
│ [Melhorar descrição com IA]                 │
│                                             │
│ Preço [R$ 1799]   Estoque [2]               │
│                                             │
│ Imagens                                     │
│ [upload] [imagem] [imagem]                  │
│                                             │
│ Atributos                                   │
│ Marca [Samsung]                             │
│ Armazenamento [128GB]                       │
│ RAM [6GB]                                   │
│ Bateria [4500mAh]                           │
│                                             │
│ [Salvar produto]                            │
└─────────────────────────────────────────────┘
```

---

## 15.10 Painel — Importação de catálogo

Objetivo: cumprir a promessa de agilidade.

Formas de importação para o MVP:

- colar texto/lista;
- enviar imagens/prints;
- enviar PDF;
- informar Instagram para análise semi-automática;
- importar planilha simples.

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ Importar catálogo                            │
├─────────────────────────────────────────────┤
│ Como você quer começar?                      │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Colar lista de produtos                  │ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │ Enviar prints ou fotos                   │ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │ Informar Instagram                       │ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │ Enviar planilha                          │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## 15.11 Painel — Revisão da importação

Objetivo: impedir erro de IA antes de publicar catálogo.

Elementos:

- produtos detectados;
- campos editáveis;
- confiança da extração;
- alertas de informação faltando;
- publicar produtos selecionados.

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ Revisar produtos encontrados                 │
├─────────────────────────────────────────────┤
│ Encontramos 18 produtos. Revise antes de publicar.│
│                                             │
│ Produto       Preço    Estoque   Confiança   │
│ S20 FE        1799     ?         Alta        │
│ iPhone 11     2100     ?         Média       │
│ Moto G84      ?        ?         Baixa       │
│                                             │
│ [Publicar selecionados]                      │
└─────────────────────────────────────────────┘
```

---

## 15.12 Painel — Leads

Objetivo: mostrar quem demonstrou interesse e em qual contexto.

Elementos:

- lista de leads;
- produto clicado;
- busca original;
- intenção interpretada;
- horário;
- status: novo, em atendimento, vendido, perdido;
- ação de marcar venda.

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ Leads                                       │
├─────────────────────────────────────────────┤
│ [Todos] [Novos] [Vendidos] [Perdidos]       │
├─────────────────────────────────────────────┤
│ Cliente/ sessão                             │
│ Busca: celular até R$2000 com boa câmera     │
│ Produto clicado: S20 FE                      │
│ Status: Novo                                 │
│ [Marcar como vendido] [Abrir WhatsApp]       │
│                                             │
│ Cliente/ sessão                             │
│ Busca: iPhone bom para fotos                 │
│ Produto clicado: iPhone 11                   │
│ Status: Em atendimento                       │
└─────────────────────────────────────────────┘
```

---

## 15.13 Painel — Detalhe do lead

Objetivo: dar contexto completo ao lojista.

Elementos:

- query original;
- interpretação;
- produtos vistos;
- produto clicado;
- data/hora;
- status;
- campo de observações;
- ações rápidas.

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ Lead                                        │
├─────────────────────────────────────────────┤
│ Busca original                              │
│ “quero celular até 2 mil com câmera boa”     │
│                                             │
│ Intenção identificada                        │
│ [Até R$2000] [Câmera] [Bateria]             │
│                                             │
│ Produto clicado                              │
│ Samsung S20 FE                               │
│                                             │
│ Status                                      │
│ [Novo / Em atendimento / Vendido / Perdido] │
│                                             │
│ Observações                                 │
│ [textarea]                                  │
│                                             │
│ [Marcar venda] [Abrir WhatsApp]              │
└─────────────────────────────────────────────┘
```

---

## 15.14 Painel — Assistente operacional

Objetivo: permitir ações por linguagem natural.

Exemplos:

- “Vendi um S20 FE.”
- “Adiciona 3 unidades do iPhone 11.”
- “Remove o Moto G84 do catálogo.”
- “Aumenta o preço do S20 FE para R$1899.”
- “Quais produtos estão parados?”

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ Assistente                                  │
├─────────────────────────────────────────────┤
│ O que você quer fazer?                       │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Ex: vendi um S20 FE                      │ │
│ └─────────────────────────────────────────┘ │
│ [Enviar]                                    │
│                                             │
│ Sugestões rápidas:                           │
│ [Registrar venda] [Atualizar estoque]        │
│ [Alterar preço] [Ver produtos parados]       │
│                                             │
│ Histórico                                    │
│ Você: Vendi um S20 FE                        │
│ Assistente: Encontrei 2 leads recentes para  │
│ esse produto. Qual venda devo registrar?     │
└─────────────────────────────────────────────┘
```

---

## 15.15 Painel — Confirmação de ação do assistente

Objetivo: evitar alterações erradas.

Toda ação sensível precisa de confirmação.

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ Confirmar ação                              │
├─────────────────────────────────────────────┤
│ Entendi que você quer registrar uma venda:   │
│                                             │
│ Produto: Samsung S20 FE                      │
│ Estoque atual: 2                             │
│ Novo estoque: 1                              │
│ Lead relacionado: cliente buscou celular     │
│ até R$2000 com boa câmera                    │
│                                             │
│ [Confirmar venda] [Cancelar]                 │
└─────────────────────────────────────────────┘
```

---

## 15.16 Painel — Insights

Objetivo: transformar dados em ação.

Categorias:

- demanda;
- estoque;
- conversão;
- produtos parados;
- oportunidades de compra;
- buscas sem resultado.

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ Insights                                    │
├─────────────────────────────────────────────┤
│ Pontos de atenção                            │
│ ┌─────────────────────────────────────────┐ │
│ │ Muitos clientes buscaram opções até      │ │
│ │ R$1500, mas seu catálogo tem poucas.     │ │
│ │ Sugestão: anunciar modelos nessa faixa.  │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ O S20 FE teve muitos cliques, mas poucas │ │
│ │ vendas registradas. Verifique preço ou   │ │
│ │ disponibilidade.                         │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## 15.17 Painel — Configurações da loja

Objetivo: configurar dados públicos e operação.

Elementos:

- nome da loja;
- logo;
- descrição;
- WhatsApp;
- Instagram;
- horário de atendimento;
- URL pública;
- mensagem padrão do WhatsApp.

Wireframe:

```text
┌─────────────────────────────────────────────┐
│ Configurações                               │
├─────────────────────────────────────────────┤
│ Nome da loja                                │
│ [Loja do João Celulares]                     │
│                                             │
│ WhatsApp                                    │
│ [+55 ...]                                   │
│                                             │
│ Instagram                                   │
│ [@lojadojoao]                               │
│                                             │
│ Link público                                │
│ loja.suaia.com/lojadojoao                   │
│                                             │
│ Mensagem padrão do WhatsApp                  │
│ [Olá, vim pelo catálogo e tenho interesse...]│
│                                             │
│ [Salvar alterações]                          │
└─────────────────────────────────────────────┘
```

---

## 16. Componentes essenciais

## 16.1 ProductCard público

Deve conter:

- imagem;
- nome;
- preço;
- badges;
- resumo curto;
- botão de interesse;
- status de estoque.

## 16.2 AIRecommendationCard

Deve conter:

- nível de match;
- produto;
- preço;
- justificativa curta;
- atributos atendidos;
- CTA para WhatsApp.

## 16.3 LeadCard

Deve conter:

- busca original;
- produto clicado;
- horário;
- status;
- ação rápida.

## 16.4 InsightCard

Deve conter:

- título;
- explicação;
- impacto;
- ação sugerida;
- status.

## 16.5 AssistantCommandBox

Deve conter:

- input de linguagem natural;
- sugestões rápidas;
- histórico;
- estados de loading;
- mensagens de confirmação.

---

## 17. Guidelines técnicos para implementação

## 17.1 Stack sugerida

Frontend:

- Next.js;
- React;
- TypeScript;
- Tailwind CSS;
- shadcn/ui, se conveniente.

Backend:

- Next.js API Routes ou backend separado;
- Supabase ou PostgreSQL;
- pgvector para embeddings;
- autenticação com Supabase Auth, Clerk ou similar.

IA:

- LLM para parsing de intenção;
- embeddings para busca semântica;
- LLM para extração de atributos de catálogo;
- LLM para geração de justificativas;
- LLM para assistente operacional.

Storage:

- Supabase Storage, S3 ou equivalente para imagens.

---

## 17.2 Decisão inicial de stack do projeto

Para o MVP, a stack escolhida deve priorizar velocidade de implementação, simplicidade operacional e capacidade de evoluir para um SaaS multi-tenant mais robusto.

Stack inicial definida:

- Next.js;
- React;
- TypeScript;
- Tailwind CSS;
- shadcn/ui;
- Prisma;
- PostgreSQL via Supabase;
- pgvector;
- Supabase Auth;
- Supabase Storage;
- OpenAI API;
- Orama como complemento de busca;
- Vercel para deploy da aplicação.

### Papel de cada tecnologia

Next.js deve ser usado como aplicação principal, concentrando a loja pública, o painel do lojista e as rotas de backend do MVP.

O backend inicial pode usar Route Handlers, Server Actions e serviços internos do próprio Next.js. Um backend separado, como NestJS, deve ser evitado no primeiro momento para reduzir complexidade, a menos que o produto passe a exigir separação clara de APIs, workers ou domínios independentes.

PostgreSQL deve ser a fonte da verdade do sistema.

Devem ficar no PostgreSQL:

- usuários;
- businesses;
- membros;
- produtos;
- estoque;
- leads;
- buscas;
- resultados;
- eventos de analytics;
- vendas registradas;
- ações do assistente;
- insights;
- embeddings dos produtos;
- vínculos entre entidades.

Supabase deve ser usado no MVP para acelerar:

- banco PostgreSQL gerenciado;
- autenticação;
- storage de imagens;
- suporte a pgvector;
- operação inicial do banco.

Prisma deve ser usado para modelagem, migrations e acesso tipado ao banco.

pgvector deve ser usado para busca semântica persistente, associada aos produtos do catálogo.

OpenAI API deve ser usada para:

- interpretar buscas em linguagem natural;
- extrair atributos de produtos;
- gerar embeddings;
- gerar justificativas curtas de recomendação;
- interpretar comandos do assistente operacional;
- apoiar geração de insights.

### Uso do Orama

Orama deve ser usado como complemento de busca, não como banco de dados principal e não como fonte da verdade do sistema.

O papel do Orama no MVP é melhorar a experiência de busca textual e a velocidade de resposta em pontos específicos do produto.

Casos de uso recomendados para Orama:

- busca rápida no catálogo público;
- autocomplete;
- tolerância a erro de digitação;
- ranking textual;
- filtros rápidos de catálogo;
- busca interna no painel do lojista;
- pré-seleção de candidatos antes do reranking final;
- melhoria da experiência em catálogos pequenos e médios.

A abordagem escolhida é:

```text
PostgreSQL + pgvector + Orama textual
```

Nesta abordagem:

- PostgreSQL continua sendo a fonte da verdade;
- pgvector cuida da busca semântica persistente;
- Orama melhora busca textual, typo tolerance, autocomplete e experiência de uso;
- o motor de recomendação combina resultados de filtros estruturados, pgvector, Orama e regras de negócio.

O Orama deve indexar apenas dados necessários para busca e exibição resumida, como:

- product_id;
- business_id;
- title;
- description;
- brand;
- category;
- price;
- condition;
- status;
- stock_quantity;
- attributes relevantes;
- search_text.

Sempre que um produto for criado, editado, ativado, desativado, tiver preço alterado ou estoque alterado, o índice do Orama deve ser atualizado.

No MVP, a sincronização pode ser feita de forma simples dentro dos próprios fluxos de escrita do produto. Jobs assíncronos ou filas dedicadas podem ser adicionados depois, caso a escala exija.

O Orama não deve armazenar:

- leads como fonte primária;
- vendas;
- eventos de analytics como fonte primária;
- permissões;
- dados sensíveis;
- ações do assistente como fonte primária;
- histórico financeiro ou operacional crítico.

### Estratégia de busca do MVP

A busca inteligente deve seguir uma estratégia híbrida, mas controlada por regras de negócio.

Fluxo recomendado:

1. Receber a busca em linguagem natural.
2. Registrar a query original.
3. Interpretar a intenção com LLM e saída estruturada.
4. Aplicar filtros objetivos no PostgreSQL, como business, status, estoque, categoria e faixa de preço.
5. Gerar embedding da query.
6. Buscar candidatos por pgvector.
7. Buscar candidatos por Orama usando texto, typo tolerance e boosting.
8. Unificar candidatos.
9. Aplicar regras de negócio e reranking.
10. Gerar justificativas curtas.
11. Registrar sessão de busca e resultados.
12. Exibir melhor opção e alternativas.

Regras importantes:

- preço máximo informado pelo cliente deve ter peso forte;
- produtos fora de estoque não devem aparecer como melhor opção, salvo se não houver alternativa;
- produtos inativos nunca devem aparecer na loja pública;
- produtos em destaque podem receber boost, mas não devem superar uma incompatibilidade objetiva forte;
- a justificativa deve explicar motivos comerciais, não termos técnicos;
- toda busca sem resultado ideal deve gerar dado para insight futuro.

### Analytics interno

No MVP, as métricas principais devem ser registradas em tabelas próprias do sistema, não depender exclusivamente de ferramentas externas de analytics.

Deve existir uma tabela de eventos, por exemplo `analytics_events`, vinculada a `business_id`.

Eventos recomendados:

- visita à loja;
- busca realizada;
- produto exibido;
- produto clicado;
- clique no WhatsApp;
- lead criado;
- venda marcada;
- estoque alterado;
- produto criado;
- produto editado;
- produto desativado;
- importação iniciada;
- importação concluída;
- insight gerado.

Ferramentas externas como PostHog, Mixpanel ou Plausible podem ser adicionadas depois para análise de produto, mas o dashboard do lojista deve depender dos dados internos do SaaS.

### Princípios técnicos definidos

1. Começar com monólito modular em Next.js.
2. Manter PostgreSQL como fonte da verdade.
3. Usar Supabase para acelerar autenticação, banco e storage.
4. Usar pgvector para semântica persistente.
5. Usar Orama como camada complementar de busca e experiência.
6. Encapsular chamadas de IA em serviços internos.
7. Nunca permitir que a IA execute ação sensível sem confirmação do usuário.
8. Registrar eventos importantes desde o início.
9. Evitar filas, workers e backend separado até existir necessidade real.
10. Manter a arquitetura preparada para extrair serviços no futuro.

---

## 17.3 Organização recomendada de código

```text
src/
  app/
    [storeSlug]/
    app/
      businesses/
      [businessId]/
        dashboard/
        catalog/
        leads/
        assistant/
        insights/
        settings/
  components/
    public-store/
    dashboard/
    catalog/
    leads/
    assistant/
    insights/
    ui/
  lib/
    db/
    ai/
      intent/
      embeddings/
      catalog-extraction/
      assistant/
      insights/
    search/
      orama/
      pgvector/
      ranking/
      recommendations/
    whatsapp/
    analytics/
  types/
  hooks/
  services/
```

---

## 17.4 Regras de multi-tenancy

1. Toda consulta operacional deve filtrar por `business_id`.
2. Nunca exibir dados de outro business.
3. Usuário só pode acessar business em que é owner ou member.
4. Rotas privadas devem validar permissão.
5. Rotas públicas devem buscar pelo `storeSlug`.

---

## 17.5 Segurança, roles, scopes e dados sensíveis

Segurança é requisito estrutural do produto, não uma etapa posterior.

O sistema lida com dados de lojistas, leads, comportamento de navegação, estoque, ações comerciais e comandos operacionais. Por isso, as decisões de segurança devem existir desde o primeiro schema e desde as primeiras rotas.

### Autenticação

No MVP, a autenticação deve ser baseada no Supabase Auth.

Requisitos:

- usar sessões seguras;
- proteger todas as rotas privadas do painel;
- validar usuário no servidor, não apenas no client;
- bloquear acesso de usuários sem membership no business;
- evitar expor tokens sensíveis no browser;
- usar magic link ou senha, conforme decisão de UX;
- preparar suporte futuro a MFA para contas sensíveis.

### Autorização

A autorização deve ser baseada em:

- usuário autenticado;
- membership no business;
- role;
- scopes;
- status do business;
- tipo de ação solicitada.

Toda rota privada deve validar permissão no servidor antes de retornar ou alterar dados.

Não basta esconder botões na interface. A UI pode melhorar a experiência, mas a autorização real deve acontecer nas rotas, services e queries.

### Roles padrão

Roles recomendadas:

- `owner`: acesso total ao business;
- `admin`: gerencia operação, catálogo, leads, dashboard, insights e configurações;
- `staff`: operação diária, leads e estoque;
- `viewer`: leitura de dashboard, leads e catálogo.

Permissões sugeridas por role:

```text
owner:
  todos os scopes

admin:
  business:read
  business:update
  products:read
  products:create
  products:update
  products:publish
  inventory:read
  inventory:update
  leads:read
  leads:update
  sales:register
  assistant:use
  assistant:confirm_action
  insights:read
  insights:update
  settings:read
  settings:update
  analytics:read
  imports:create
  imports:review
  imports:publish

staff:
  business:read
  products:read
  products:update
  inventory:read
  inventory:update
  leads:read
  leads:update
  sales:register
  assistant:use
  insights:read

viewer:
  business:read
  products:read
  inventory:read
  leads:read
  insights:read
  analytics:read
```

### Scopes críticos

Alguns scopes devem ser tratados como sensíveis:

- `members:manage`;
- `settings:update`;
- `products:delete`;
- `products:publish`;
- `inventory:update`;
- `sales:register`;
- `assistant:confirm_action`;
- `imports:publish`.

Ações que dependem desses scopes devem ter validação explícita, logs de auditoria e, quando acionadas pelo assistente, confirmação humana.

### Row Level Security e isolamento

Como o banco inicial será PostgreSQL via Supabase, o projeto deve considerar RLS como camada adicional de proteção.

Diretrizes:

- habilitar RLS nas tabelas sensíveis quando possível;
- criar policies baseadas em membership do usuário no business;
- manter `business_id` obrigatório em entidades operacionais;
- criar índices por `business_id`;
- nunca confiar apenas em filtros feitos no client;
- aplicar checagem de permissão também no service layer;
- usar service role somente em rotas server-side controladas.

Mesmo usando Prisma, a aplicação deve ter helpers centrais de autorização, por exemplo:

```text
requireBusinessMember(userId, businessId)
requireBusinessScope(userId, businessId, scope)
assertCanReadBusiness(userId, businessId)
assertCanMutateProduct(userId, businessId, productId)
```

### Criptografia de dados sensíveis

Dados sensíveis devem ser minimizados, protegidos e acessados somente quando necessário.

Dados que devem ser tratados como sensíveis:

- telefone/WhatsApp do lojista;
- telefone do lead, caso venha a ser coletado;
- mensagens ou observações de leads;
- comandos do assistente;
- payloads de importação com dados pessoais;
- tokens de integração futuros;
- identificadores de visitantes quando puderem ser associados a pessoas;
- arquivos enviados pelo lojista, como prints, PDFs e planilhas.

Regras:

- não armazenar tokens de API ou integrações em texto puro;
- usar criptografia em nível de aplicação para segredos e tokens;
- preferir KMS/secret manager em produção;
- criptografar campos sensíveis que não precisam ser pesquisados diretamente;
- evitar enviar dados sensíveis desnecessários para LLMs;
- mascarar telefone e identificadores em logs;
- nunca registrar prompts com dados pessoais em logs públicos;
- definir política de retenção para arquivos de importação;
- excluir ou anonimizar dados que não precisam mais existir.

Campos públicos, como nome da loja, descrição pública, produtos ativos e Instagram público, não precisam da mesma proteção de campos sensíveis, mas ainda devem respeitar validação e sanitização.

### Logs e auditoria

Toda ação sensível deve gerar trilha de auditoria.

Eventos de auditoria recomendados:

- login;
- criação de business;
- alteração de configurações;
- criação, edição, publicação e desativação de produto;
- alteração de estoque;
- registro de venda;
- mudança de status de lead;
- importação de catálogo;
- publicação de itens importados;
- comando do assistente recebido;
- ação do assistente confirmada;
- ação do assistente cancelada;
- tentativa negada por falta de permissão.

O audit log deve registrar:

- `business_id`;
- `user_id`;
- ação;
- entidade afetada;
- timestamp;
- origem;
- metadados mínimos;
- resultado.

Não registrar dados pessoais completos quando não for necessário.

### Segurança no uso de IA

O uso de IA deve ser controlado por contrato e permissão.

Regras:

- LLM nunca executa alteração diretamente;
- LLM retorna intenção estruturada;
- sistema valida role, scope, business e entidade;
- usuário confirma ações sensíveis;
- resultado é gravado com auditoria;
- prompts devem conter o mínimo de dados necessário;
- respostas do modelo devem ser validadas por schema;
- ações ambíguas devem pedir escolha, não inferir silenciosamente;
- comandos de usuários não devem permitir acesso a dados fora do business atual.

Exemplo:

```text
"Remove o Moto G84 do catálogo"

1. Interpretar comando.
2. Encontrar produtos candidatos apenas no business atual.
3. Verificar scope products:publish ou products:update.
4. Mostrar confirmação.
5. Executar somente após confirmação.
6. Registrar audit log.
```

### Segurança de arquivos

Uploads de imagens, PDFs e planilhas devem seguir regras de segurança:

- limitar tamanho de arquivo;
- validar extensão e MIME type;
- armazenar por `business_id`;
- usar URLs assinadas para arquivos privados;
- separar imagens públicas de arquivos privados de importação;
- remover metadados desnecessários quando possível;
- escanear ou bloquear formatos perigosos quando aplicável;
- não expor arquivos de importação publicamente.

### LGPD e privacidade

O produto deve seguir princípios básicos de LGPD desde o MVP:

- coletar o mínimo de dados necessário;
- deixar claro que buscas e cliques podem ser usados para métricas da loja;
- permitir exclusão de dados do business quando solicitado;
- evitar retenção indefinida de arquivos brutos de importação;
- anonimizar eventos de visitantes quando identificação pessoal não for necessária;
- separar dados públicos de dados operacionais privados;
- proteger dados pessoais em logs, analytics e prompts.

### Checklist mínimo de segurança para o MVP

Antes de considerar o MVP pronto:

1. Todas as rotas privadas validam usuário autenticado.
2. Todas as consultas operacionais filtram por `business_id`.
3. Toda mutação valida role ou scope.
4. Ações críticas do assistente exigem confirmação.
5. WhatsApp e dados pessoais sensíveis têm estratégia de proteção.
6. Tokens e segredos não ficam no client nem em texto puro.
7. Uploads privados não são públicos por acidente.
8. Eventos de auditoria existem para ações sensíveis.
9. Logs não expõem dados pessoais completos.
10. Testes cobrem isolamento entre businesses.

---

## 17.6 Eventos importantes a registrar

1. Visita à loja.
2. Busca realizada.
3. Produto exibido.
4. Produto clicado.
5. Clique no WhatsApp.
6. Lead criado.
7. Venda marcada.
8. Estoque alterado.
9. Produto criado.
10. Produto editado.
11. Produto desativado.
12. Importação iniciada.
13. Importação concluída.
14. Insight gerado.

---

## 18. Regras de UX

1. A loja pública deve carregar rápido.
2. A busca deve estar acima da dobra.
3. O CTA de WhatsApp deve ser extremamente evidente.
4. Resultados devem explicar o motivo da recomendação.
5. O painel deve ser utilizável no celular.
6. O lojista não deve precisar entender tecnologia.
7. A importação de catálogo deve parecer simples.
8. A revisão da importação deve evitar erros de IA.
9. O assistente nunca deve executar alterações críticas sem confirmação.
10. O dashboard deve priorizar informações comerciais.

---

## 19. Roadmap recomendado

## 19.1 Fase 1 — MVP funcional

Construir:

- autenticação;
- business;
- página pública;
- catálogo;
- busca inteligente;
- leads;
- WhatsApp CTA;
- dashboard básico;
- importação manual ou semi-automática;
- assistente operacional básico.

## 19.2 Fase 2 — Validação comercial

Adicionar:

- métricas melhores;
- insights básicos;
- melhoria de importação;
- histórico de buscas;
- produtos sem resultado;
- status do lead.

## 19.3 Fase 3 — Automação operacional

Adicionar:

- assistente mais robusto;
- sugestões de estoque;
- detecção de produtos parados;
- vínculo automático de vendas a leads;
- relatórios simples.

## 19.4 Fase 4 — Expansão

Adicionar:

- integrações oficiais;
- WhatsApp Business API;
- checkout opcional;
- múltiplos canais;
- automações de follow-up;
- permissões de equipe;
- personalização visual da loja.

---

## 20. Critérios de sucesso do MVP

O MVP será considerado promissor se:

1. O lojista entender a proposta em menos de 1 minuto.
2. Uma loja puder ser criada em poucos minutos a partir de catálogo existente.
3. Clientes usarem a busca em linguagem natural.
4. A busca gerar cliques para WhatsApp.
5. O lojista reconhecer os leads como úteis.
6. O lojista atualizar produtos/estoque sem muita resistência.
7. O dashboard mostrar informações que o lojista não tinha antes.
8. Pelo menos alguns lojistas aceitarem pagar pelo produto.

Métricas iniciais de validação:

- número de lojistas onboardados;
- tempo médio para criar loja;
- número de produtos importados;
- buscas por loja;
- cliques no WhatsApp;
- taxa busca → clique;
- leads marcados como vendidos;
- feedback qualitativo dos lojistas;
- disposição a pagar.

---

## 21. Ordem recomendada de implementação

1. Criar projeto base.
2. Configurar autenticação.
3. Criar modelo `business`.
4. Criar seleção de business.
5. Criar CRUD de produtos.
6. Criar página pública da loja.
7. Criar busca simples por texto.
8. Adicionar parsing de intenção com IA.
9. Adicionar embeddings e busca semântica.
10. Criar resultados ranqueados.
11. Criar CTA de WhatsApp.
12. Registrar lead.
13. Criar dashboard básico.
14. Criar importação de catálogo por texto.
15. Criar revisão de importação.
16. Criar assistente operacional básico.
17. Criar insights básicos.

---

## 22. Princípio final

O produto deve ser construído em torno de uma promessa simples:

> O lojista entrega o catálogo que já tem. O sistema transforma isso em uma loja inteligente. O cliente encontra o produto certo. O lojista recebe um lead mais qualificado.

Todas as funcionalidades do MVP devem servir diretamente a essa promessa.
