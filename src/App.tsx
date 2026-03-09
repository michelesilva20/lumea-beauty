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
import { AdminDashboard } from '@pages/Admin/Dashboard';

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
      </Route>

      {/* Admin Routes - requer login como admin */}
      <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
