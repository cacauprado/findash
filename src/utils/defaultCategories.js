/**
 * 📋 Categorias padrão para novos usuários
 * Serve como template ao criar conta
 */
export const DEFAULT_CATEGORIES = [
  {
    name: "Alimentação",
    description: "Comida, restaurantes, supermercado",
    color: "#FF6B6B",
    icon: "utensils",
    order: 0
  },
  {
    name: "Transporte",
    description: "Uber, combustível, ônibus, metrô",
    color: "#4ECDC4",
    icon: "car",
    order: 1
  },
  {
    name: "Moradia",
    description: "Aluguel, condomínio, IPTU, água, energia",
    color: "#45B7D1",
    icon: "home",
    order: 2
  },
  {
    name: "Saúde",
    description: "Farmácia, médico, dentista, academia",
    color: "#96CEB4",
    icon: "heart",
    order: 3
  },
  {
    name: "Educação",
    description: "Cursos, livros, materiais escolares",
    color: "#FFEAA7",
    icon: "book",
    order: 4
  },
  {
    name: "Diversão",
    description: "Cinema, jogos, hobbies, streaming",
    color: "#DDA15E",
    icon: "gamepad2",
    order: 5
  },
  {
    name: "Renda",
    description: "Salário, freelance, investimentos, bônus",
    color: "#06A77D",
    icon: "dollar-sign",
    order: 6
  },
  {
    name: "Outros",
    description: "Categorias não especificadas",
    color: "#95A5A6",
    icon: "tag",
    order: 7
  }
];

/**
 * 🎨 Ícones disponíveis do Lucide React
 */
export const AVAILABLE_ICONS = [
  'utensils',
  'car',
  'home',
  'heart',
  'book',
  'gamepad2',
  'dollar-sign',
  'tag',
  'shopping-cart',
  'phone',
  'zap',
  'droplet',
  'wifi',
  'plane',
  'camera',
  'music',
  'dumbbell',
  'briefcase',
  'gift',
  'trending-up',
  'coffee',
  'users',
  'landmark',
  'box',
  'target',
];

/**
 * 🎯 Paleta de cores disponíveis
 */
export const COLOR_PALETTE = [
  // Reds
  '#FF6B6B', '#FF8E8E', '#FFB1B1', '#FFCCCC',
  // Teals
  '#4ECDC4', '#6FE0D8', '#8FE9E8', '#A8F5F0',
  // Blues
  '#45B7D1', '#6ECEE8', '#96DEFF', '#ABEDFF',
  // Greens
  '#96CEB4', '#B0E0A0', '#C9F0DD', '#E0F8E8',
  // Yellows
  '#FFEAA7', '#FFF4D1', '#FFFAEB', '#FFFEF8',
  // Oranges
  '#DDA15E', '#EDB5A0', '#F5D4B8', '#FDE4D0',
  // Dark Greens
  '#06A77D', '#36B894', '#66CAAA', '#96E8C0',
  // Grays
  '#95A5A6', '#BDC3C7', '#D7DCDF', '#ECEFF1',
  // Purples
  '#9B59B6', '#C39BD3', '#D7BDE2', '#E8DAEF',
  // Reds (alt)
  '#E74C3C', '#EC7063', '#F5B7B1', '#FADBD8',
];
