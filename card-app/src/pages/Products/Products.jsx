import React, { useState } from "react";
import { Link } from "react-router-dom";
import Featuredproducts from "../../data/featuredProducts";
import { MdOutlineStar, MdStarHalf } from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import { GrView } from "react-icons/gr";
import nowcollection from "../../assets/images/Ncollection.jpg"
import "./Products.css";
import formatPrice from "../../utils/formatPrice";

function Products({ handelAddtoCart }) {
   
  const [produitfilter, setProduitFilter] = useState(Featuredproducts);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (category === "all") {
      setProduitFilter(Featuredproducts);
    } else {
      setProduitFilter(Featuredproducts.filter(ele => ele.category === category));
    }
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


      <div >
        <div className="container-recommended mt-4 align-items-center">
          <h4 className="text-recommended me-3 mb-0">Recommended</h4>
          <select className="category-select-dropdown" onChange={handleCategoryChange}>
             <option value="all">Tous les produits</option>
             <option value="Électroniques">Électroniques</option>
             <option value="Vêtements">Vêtements</option>
             <option value="Meubles">Mobilier</option>
             <option value="Sacs et Bagages">Sacs et Bagages</option>
          </select>
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
                <span className="old-price">{formatPrice(product.newPrice)}</span>
              )}
              <span className="product-price1 ms-2">{formatPrice(product.prevPrice || product.price)}</span>
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

export default Products;
