export const store = {
  name: "Loja do João Celulares",
  slug: "loja-do-joao",
  description:
    "Smartphones selecionados, atendimento rápido pelo WhatsApp e opções para diferentes orçamentos.",
  whatsapp: "5511999999999",
  instagram: "@lojadojoaocelulares",
  city: "São Paulo",
};

export const products = [
  {
    id: "p1",
    slug: "samsung-s20-fe",
    title: "Samsung S20 FE",
    brand: "Samsung",
    price: 1799,
    stock: 2,
    status: "Ativo",
    condition: "Usado",
    summary: "128GB, 6GB RAM, câmera versátil e desempenho forte para uso diário.",
    attributes: ["128GB", "6GB RAM", "Câmera 12MP", "Bateria 4500mAh", "4G"],
    reasons: ["Dentro do orçamento", "Boa câmera", "Bateria forte"],
    match: 96,
  },
  {
    id: "p2",
    slug: "iphone-11",
    title: "iPhone 11",
    brand: "Apple",
    price: 2100,
    stock: 1,
    status: "Ativo",
    condition: "Usado",
    summary: "64GB, ótimo para fotos e vídeos, com experiência iOS fluida.",
    attributes: ["64GB", "Câmera dupla", "Tela 6.1", "iOS", "4G"],
    reasons: ["Excelente para fotos", "Marca desejada", "Boa revenda"],
    match: 88,
  },
  {
    id: "p3",
    slug: "moto-g84",
    title: "Moto G84",
    brand: "Motorola",
    price: 1399,
    stock: 0,
    status: "Sem estoque",
    condition: "Novo",
    summary: "256GB, tela pOLED e bom custo-benefício para quem quer economizar.",
    attributes: ["256GB", "8GB RAM", "Câmera 50MP", "Bateria 5000mAh", "5G"],
    reasons: ["Preço competitivo", "Muito armazenamento", "Bateria forte"],
    match: 82,
  },
  {
    id: "p4",
    slug: "galaxy-a15",
    title: "Galaxy A15",
    brand: "Samsung",
    price: 1199,
    stock: 5,
    status: "Ativo",
    condition: "Novo",
    summary: "128GB, bateria duradoura e preço acessível para uso básico.",
    attributes: ["128GB", "4GB RAM", "Câmera 50MP", "Bateria 5000mAh", "4G"],
    reasons: ["Bom e barato", "Em estoque", "Bateria forte"],
    match: 79,
  },
];

export const leads = [
  {
    id: "l1",
    query: "quero celular até R$2000 com câmera boa",
    product: "Samsung S20 FE",
    status: "Novo",
    time: "há 12 min",
    intent: ["Até R$2000", "Boa câmera", "Bateria"],
  },
  {
    id: "l2",
    query: "iPhone bom para fotos",
    product: "iPhone 11",
    status: "Em atendimento",
    time: "há 1 h",
    intent: ["iPhone", "Fotos", "Usado"],
  },
  {
    id: "l3",
    query: "celular barato com muita memória",
    product: "Moto G84",
    status: "Vendido",
    time: "ontem",
    intent: ["Barato", "Armazenamento", "Android"],
  },
];

export const insights = [
  {
    title: "Clientes querem opções até R$1500",
    description:
      "As buscas por celulares baratos cresceram esta semana, mas poucas opções ativas estão nessa faixa.",
    impact: "Alto",
    action: "Anunciar modelos de entrada e destacar o Galaxy A15.",
  },
  {
    title: "S20 FE tem muitos cliques",
    description:
      "O produto aparece bem nas recomendações, mas ainda tem poucas vendas registradas.",
    impact: "Médio",
    action: "Verificar abordagem no WhatsApp e disponibilidade real.",
  },
  {
    title: "Moto G84 está sem estoque",
    description:
      "Mesmo sem estoque, o modelo ainda aparece como alternativa próxima em buscas por bateria.",
    impact: "Médio",
    action: "Repor estoque ou marcar como indisponível temporariamente.",
  },
];

export const metrics = [
  { label: "Leads", value: "32", detail: "+18% na semana" },
  { label: "Cliques WhatsApp", value: "24", detail: "12 vindos da busca" },
  { label: "Buscas", value: "118", detail: "9 sem resultado ideal" },
  { label: "Conversão", value: "22%", detail: "lead para venda" },
];
