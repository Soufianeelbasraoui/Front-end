import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import products from "../../data/products";
import Featuredproducts from "../../data/featuredProducts";
import Featuredproduit from "../../data/recommendedProducts";
import formatPrice from "../../utils/formatPrice";
import "./ProductDetail.css";

function ProductDetail({ handelAddtoCart }) {
  const { id } = useParams();

  // On regroupe tous les produits pour la recherche par ID
  const allProducts = [...products, ...Featuredproducts, ...Featuredproduit]; 
  const product = allProducts?.find((prod) => prod?.id?.toString() === id);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-danger">Produit introuvable</h2>
        <Link to="/produits" className="btn btn-primary mt-3">Retour à la boutique</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5 product-detail-container">
      {/* Breadcrumb / Fil d'Ariane */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/home">Accueil</Link></li>
          <li className="breadcrumb-item"><Link to="/produits">Boutique</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* Section Image */}
        <div className="col-md-6 text-center">
          <div className="product-image-box">
            <img src={product.img} alt={product.title} className="img-fluid imgcard1" />
          </div>
        </div>
       
        {/* Section Détails */}
        <div className="col-md-6">
          <div className="product-details-content">
            <h2 className="product-title">{product.title}</h2>
            <p className="category-label"><strong>Catégorie:</strong> <span className="text-muted">{product.category}</span></p>

            <div className="price-box my-3">
              <span className="current-price text-danger fs-3 fw-bold">{formatPrice(product.newPrice)}</span>
              {product.prevPrice && (
                <del className="text-muted ms-3">{formatPrice(product.prevPrice)}</del>
              )}
            </div>
            
            <p><strong>Couleur:</strong> {Array.isArray(product.color) ? product.color.join(", ") : product.color}</p>
          
            <div className="mb-3">
              <label className="d-block mb-1"><strong>Quantité:</strong></label>
              <select 
                className="form-select qte-producte"
                style={{ width: '100px' }}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="stars-rating mb-3">
              {[...Array(4)].map((_, i) => <FaStar key={i} className="text-warning" />)}
              <FaStar className="text-secondary" /> 
              <span className="ms-2 text-muted">({product.reviews})</span>
            </div>

            {product.size && (
              <div className="mb-4">
                <strong>Taille:</strong>
                <div className="d-flex flex-wrap mt-2">
                  {product.size.map((size, index) => (
                    <button
                      key={index}
                      className={`btn me-2 mb-2 ${selectedSize === size ? 'btn-dark' : 'btn-outline-dark'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="button-group mt-4">
              <button 
                className="btn btn-warning btn-lg w-100 mb-2 py-3 fw-bold" 
                onClick={() => handelAddtoCart({...product, quantity, selectedSize})}
              >
                <FaShoppingCart className="me-2" /> AJOUTER AU PANIER
              </button> 

              <Link to="/produits" className="btn btn-outline-secondary w-100 py-2">
                RETOUR À LA BOUTIQUE
              </Link>
            </div>

            <div className="shipping-info mt-4 p-3 bg-light rounded shadow-sm">
              <div className="d-flex align-items-center mb-1">
                <CiDeliveryTruck className="me-2 icones text-success fs-4"/>
                <small className="fw-bold">Livraison gratuite sur toutes les commandes</small>
              </div>
              <small className="text-muted">Retour gratuit - Ajustement des prix garanti</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;