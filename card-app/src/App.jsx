
import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './index.css';

import Nav from "./navigation/Nav";
import Services from "./servicse/Services";
import Contact from "./contact/Contact";
import Maine from "./maine/Maine";
import Sinscrire from "./Login/S'inscrire";
import Connecter from "./Login/Connecter";
import Login from "./Login/MotDePasseOublie";
import Cart from "./Crat/Cart";
import Products from "./Home/Home";
import Footer from "./footer/Footer";
import ProductDetail from "./productcart/ProductDetail";


import Produits from "./Produits/Produits";
import Vetments from "./Category/vetments";
import Meubles from "./Category/Meubles";
import Electroniques from "./Category/Électroniques";
import Sacetbagage from "./Category/Sacetbagage";
import ProductsFeatured from "./Featuredproducts/Featuredp";
import AboutUs from "./about/Aboutus";

import Lesoffers from "./lesOffre/Lesoffers";
import MotDePasseOublie from "./Login/MotDePasseOublie";


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
      <Nav products={panier.length} />
       <Routes>
      
                
       <Route path="/" element={<Products handelAddtoCart={handeladdtocart} />} />
        <Route path="/home" element={<Products handelAddtoCart={handeladdtocart} />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Connecter" element={<Connecter />} />
        <Route path="/S'inscrire" element={<Sinscrire />} />
        <Route path="/MotDePasseOublie" element={<MotDePasseOublie/>}/>
        <Route path="/cart" element={<Cart painer={panier} handeleRemove={handeleRemove} />} />
        <Route path="/product/:id" element={<ProductDetail handelAddtoCart={handeladdtocart} />} />
        <Route path="/produits" element={<Produits handelAddtoCart={handeladdtocart}/>}/>
        <Route path="/vetments" element={<Vetments  handelAddtoCart={handeladdtocart} />}/>
        <Route path="/meubles" element={<Meubles  handelAddtoCart={handeladdtocart} />}/>
        <Route path="/Electroniques" element={<Electroniques  handelAddtoCart={handeladdtocart} />}/>
        <Route path="/Sacetbagage" element={<Sacetbagage  handelAddtoCart={handeladdtocart} />}/>
        <Route path="/AboutUs" element={<AboutUs/>}/>
       <Route path="/Lesoffers" element={<Lesoffers handelAddtoCart={handeladdtocart} />}/>
     
      </Routes>
    
      <Footer />
  
    </BrowserRouter>
  );
}

export default App;
