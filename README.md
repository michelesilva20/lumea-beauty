# Luméa Beauty

**E-commerce Premium de Beleza e Skincare**

Um projeto completo de e-commerce moderno, elegante e feminino, desenvolvido com React, TypeScript e SCSS Modules. Ideal para portfólio profissional, demonstrando habilidades em design system, componentização e arquitetura frontend.

![Luméa Beauty](https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200)

## ✨ Características

### Design System Premium
- Paleta de cores sofisticada (Rose Quartz, Soft Blush, Ivory Cream)
- Tipografia elegante (Poppins + Onest)
- Sistema de tokens completo (cores, espaçamentos, sombras, breakpoints)
- Componentes reutilizáveis e consistentes

### Páginas Completas
- **Home** - Hero premium, categorias, best-sellers, editorial, reviews
- **Catálogo** - Filtros, ordenação, grid responsivo
- **Produto** - Galeria, variações, avaliações, produtos relacionados
- **Carrinho** - Resumo, cupom, recomendações
- **Wishlist** - Lista de favoritos
- **Login/Cadastro** - Autenticação visual elegante

### Painéis
- **Painel do Cliente** - Dashboard, pedidos, endereços, dados
- **Painel Admin** - Dashboard com KPIs, pedidos recentes, estoque

### Características Técnicas
- Mobile-first responsive design
- CSS Modules com SCSS
- TypeScript para type safety
- Componentização profissional
- Sem dependência de Tailwind

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **React Router DOM** - Navegação SPA
- **SCSS Modules** - Estilos componentizados
- **CSS Custom Properties** - Tokens dinâmicos

## 📁 Estrutura do Projeto

```
src/
├── assets/           # Imagens, ícones, fontes
├── components/
│   ├── ui/           # Componentes base (Button, Input, Modal...)
│   ├── ecommerce/    # Componentes de e-commerce (ProductCard...)
│   └── shared/       # Header, Footer
├── data/             # Dados mock (produtos, categorias)
├── hooks/            # Custom hooks
├── layouts/          # Layouts (Public, Account, Admin)
├── pages/            # Páginas da aplicação
├── styles/
│   ├── tokens/       # Design tokens (cores, tipografia...)
│   └── base/         # Reset e estilos base
└── utils/            # Funções utilitárias
```

## 🛠️ Instalação

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/lumea-beauty.git

# Entrar no diretório
cd lumea-beauty

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

## 📍 Rotas

### Públicas
- `/` - Home
- `/categoria/:slug` - Listagem de produtos
- `/produto/:slug` - Detalhe do produto
- `/carrinho` - Carrinho de compras
- `/favoritos` - Lista de desejos
- `/login` - Login/Cadastro

### Área do Cliente
- `/conta` - Dashboard
- `/conta/pedidos` - Meus pedidos

### Admin
- `/admin` - Dashboard administrativo

## 🎨 Design Tokens

### Cores Principais
```scss
$rose-quartz: #D8B7C3;
$soft-blush: #F4E8EC;
$ivory-cream: #FAF7F4;
$warm-sand: #D9C7B8;
$mocha-taupe: #8A6F63;
$espresso: #3F312C;
```

### Tipografia
- **Títulos**: Poppins (400-700)
- **Corpo**: Onest (300-600)

## 📱 Responsividade

O projeto segue a abordagem mobile-first:

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Wide**: ≥ 1440px

## 🧩 Componentes UI

### Base
Button, IconButton, Input, Select, Checkbox, Badge, Modal, Drawer, Tabs, Breadcrumb, RatingStars, Skeleton, EmptyState, Avatar

### E-commerce
ProductCard, ProductGrid, CategoryCard, QuantitySelector, PriceBlock

## 📄 Licença

Este projeto é apenas para fins de demonstração e portfólio.

---

Desenvolvido com ❤️ para demonstrar habilidades em Frontend e Design de Interfaces.
