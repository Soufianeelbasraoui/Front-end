import React from "react";
import { Link } from "react-router-dom";
import Featuredproducts from "../../data/featuredProducts";
import ItemCard from "../../components/ProductCard/ItemCard";
import "./Furniture.css";

function Furniture({ handelAddtoCart }) {
  const MeublesFilter = Featuredproducts.filter((ele) => ele.category === "Meubles");

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/home">Accueil</Link></li>
          <li className="breadcrumb-item"><Link to="/produits">Boutique</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Meubles</li>
        </ol>
      </nav>
      
      <div className="product-grid mt-4">
        {MeublesFilter.map((product) => (
          <ItemCard 
            key={product.id} 
            product={product} 
            handelAddtoCart={handelAddtoCart} 
          />
        ))}
      </div>
    </div>
  );
}

export default Furniture;
