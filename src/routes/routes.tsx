import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Cart from '@/pages/Cart';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Checkout from '@/pages/Checkout';
import OrderSuccess from '@/pages/OrderSuccess';
import UserProfile from '@/pages/UserProfile';
import OrderHistory from '@/pages/OrderHistory';
import Favorites from '@/pages/Favorites';
import Search from '@/pages/Search';
import CompleteSystemTest from '@/test/complete-system-test';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="produtos" element={<Products />} />
          <Route path="carrinho" element={<Cart />} />
          
          {/* Rotas de autenticação - Fase 2 */}
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          
          {/* Checkout e finalização de pedido - Fase 2 */}
          <Route path="checkout" element={<Checkout />} />
          <Route path="pedido-sucesso/:orderId" element={<OrderSuccess />} />
          
          {/* Rotas de usuário - Fase 3 */}
          <Route path="profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="orders" element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          } />
          
          {/* Detalhe de produto */}
          <Route path="produtos/:id" element={<ProductDetail />} />
          
          {/* Rotas de favoritos e busca - Fase 4 */}
          <Route path="favorites" element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          } />
          <Route path="busca" element={<Search />} />
          
          {/* Página de teste completo */}
          <Route path="test" element={<CompleteSystemTest />} />
          
          {/* Páginas estáticas */}
          <Route path="sobre" element={<About />} />
          <Route path="contato" element={<Contact />} />
          
          {/* Rota 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
