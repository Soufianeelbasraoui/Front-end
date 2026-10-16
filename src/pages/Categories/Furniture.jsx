import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productAPI } from "../../services/api";
import ItemCard from "../../components/ProductCard/ItemCard";
import "./Furniture.css";

function Furniture({ handelAddtoCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const res = await productAPI.getAll({ category: "Meubles" });
        setProducts(res.data || []);
      } catch (err) {
        console.error("Erreur de chargement des meubles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/home">Accueil</Link></li>
          <li className="breadcrumb-item"><Link to="/produits">Boutique</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Meubles</li>
        </ol>
      </nav>
      
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Chargement des meubles depuis le backend...</p>
        </div>
      ) : (
        <div className="product-grid mt-4">
          {products.map((product) => (
            <ItemCard 
              key={product.id} 
              product={product} 
              handelAddtoCart={handelAddtoCart} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Furniture;
