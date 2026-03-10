import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '@layouts/PublicLayout';
import { AccountLayout } from '@layouts/AccountLayout';
import { AdminLayout } from '@layouts/AdminLayout';
import { ProtectedRoute } from '@components/shared/ProtectedRoute';
import { Home } from '@pages/Home';
import { Catalog } from '@pages/Catalog';
import { ProductDetail } from '@pages/ProductDetail';
import { Cart } from '@pages/Cart';
import { Wishlist } from '@pages/Wishlist';
import { Login } from '@pages/Login';
import { AccountDashboard } from '@pages/Account/Dashboard';
import { AccountOrders } from '@pages/Account/Orders';
import { AccountFavoritos } from '@pages/Account/Favoritos';
import { AccountEnderecos } from '@pages/Account/Enderecos';
import { AccountDados } from '@pages/Account/Dados';
import { AccountSeguranca } from '@pages/Account/Seguranca';
import { AccountPagamento } from '@pages/Account/Pagamento';
import { AccountCupons } from '@pages/Account/Cupons';
import { AdminDashboard } from '@pages/Admin/Dashboard';
import { AdminOrders } from '@pages/Admin/Orders';
import { AdminProducts } from '@pages/Admin/Products';
import { AdminCategories } from '@pages/Admin/Categories';
import { AdminCustomers } from '@pages/Admin/Customers';
import { AdminCoupons } from '@pages/Admin/Coupons';
import { AdminReports } from '@pages/Admin/Reports';
import { AdminSettings } from '@pages/Admin/Settings';

export const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Login />} />
      
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:slug" element={<Catalog />} />
        <Route path="/produto/:slug" element={<ProductDetail />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/favoritos" element={<Wishlist />} />
      </Route>

      {/* Account Routes - requer login como cliente */}
      <Route path="/conta" element={<ProtectedRoute allowedRole="client"><AccountLayout /></ProtectedRoute>}>
        <Route index element={<AccountDashboard />} />
        <Route path="pedidos" element={<AccountOrders />} />
        <Route path="favoritos" element={<AccountFavoritos />} />
        <Route path="enderecos" element={<AccountEnderecos />} />
        <Route path="dados" element={<AccountDados />} />
        <Route path="seguranca" element={<AccountSeguranca />} />
        <Route path="pagamento" element={<AccountPagamento />} />
        <Route path="cupons" element={<AccountCupons />} />
      </Route>

      {/* Admin Routes - requer login como admin */}
      <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="pedidos" element={<AdminOrders />} />
        <Route path="produtos" element={<AdminProducts />} />
        <Route path="categorias" element={<AdminCategories />} />
        <Route path="clientes" element={<AdminCustomers />} />
        <Route path="cupons" element={<AdminCoupons />} />
        <Route path="relatorios" element={<AdminReports />} />
        <Route path="configuracoes" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
