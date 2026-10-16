import React, { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './App.css';

import { AuthProvider } from "./context/AuthContext";

// Guards
import ProtectedRoute from "./components/Guards/ProtectedRoute";
import RoleGuard from "./components/Guards/RoleGuard";
import GuestRoute from "./components/Guards/GuestRoute";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AuthCallback from "./pages/Auth/AuthCallback";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import Unauthorized from "./pages/Error/Unauthorized";

import Clothing from "./pages/Categories/Clothing";
import Furniture from "./pages/Categories/Furniture";
import Electronics from "./pages/Categories/Electronics";
import Bags from "./pages/Categories/Bags";

import Services from "./pages/Services/Services";
import Contact from "./pages/Contact/Contact";
import Offers from "./pages/Offers/Offers";

function AppContent({ panier, handeladdtocart, handeleRemove }) {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard');
  const isAuthPage = location.pathname === '/unauthorized';

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {!isDashboard && !isAuthPage && <Navbar products={panier.length} />}
      <Routes>       
        {/* Routes Publiques Générales */}
        <Route path="/" element={<Home handelAddtoCart={handeladdtocart} />} />
        <Route path="/home" element={<Home handelAddtoCart={handeladdtocart} />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart painer={panier} handeleRemove={handeleRemove} />} />
        <Route path="/product/:id" element={<ProductDetail handelAddtoCart={handeladdtocart} />} />
        <Route path="/produits" element={<Products handelAddtoCart={handeladdtocart}/>}/>
        <Route path="/vetments" element={<Clothing handelAddtoCart={handeladdtocart} />}/>
        <Route path="/meubles" element={<Furniture handelAddtoCart={handeladdtocart} />}/>
        <Route path="/Electroniques" element={<Electronics handelAddtoCart={handeladdtocart} />}/>
        <Route path="/Sacetbagage" element={<Bags handelAddtoCart={handeladdtocart} />}/>
        <Route path="/Lesoffers" element={<Offers handelAddtoCart={handeladdtocart} />}/>

        {/* Routes Visiteurs / Invités (Redirige si déjà connecté) */}
        <Route path="/Connecter" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/connecter" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/S'inscrire" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/sinscrire" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/MotDePasseOublie" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Page d'erreur 403 (Accès Refusé) */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Routes Protégées pour Clients & Admins */}
        <Route 
          path="/wishlist" 
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['user', 'admin']}>
                <UserDashboard />
              </RoleGuard>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['user', 'admin']}>
                <UserDashboard />
              </RoleGuard>
            </ProtectedRoute>
          } 
        />

        {/* Routes Protégées Strictement Réservées aux Administrateurs */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['admin']} fallbackPath="/unauthorized">
                <AdminDashboard />
              </RoleGuard>
            </ProtectedRoute>
          } 
        />

        {/* Redirection fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isDashboard && !isAuthPage && <Footer />}
    </>
  );
}

function App() {
  const [panier, setPanier] = useState([]);

  const handeladdtocart = (product) => {
    setPanier([...panier, product]);
  };

  const handeleRemove = (index) => {
    setPanier(panier.filter((_, i) => i !== index));
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent 
          panier={panier} 
          handeladdtocart={handeladdtocart} 
          handeleRemove={handeleRemove} 
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
