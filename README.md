# Church Loja Virtual

Aplicação de e‑commerce construída com React, TypeScript e Vite. O projeto inclui listagem de produtos, busca, detalhes, carrinho, favoritos, autenticação mock, avaliações e páginas estáticas.

## Recursos
- Listagem de produtos com filtros e busca
- Favoritos com persistência em `localStorage`
- Carrinho com quantidade e total
- Página de detalhes do produto com avaliações
- Autenticação mock com login/registro e rotas protegidas
- Páginas estáticas: Sobre e Contato (com formulário)
- UI responsiva com TailwindCSS e ícones `lucide-react`
- Roteamento com React Router

## Stack
- `React` + `TypeScript`
- `Vite` com HMR (porta padrão `8080`)
- `React Router`
- `Zustand` com `persist` para stores
- `TailwindCSS`
- `lucide-react` para ícones
- `date-fns` para formatação de datas

## Início Rápido
1. Instalar dependências
   - `npm install`
2. Rodar em desenvolvimento
   - `npm run dev`
   - Acesse `http://127.0.0.1:8080/`
3. Build de produção
   - `npm run build`
4. Preview do build
   - `npm run preview`

Se a porta `8080` estiver em uso, o Vite escolherá outra automaticamente e mostrará o novo endereço no terminal.

## Estrutura do Projeto
```
src/
  components/
    auth/ProtectedRoute.tsx
    layout/{Header,Footer,Layout}.tsx
    products/{ProductCard,FavoriteButton,ReviewForm,ReviewsList}.tsx
    ui/{button,card,input,badge,label,star-rating}.tsx
  pages/
    {Home,Products,Search,Favorites,Cart,Checkout,OrderHistory,
     Login,Register,UserProfile,OrderSuccess,ProductDetail,About,Contact}.tsx
  routes/routes.tsx
  services/{api,mock}.ts
  stores/{useAuthStore,useCartStore,useFavoritesStore,useProductsStore,useReviewsStore}.ts
  types/index.ts
  main.tsx
```

## Rotas Principais
- `/` Home
- `/produtos` Listagem
- `/produtos/:id` Detalhe de produto
- `/busca` Busca com filtros
- `/carrinho` Carrinho
- `/favorites` Favoritos (protegida)
- `/auth/login` Login
- `/auth/register` Registro
- `/profile` Perfil (protegida)
- `/orders` Pedidos (protegida)
- `/checkout` Checkout
- `/pedido-sucesso/:orderId` Confirmação
- `/sobre` Sobre Nós
- `/contato` Contato

## Mock API
O arquivo `src/services/api.ts` expõe métodos que usam `src/services/mock.ts`.

Persistência em `localStorage`:
- Usuário atual: `mock_auth_user`
- Token: `auth_token`
- Favoritos: `favorites`
- Avaliações: `reviews`
- Pedidos: `orders`

Categorias e produtos de exemplo estão definidos em `mock.ts`. As imagens usam caminhos como `/img/camiseta-jesus.jpg`. Ajuste a pasta `public/img` conforme necessidade.

## Stores (Zustand)
- `useAuthStore`: login, registro, logout e `checkAuth`
- `useCartStore`: itens do carrinho e total
- `useFavoritesStore`: favoritos por usuário
- `useProductsStore`: catálogo de produtos
- `useReviewsStore`: avaliações e média por produto

## Componentes de UI
- Botões, cards, inputs, badges e ratings em `src/components/ui`
- `StarRating` oferece seleção e exibição de estrelas, com estado de hover

## Desenvolvimento
- Aliases configurados em `vite.config.ts` e `tsconfig.json` (prefixo `@`)
- Tailwind habilitado via plugin
- HMR ativo para desenvolvimento rápido

## Troubleshooting
- Invalid Hook Call
  - Use Hooks apenas em componentes de função ou hooks personalizados.
  - Evite chamar componentes que usam Hooks como função em módulos de constantes.
- Duplicatas de React
  - Verifique `npm ls react` e `npm ls react-dom` para múltiplas versões.
- Porta em uso
  - O Vite troca automaticamente e informa o novo endereço.
- Erros de HMR “Pre-transform”
  - Verifique imports que apontam para arquivos inexistentes.

## Scripts
- `dev`: inicia servidor de desenvolvimento
- `build`: compila para produção
- `preview`: serve o build gerado

## Contribuição
- Padronize imports usando aliases `@/...`
- Mantenha stores coesas e tipadas
- Evite Hooks fora de componentes
- Prefira componentes reutilizáveis em `components/ui`

## Licença
Projeto para fins educacionais/demonstração.
