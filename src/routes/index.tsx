import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { USER_ROLES } from '../constants';
import PrivateRoute from '../components/auth/PrivateRoute';
import Profile from '../components/auth/Profile';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Home from '../components/pages/Home';
import About from '../components/pages/About';
import Contact from '../components/pages/Contact';
import ProductList from '../components/products/ProductList';
import ProductDetails from '../components/products/ProductDetails';
import VendorDashboard from '../components/vendor/Dashboard';
import AdminDashboard from '../components/admin/Dashboard';
import Cart from '../components/cart/Cart';
import Checkout from '../components/checkout/Checkout';
import OrderHistory from '../components/orders/OrderHistory';
import VendorRegistration from '../components/vendor/VendorRegistration';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
      <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
      <Route path="/orders" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
      
      {/* Vendor Routes */}
      <Route 
        path="/vendor/dashboard" 
        element={
          <PrivateRoute roles={[USER_ROLES.VENDOR]}>
            <VendorDashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/vendor/register" 
        element={
          <PrivateRoute>
            <VendorRegistration />
          </PrivateRoute>
        } 
      />
      
      {/* Admin Routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <PrivateRoute roles={[USER_ROLES.ADMIN]}>
            <AdminDashboard />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;