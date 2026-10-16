import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { productAPI } from "../../services/api";
import formatPrice from "../../utils/formatPrice";
import "./ProductDetail.css";

function ProductDetail({ handelAddtoCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await productAPI.getById(id);
        setProduct(res.data);
      } catch (err) {
        console.error("Erreur chargement produit ID", id, err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Chargement du produit...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-danger">Produit introuvable</h2>
        <Link to="/produits" className="btn btn-primary mt-3">Retour à la boutique</Link>
      </div>
    );
  }

  const numericPrice = typeof product.new_price === 'number' 
    ? product.new_price 
    : typeof product.newPrice === 'number'
      ? product.newPrice
      : 150;

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
              <span className="current-price text-danger fs-3 fw-bold">{formatPrice(numericPrice)}</span>
              {product.prev_price && (
                <del className="text-muted ms-3">{formatPrice(product.prev_price)}</del>
              )}
            </div>
            
            {product.description && (
              <p className="product-description text-muted my-3">{product.description}</p>
            )}

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
              <span className="ms-2 text-muted">({product.reviews || '1k'})</span>
            </div>

            <div className="button-group mt-4">
              <button 
                className="btn btn-warning btn-lg w-100 mb-2 py-3 fw-bold" 
                onClick={() => handelAddtoCart({...product, quantity, selectedSize})}
              >
                <FaShoppingCart className="me-2" /> AJOUTER AU PANIER
              </button> 
            </div>

            <div className="shipping-info mt-4 p-3 bg-light rounded shadow-sm">
              <div className="d-flex align-items-center mb-1">
                <CiDeliveryTruck className="me-2 icones text-success fs-4"/>
                <small className="fw-bold">Expédition express 24-48h sur toutes les commandes</small>
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