import React, { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

// Auth
import { AuthProvider, useAuth } from "./context/AuthContext";

// Layout Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import FeaturedProducts from "./pages/FeaturedProducts/FeaturedProducts";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AuthCallback from "./pages/Auth/AuthCallback";

// Dashboard Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";

// Category Pages
import Clothing from "./pages/Categories/Clothing";
import Furniture from "./pages/Categories/Furniture";
import Electronics from "./pages/Categories/Electronics";
import Bags from "./pages/Categories/Bags";

// Other Pages
import Services from "./pages/Services/Services";
import Contact from "./pages/Contact/Contact";
import Offers from "./pages/Offers/Offers";

// Protected Route Components
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="loading-page">Chargement...</div>;
  return isAuthenticated ? children : <Navigate to="/Connecter" />;
}

function AdminRoute({ children }) {
  const { isAdmin, isAuthenticated, loading } = useAuth();
  if (loading) return <div className="loading-page">Chargement...</div>;
  if (!isAuthenticated) return <Navigate to="/Connecter" />;
  if (!isAdmin) return <Navigate to="/dashboard" />;
  return children;
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
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar products={panier.length} />
         <Routes>       
         <Route path="/" element={<Home handelAddtoCart={handeladdtocart} />} />
          <Route path="/home" element={<Home handelAddtoCart={handeladdtocart} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Connecter" element={<Login />} />
          <Route path="/S'inscrire" element={<Register />} />
          <Route path="/MotDePasseOublie" element={<ForgotPassword/>}/>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/cart" element={<Cart painer={panier} handeleRemove={handeleRemove} />} />
          <Route path="/product/:id" element={<ProductDetail handelAddtoCart={handeladdtocart} />} />
          <Route path="/produits" element={<Products handelAddtoCart={handeladdtocart}/>}/>
          <Route path="/vetments" element={<Clothing  handelAddtoCart={handeladdtocart} />}/>
          <Route path="/meubles" element={<Furniture  handelAddtoCart={handeladdtocart} />}/>
          <Route path="/Electroniques" element={<Electronics  handelAddtoCart={handeladdtocart} />}/>
          <Route path="/Sacetbagage" element={<Bags  handelAddtoCart={handeladdtocart} />}/>
          <Route path="/Lesoffers" element={<Offers handelAddtoCart={handeladdtocart} />}/>
          
          {/* Protected: User Dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          
          {/* Protected: Admin Dashboard */}
          <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
