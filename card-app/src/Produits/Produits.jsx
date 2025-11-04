import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Featuredproducts from "../data/data1";
import { MdOutlineStar, MdStarHalf } from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import { GrView } from "react-icons/gr";
import nowcollection from "../image/Ncollection.jpg"
import "./Produits.css";


function Produits({ handelAddtoCart }) {
   
  
  
  
  
  const [produitfilter, setProduitFilter] = useState(Featuredproducts);

  const handleAllProducts = () => {
    setProduitFilter(Featuredproducts);
  };

  const handleÉlectroniques = () => {
    setProduitFilter(Featuredproducts.filter(ele => ele.category === "Électroniques"));
  };

  const handleVêtements = () => {
    setProduitFilter(Featuredproducts.filter(ele => ele.category === "Vêtements"));
  };

  const handleMobilier = () => {
    setProduitFilter(Featuredproducts.filter(ele => ele.category === "Meubles"));
  };

  const handleSacs = () => {
    setProduitFilter(Featuredproducts.filter(ele => ele.category === "Sacs et Bagages"));
  };

  return (
    <div className="">
 <div className="produits-container position-relative  overflow-hidden">
      {/* Image de fond */}
      <img 
        src={nowcollection} 
        alt="Promotion" 
        className="background-image"
      />
      
      {/* Overlay sombre */}
      <div className="dark-overlay"></div>
      
      {/* Contenu centré */}
      <div className="content-center text-center text-white position-relative">
        <span className="badge bg-danger mb-3 px-3 py-2 fs-6">OFFRE LIMITÉE</span>
        <h2 className="fw-bold mb-4 display-4">
          Soldes d'été <span className="text-warning">jusqu'à -50%</span>
        </h2>
        
       
        
        <Link to="/lesoffers"><button className="btn btn-warning btn-lg px-5 py-3 fw-bold">
          Voir les offres <i className="bi bi-arrow-right ms-2"></i>
        </button></Link>
      </div>
    </div>
    <div>
       <div className="carousel-header">
             <Link to="/Lesoffers" className='nav-link'> <span className="header-title">⚡ Choix du moment</span>
             <span className="header-subtitle">Offre à durée limitée ➔</span></Link>
            </div>
     
    </div>
    <div className="text-center mb-5">
    <h5 className="text-danger">OFFRE DE PRINTEMPS</h5>
    <h5>EXPLOREZ VOS CENTRES D'INTERET</h5>
    </div>

      <div >
        <div className="container-recommended mt-4 ">
          <h4 className="text-recommended me-3">Recommended</h4>
          <button onClick={handleAllProducts}>Tous les produits</button>
          <button onClick={handleÉlectroniques}>Électroniques</button>
          <button onClick={handleVêtements}>Vêtements</button>
          <button onClick={handleMobilier}>Mobilier</button>
          <button onClick={handleSacs}>Sacs et Bagages</button>
        </div>
        
      </div>

      <div className="product-grid grid1 mt-2">
        {produitfilter.map((product, index) => (
          <div key={index} className="product-card product-card1">
            <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
              <img src={product.img} alt={product.title} className="product-image " />
              <p className="product-title">{product.title}</p>
            </Link>
            <div className="product-price">
              {product.prevPrice && (
                <span className="old-price">{product.newPrice}</span>
              )}
              <span className="product-price1 ms-2">{product.prevPrice}</span>
              <span className="ms-1 reviews">{product.reviews}</span>
              <span className="ms-3">
                <Link to={`/product/${product.id}`} className="text-decoration-none text-dark view">
                  <GrView />
                </Link>
              </span>
            </div>

            <div className="star-icon mt-3">
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdStarHalf />
              <button
                className="btn1"
                onClick={(e) => {
                  e.preventDefault();
                  handelAddtoCart(product);
                }}
              >
                <LiaCartPlusSolid className="icon-cart" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Produits;
