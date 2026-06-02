# Dashboard, Dados, Insights e Ações para o Lojista

## 1. Objetivo do dashboard

O dashboard não deve ser apenas um painel de métricas como visitas, cliques e gráficos genéricos.

Ele deve funcionar como um painel de inteligência comercial para o lojista.

A lógica central é:

> O cliente final diz o que quer → o sistema interpreta → recomenda produtos → registra comportamento → o lojista entende demanda, estoque, conversão e oportunidades.

O dashboard deve ajudar o lojista a responder quatro perguntas:

1. Quantas oportunidades minha loja gerou?
2. O que meus clientes estão procurando?
3. Quais produtos estão performando melhor ou pior?
4. O que eu devo fazer agora?

A quarta pergunta é a mais importante. O dashboard não deve terminar em gráficos. Ele deve terminar em ações recomendadas.

---

## 2. Princípios do dashboard

1. Ser simples o suficiente para um microlojista entender.
2. Priorizar decisões comerciais, não métricas vaidosas.
3. Conectar intenção do cliente com produto, lead e venda.
4. Mostrar oportunidades perdidas.
5. Mostrar problemas de estoque.
6. Mostrar produtos com alta ou baixa performance.
7. Sugerir ações práticas.
8. Funcionar bem no celular.
9. Evitar linguagem técnica.
10. Sempre que possível, transformar dado em recomendação.

---

## 3. Métricas principais do dashboard

### 3.1 Visitas na loja

Quantidade de pessoas que acessaram a página pública da loja.

Uso:

- medir interesse geral;
- avaliar tráfego vindo de Instagram, WhatsApp ou link da bio;
- comparar períodos;
- entender se a vitrine está sendo acessada.

Evento relacionado:

```text
store_viewed
```

---

### 3.2 Buscas realizadas

Quantidade de buscas em linguagem natural feitas pelos visitantes.

Uso:

- medir adoção da busca inteligente;
- entender se os clientes estão usando a ferramenta principal;
- comparar visitas com buscas.

Métrica derivada:

```text
taxa de uso da busca = buscas / visitas
```

Exemplo:

```text
300 visitas
120 buscas
Taxa de uso da busca: 40%
```

Se a taxa estiver baixa, a busca talvez não esteja visível ou clara o suficiente.

Evento relacionado:

```text
search_submitted
```

---

### 3.3 Cliques no WhatsApp

Quantidade de vezes em que visitantes clicaram para falar com o lojista.

Uso:

- principal métrica de geração de lead;
- prova de valor para o lojista;
- indicador direto de intenção comercial.

Evento relacionado:

```text
whatsapp_clicked
```

---

### 3.4 Leads gerados

Lead representa uma intenção comercial registrada.

Um lead pode ser criado quando:

- visitante clica no WhatsApp;
- visitante demonstra interesse em um produto;
- visitante passa por fluxo de recomendação e clica em CTA.

Um lead deve conter contexto, não apenas o clique.

Exemplo:

```json
{
  "original_query": "quero celular pra jogar até 3000",
  "interpreted_intent": {
    "max_price": 3000,
    "priorities": ["gaming", "battery"]
  },
  "clicked_product_id": "produto_123",
  "recommended_rank": 1,
  "whatsapp_clicked": true,
  "status": "new",
  "converted": false,
  "created_at": "..."
}
```

Eventos relacionados:

```text
lead_created
whatsapp_clicked
product_clicked
```

---

### 3.5 Vendas registradas

Como o MVP não terá checkout, a venda precisa ser registrada manualmente ou via assistente operacional.

Exemplo de comando:

```text
Vendi um S20 FE.
```

Uso:

- medir conversão real;
- atualizar estoque;
- vincular venda a lead;
- melhorar dashboard e insights.

Eventos relacionados:

```text
sale_registered
inventory_updated
lead_status_changed
```

---

### 3.6 Taxas de conversão

As taxas são mais importantes do que números absolutos.

Conversões importantes:

```text
visitas → buscas
buscas → clique no WhatsApp
clique no WhatsApp → venda registrada
produto visualizado → clique no WhatsApp
produto recomendado → clique no WhatsApp
```

Exemplos:

```text
Taxa de uso da busca = buscas / visitas
Taxa busca → WhatsApp = cliques no WhatsApp / buscas
Taxa lead → venda = vendas registradas / leads
CTR de produto = cliques / impressões
```

---

## 4. Dados de intenção do cliente

Os dados de intenção são o ativo mais valioso do produto.

Quando o visitante digita:

```text
Quero um celular pra jogar, bateria boa, até 3000 reais.
```

O sistema não deve guardar apenas o texto original. Deve guardar também a intenção interpretada.

Exemplo:

```json
{
  "category": "smartphone",
  "max_price": 3000,
  "priorities": ["gaming", "battery"],
  "use_case": "games",
  "price_sensitivity": "medium",
  "preferred_brands": [],
  "excluded_brands": []
}
```

---

### 4.1 Intenções mais buscadas

Exemplo:

```text
1. Boa câmera
2. Bateria forte
3. Celular para jogos
4. iPhone barato
5. Até R$ 1500
```

Uso:

- entender o que os clientes realmente querem;
- orientar estoque;
- orientar destaques;
- orientar comunicação da loja.

---

### 4.2 Faixas de preço mais buscadas

Exemplo:

```text
Até R$ 1000: 18%
R$ 1000–1500: 32%
R$ 1500–2000: 28%
R$ 2000–3000: 16%
Acima de R$ 3000: 6%
```

Uso:

- ajustar mix de produtos;
- decidir quais faixas de preço priorizar;
- identificar desalinhamento entre demanda e catálogo.

---

### 4.3 Marcas mais buscadas

Exemplo:

```text
Samsung: 42 buscas
iPhone: 35 buscas
Xiaomi: 28 buscas
Motorola: 18 buscas
```

Uso:

- orientar compra de estoque;
- destacar marcas mais desejadas;
- melhorar títulos e descrições.

---

### 4.4 Casos de uso mais buscados

Exemplos:

```text
Jogos
Fotos
Trabalho
Estudo
Bateria
Custo-benefício
Presente
```

Uso:

- criar coleções;
- melhorar categorização;
- criar atalhos na busca;
- destacar atributos certos nos produtos.

---

## 5. Dados de produto

### 5.1 Produtos mais vistos

Produtos que receberam mais visualizações.

Uso:

- medir interesse inicial;
- entender quais produtos atraem atenção.

---

### 5.2 Produtos mais clicados

Produtos que receberam mais cliques ou interesse.

Uso:

- identificar produtos com maior potencial comercial;
- decidir quais produtos destacar;
- avaliar demanda.

---

### 5.3 Produtos mais recomendados pela IA

Produtos que mais aparecem nos resultados da busca inteligente.

Uso:

- entender dependência do catálogo em poucos produtos;
- detectar ranking enviesado;
- ver quais produtos estão cobrindo mais intenções.

---

### 5.4 Produtos com melhor taxa de clique

Exemplo:

```text
Produto A apareceu 100 vezes e recebeu 30 cliques = CTR 30%
Produto B apareceu 100 vezes e recebeu 5 cliques = CTR 5%
```

Uso:

- identificar produtos realmente atrativos;
- comparar produtos similares;
- orientar destaque e reposição.

---

### 5.5 Produtos com baixa performance

Produtos que aparecem em buscas ou têm visualizações, mas geram poucos cliques ou vendas.

Possíveis causas:

- preço ruim;
- imagem ruim;
- descrição fraca;
- condição do produto pouco atrativa;
- produto não atende bem à intenção;
- alternativa melhor no catálogo.

---

### 5.6 Produtos parados

Produtos com estoque disponível, mas pouca ou nenhuma interação.

Critérios possíveis:

- muitos dias em estoque;
- poucas visualizações;
- poucos cliques;
- nenhum lead;
- nenhuma venda registrada.

Ações possíveis:

- melhorar imagem;
- melhorar descrição;
- reduzir preço;
- destacar produto;
- desativar;
- criar promoção.

---

## 6. Dados de estoque

Mesmo sem checkout, estoque é uma parte central do produto.

### 6.1 Produtos sem estoque

Produtos ativos com estoque igual a zero.

Ações:

- desativar da loja;
- sinalizar indisponível;
- sugerir reposição se houver demanda;
- recomendar produtos similares.

---

### 6.2 Produtos com alta procura e baixo estoque

Exemplo:

```text
O Samsung S20 FE teve 18 buscas relacionadas e 9 cliques, mas resta apenas 1 unidade.
```

Ações:

- repor estoque;
- destacar produto similar;
- ajustar comunicação;
- evitar frustração do cliente.

---

### 6.3 Produtos com estoque parado

Produtos com estoque disponível, mas baixa procura.

Ações:

- revisar preço;
- melhorar imagem;
- melhorar descrição;
- criar destaque;
- remover de destaque;
- fazer oferta.

---

### 6.4 Ruptura de demanda

Quando clientes buscam algo que a loja não tem.

Exemplo:

```text
27 clientes buscaram iPhone até R$ 2000, mas não há nenhum produto compatível em estoque.
```

Uso:

- orientar compra de estoque;
- revelar oportunidades perdidas;
- sugerir modelos para adquirir.

---

## 7. Dados de busca sem resultado

Toda busca sem bom resultado deve ser registrada.

Exemplos:

```text
iPhone até 1500
celular gamer até 1000
Samsung com 256GB barato
celular com NFC
```

Essas buscas devem alimentar uma seção chamada:

```text
Oportunidades perdidas
```

Dados úteis:

- texto original;
- intenção interpretada;
- quantidade de ocorrências;
- faixa de preço;
- marca;
- caso de uso;
- motivo da falta de resultado;
- produtos próximos;
- ação sugerida.

Motivos possíveis:

```text
sem produto em estoque
sem produto na faixa de preço
sem produto da marca desejada
atributos insuficientes no catálogo
produto existe, mas está inativo
produto existe, mas está sem estoque
```

---

## 8. Dados de lead

Cada lead deve guardar contexto completo.

Campos úteis:

```json
{
  "business_id": "uuid",
  "search_session_id": "uuid",
  "product_id": "uuid",
  "original_query": "quero celular até 2 mil com câmera boa",
  "interpreted_query": {
    "max_price": 2000,
    "priorities": ["camera", "battery"]
  },
  "lead_source": "store_search",
  "status": "new",
  "whatsapp_clicked": true,
  "converted": false,
  "created_at": "..."
}
```

Métricas de lead:

- leads por período;
- leads por produto;
- leads por intenção;
- leads por faixa de preço;
- leads vendidos;
- leads perdidos;
- motivos de perda.

Motivos de perda possíveis:

```text
preço alto
sem estoque
cliente não respondeu
queria outro modelo
comprou em outro lugar
condição do aparelho não agradou
```

---

## 9. Dados operacionais

### 9.1 Leads pendentes

Leads novos ou em atendimento sem atualização.

Insight possível:

```text
Você tem 8 leads novos sem atualização.
```

Ação:

```text
Ver leads pendentes
```

---

### 9.2 Leads esquecidos

Lead gerado há muito tempo sem mudança de status.

Insight possível:

```text
Há leads gerados há mais de 2 dias sem atualização.
```

---

### 9.3 Produtos vendidos sem lead vinculado

Quando o lojista registra venda, mas não vincula a um lead.

Possíveis interpretações:

- venda veio de fora da plataforma;
- lead não foi identificado;
- lojista precisa melhorar disciplina operacional;
- fluxo de vínculo precisa ser melhorado.

---

## 10. Estrutura recomendada do dashboard

O dashboard deve ser dividido em seis blocos.

### 10.1 Bloco 1 — Resumo comercial

Cards:

```text
Visitas
Buscas
Leads
Cliques no WhatsApp
Vendas registradas
Taxa busca → WhatsApp
```

Objetivo:

> Mostrar rapidamente se a loja está gerando oportunidades.

---

### 10.2 Bloco 2 — O que os clientes estão procurando

Cards/gráficos:

```text
Intenções mais buscadas
Faixas de preço mais buscadas
Marcas mais buscadas
Casos de uso mais buscados
```

Objetivo:

> Mostrar demanda real.

---

### 10.3 Bloco 3 — Produtos que mais geram interesse

Tabela:

```text
Produto | Apareceu | Cliques | Leads | Vendas | Conversão
```

Objetivo:

> Mostrar quais produtos estão gerando atenção e resultado.

---

### 10.4 Bloco 4 — Oportunidades perdidas

Tabela:

```text
Busca/Intenção | Quantidade | Motivo | Ação sugerida
```

Exemplo:

```text
iPhone até R$ 2000 | 18 buscas | Sem produto compatível | Buscar iPhone XR/11 usado
```

Objetivo:

> Transformar buscas sem resultado em oportunidade de estoque.

---

### 10.5 Bloco 5 — Estoque e alertas

Cards:

```text
Produtos sem estoque
Produtos com alta demanda e baixo estoque
Produtos parados
Produtos com preço possivelmente desalinhado
```

Objetivo:

> Evitar perda de venda e melhorar gestão de catálogo.

---

### 10.6 Bloco 6 — Assistente de insights

Lista de recomendações acionáveis.

Exemplos:

```text
Você deveria repor celulares até R$1500.
O S20 FE está gerando muitos cliques.
O iPhone 11 aparece muito, mas converte pouco.
Há muitas buscas por bateria forte.
```

Objetivo:

> Dizer claramente o que o lojista deve fazer agora.

---

## 11. Tipos de insights

### 11.1 Insight de demanda

Exemplo:

```text
Muitos clientes buscaram celulares até R$ 1500 nos últimos 7 dias.
```

Dados usados:

- buscas;
- interpretação de preço;
- frequência;
- produtos disponíveis.

Ação sugerida:

```text
Considere adicionar mais opções nessa faixa de preço ou destacar produtos próximos desse valor.
```

---

### 11.2 Insight de ruptura de estoque

Exemplo:

```text
O Samsung S20 FE teve alta procura, mas está com apenas 1 unidade em estoque.
```

Dados usados:

- estoque;
- cliques;
- buscas;
- leads.

Ações sugeridas:

- repor estoque;
- destacar alternativa parecida;
- atualizar estoque;
- revisar disponibilidade.

---

### 11.3 Insight de produto parado

Exemplo:

```text
O Moto G84 está em estoque há vários dias, mas teve poucos cliques.
```

Dados usados:

- estoque;
- visualizações;
- cliques;
- tempo em estoque.

Ações sugeridas:

- criar promoção;
- melhorar imagem;
- reduzir preço;
- revisar descrição;
- remover de destaque.

---

### 11.4 Insight de preço

Exemplo:

```text
O iPhone 11 aparece em várias buscas, mas recebe poucos cliques comparado a produtos similares.
```

Possíveis interpretações:

- preço alto;
- imagem ruim;
- descrição fraca;
- condição pouco atrativa;
- concorrência interna melhor.

Ações sugeridas:

- revisar preço;
- melhorar fotos;
- destacar garantia;
- destacar estado de conservação;
- comparar com alternativas.

---

### 11.5 Insight de conversão

Exemplo:

```text
O S20 FE gerou 12 cliques no WhatsApp, mas nenhuma venda registrada.
```

Dados usados:

- cliques;
- leads;
- vendas registradas.

Ações sugeridas:

- verificar disponibilidade;
- revisar abordagem no atendimento;
- confirmar preço;
- marcar leads como vendidos ou perdidos;
- atualizar estoque.

---

### 11.6 Insight de catálogo incompleto

Exemplo:

```text
Muitos produtos estão sem informação de armazenamento ou condição.
```

Dados usados:

- produtos;
- atributos faltantes;
- performance de busca.

Ação sugerida:

```text
Complete informações como memória, armazenamento e estado do aparelho para melhorar as recomendações.
```

---

### 11.7 Insight de busca sem resultado

Exemplo:

```text
14 clientes buscaram “celular gamer até R$ 1000”, mas nenhum produto atendeu bem.
```

Ações sugeridas:

- cadastrar produto compatível;
- ajustar expectativa com opções próximas;
- criar mensagem comercial para alternativa;
- registrar oportunidade de compra.

---

### 11.8 Insight de intenção emergente

Exemplo:

```text
Buscas por “NFC” aumentaram esta semana.
```

Dados usados:

- comparação período atual vs período anterior;
- entidades extraídas das buscas.

Ação sugerida:

```text
Destaque aparelhos com NFC nas descrições e nos cards.
```

---

### 11.9 Insight de recomendação ruim

Exemplo:

```text
Alguns produtos aparecem bastante nas recomendações, mas quase não recebem cliques.
```

Possíveis causas:

- ranking ruim;
- produto mal apresentado;
- match fraco;
- imagem ruim;
- preço ruim.

Ação sugerida:

```text
Revisar atributos, foto e preço desses produtos.
```

Esse insight também ajuda a melhorar o motor de busca.

---

### 11.10 Insight de oportunidade de compra

Exemplo:

```text
Nos últimos 30 dias, 38 clientes buscaram iPhone até R$ 2000. Sua loja teve apenas 1 modelo compatível.
```

Ação sugerida:

```text
Considere comprar iPhone XR, iPhone 11 ou modelos seminovos nessa faixa.
```

Esse insight transforma o sistema em uma ferramenta de decisão de estoque.

---

## 12. Ações recomendadas pelo sistema

O dashboard deve oferecer botões de ação, não apenas texto.

### 12.1 Ações em produtos

Para produto parado ou com baixa performance:

```text
[Editar preço]
[Melhorar descrição com IA]
[Destacar produto]
[Desativar produto]
```

---

### 12.2 Ações em estoque

Para alta demanda e baixo estoque:

```text
[Marcar para reposição]
[Ver produtos similares]
[Destacar alternativa]
[Atualizar estoque]
```

---

### 12.3 Ações em leads

Para leads pendentes:

```text
[Ver leads]
[Marcar como vendido]
[Marcar como perdido]
[Abrir WhatsApp]
```

---

### 12.4 Ações em catálogo

Para catálogo incompleto:

```text
[Completar atributos com IA]
[Revisar produtos incompletos]
[Adicionar fotos]
[Importar mais produtos]
```

---

### 12.5 Ações comerciais

Para demanda por faixa de preço:

```text
[Criar coleção até R$1500]
[Destacar produtos nessa faixa]
[Ver buscas relacionadas]
```

---

## 13. Exemplos de insights prontos para interface

### 13.1 Alta demanda por faixa de preço

```text
Alta procura por celulares até R$ 1500

Nos últimos 7 dias, 32% das buscas foram por celulares até R$ 1500, mas apenas 12% do seu catálogo está nessa faixa.

Ação sugerida:
Adicione mais opções nessa faixa ou destaque os modelos mais próximos.
```

Botões:

```text
[Ver buscas]
[Ver produtos até R$1500]
[Adicionar produto]
```

---

### 13.2 Produto com alto interesse

```text
Samsung S20 FE está gerando bastante interesse

Esse produto apareceu em 28 recomendações e recebeu 11 cliques no WhatsApp.

Ação sugerida:
Mantenha esse produto em estoque e considere destacá-lo na vitrine.
```

Botões:

```text
[Ver produto]
[Destacar produto]
[Ver leads]
```

---

### 13.3 Produto com baixa conversão

```text
iPhone 11 tem interesse, mas baixa conversão

O iPhone 11 recebeu 9 cliques no WhatsApp, mas nenhuma venda foi registrada.

Ação sugerida:
Verifique preço, disponibilidade, fotos e abordagem no atendimento.
```

Botões:

```text
[Ver leads]
[Editar produto]
[Marcar venda]
```

---

### 13.4 Busca por atributo específico

```text
Clientes estão procurando NFC

Foram identificadas 14 buscas mencionando NFC, mas poucos produtos do catálogo têm essa informação cadastrada.

Ação sugerida:
Complete os atributos dos produtos com NFC para melhorar as recomendações.
```

Botões:

```text
[Completar atributos]
[Ver buscas]
```

---

### 13.5 Estoque em risco

```text
Produto com alta demanda e baixo estoque

O Poco X5 Pro teve alta procura nesta semana, mas resta apenas 1 unidade em estoque.

Ação sugerida:
Reponha estoque ou direcione clientes para uma alternativa parecida.
```

Botões:

```text
[Ver similares]
[Atualizar estoque]
[Destacar alternativa]
```

---

### 13.6 Produto parado

```text
Produto parado no catálogo

O Moto G60 está disponível há 21 dias, mas teve apenas 2 visualizações e nenhum clique.

Ação sugerida:
Revise o preço, melhore a foto ou remova o produto dos destaques.
```

Botões:

```text
[Editar produto]
[Melhorar descrição com IA]
[Desativar]
```

---

## 14. Ações automáticas via assistente

Todas as ações automáticas sensíveis devem exigir confirmação.

### 14.1 Atualizar estoque

Exemplo:

```text
Detectei que você vendeu um S20 FE.
Estoque atual: 2
Novo estoque: 1

Confirmar alteração?
```

Ações:

```text
[Confirmar venda]
[Cancelar]
```

---

### 14.2 Criar destaque

Exemplo:

```text
O S20 FE está entre os produtos mais clicados.
Deseja colocá-lo em destaque na página inicial?
```

Ações:

```text
[Destacar produto]
[Não agora]
```

---

### 14.3 Melhorar descrição

Exemplo:

```text
Este produto tem poucos dados cadastrados.
Posso melhorar a descrição usando as especificações conhecidas do modelo.
```

Ações:

```text
[Melhorar descrição]
[Revisar produto]
```

---

### 14.4 Sugerir reposição

Exemplo:

```text
Há alta procura por celulares até R$1500.
Deseja criar uma lista de modelos recomendados para reposição?
```

Ações:

```text
[Gerar lista]
[Ver buscas]
```

---

### 14.5 Criar coleção

Exemplo:

```text
Você tem 6 produtos que combinam com buscas por “boa bateria”.
Deseja criar uma seção “Celulares com bateria forte”?
```

Ações:

```text
[Criar seção]
[Ver produtos]
```

---

## 15. Dashboard por maturidade

### 15.1 MVP básico

Dados:

- visitas;
- buscas;
- cliques no WhatsApp;
- leads;
- produtos mais clicados;
- buscas sem resultado;
- produtos sem estoque.

Insights:

- alta demanda por faixa de preço;
- produtos mais procurados;
- buscas sem resultado;
- leads pendentes;
- produtos sem estoque.

---

### 15.2 Versão 2

Dados:

- taxa busca → clique;
- taxa clique → venda;
- intenção por categoria;
- marcas mais buscadas;
- produtos parados;
- produtos com baixa conversão;
- demanda vs estoque.

Insights:

- oportunidade de reposição;
- produto com preço desalinhado;
- catálogo incompleto;
- intenção emergente.

---

### 15.3 Versão 3

Dados:

- previsão de demanda;
- sazonalidade;
- comparação com histórico;
- ranking de oportunidades;
- performance por origem de tráfego;
- performance por vendedor, se houver equipe;
- margem por produto, se o lojista informar custo.

Insights:

- o que comprar;
- o que promover;
- o que baixar preço;
- o que remover;
- qual público está comprando;
- quais produtos têm melhor margem.

---

## 16. Modelo de dados recomendado

### 16.1 Tabela `analytics_events`

Eventos genéricos de comportamento.

```sql
id uuid primary key
business_id uuid not null
event_type text not null
visitor_id text
session_id text
product_id uuid
lead_id uuid
metadata jsonb
created_at timestamp
```

Exemplos de `event_type`:

```text
store_viewed
search_submitted
product_impression
product_clicked
product_viewed
whatsapp_clicked
lead_created
sale_registered
inventory_updated
```

---

### 16.2 Tabela `search_intent_aggregates`

Pode ser materializada posteriormente para melhorar performance do dashboard.

```sql
id uuid primary key
business_id uuid
period_start date
period_end date
intent_type text
intent_value text
count integer
metadata jsonb
```

Exemplo:

```text
intent_type: price_range
intent_value: 1000_1500
count: 42
```

---

### 16.3 Tabela `product_performance_daily`

Agregados diários por produto.

```sql
id uuid primary key
business_id uuid
product_id uuid
date date
impressions integer
clicks integer
whatsapp_clicks integer
leads integer
sales integer
search_appearances integer
```

---

### 16.4 Tabela `lead_status_events`

Histórico de mudança de status dos leads.

```sql
id uuid primary key
business_id uuid
lead_id uuid
from_status text
to_status text
changed_by_user_id uuid
created_at timestamp
```

---

## 17. Tela mais valiosa do dashboard

A tela mais valiosa provavelmente será:

```text
O que meus clientes querem comprar?
```

Ela deve conter:

```text
Faixas de preço mais buscadas
Marcas mais buscadas
Usos mais buscados
Produtos mais desejados
Buscas sem resposta
Oportunidades de estoque
```

Motivo:

> Essa tela entrega algo que o lojista pequeno normalmente não tem: clareza sobre a demanda real antes da venda.

Esse é um diferencial enorme.

---

## 18. Escopo recomendado para o MVP

Não criar um dashboard gigante no começo.

Criar um dashboard que responda:

### 18.1 Quantas oportunidades minha loja gerou?

Métricas:

- visitas;
- buscas;
- leads;
- cliques no WhatsApp.

---

### 18.2 O que meus clientes estão procurando?

Métricas:

- intenções;
- faixas de preço;
- marcas;
- termos comuns.

---

### 18.3 Quais produtos estão performando?

Métricas:

- produtos mais vistos;
- produtos mais clicados;
- produtos com mais leads;
- produtos com baixa conversão.

---

### 18.4 O que devo fazer agora?

Insights:

- repor;
- destacar;
- revisar preço;
- melhorar descrição;
- completar catálogo;
- responder leads;
- desativar produtos sem estoque.

---

## 19. Recomendação final

O dashboard deve ser tratado como uma feature de retenção.

O lojista pode entrar no produto por causa da vitrine inteligente, mas tende a continuar usando se o sistema mostrar:

```text
o que os clientes querem
quais produtos estão funcionando
quais oportunidades ele está perdendo
o que ele deve fazer hoje
```

O dashboard precisa transformar dados em ação.

A fórmula é:

```text
Intenção capturada
→ comportamento medido
→ demanda entendida
→ insight gerado
→ ação recomendada
```
