import React from "react";
import { Link } from "react-router-dom";
import Featuredproduit from "../../data/recommendedProducts";
import ItemCard from "../../components/ProductCard/ItemCard";
import "./FeaturedProducts.css";
import featurp2 from "../../assets/images/featurp2.webp";
import featurp1 from "../../assets/images/featurp1.webp";

function FeaturedProducts({ handelAddtoCart }) {
  return (
    <div className="container my-5">
      <div className="section-header-top mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <h2 className="section-main-title mb-1">Produits en Vedette</h2>
          <p className="section-main-subtitle text-muted mb-0">Nos meilleures ventes et articles coup de cœur</p>
        </div>
        <Link to="/produits" className="see-all-link">
          Voir tout le catalogue →
        </Link>
      </div>

      <div className="product-grid">
        {Featuredproduit.map((product) => (
          <ItemCard 
            key={product.id} 
            product={product} 
            handelAddtoCart={handelAddtoCart} 
          />
        ))}
      </div>

      <div className="row mt-5 g-4">
        <div className="col-lg-6">
          <div className="featured-duo-card">
            <div className="duo-card-info">
              <span className="badge bg-danger mb-2">-25% DE RÉDUCTION</span>
              <h4 className="duo-title">Grand Tapis de Bureau</h4>
              <p className="text-muted small mb-2">Similicuir imperméable & anti-dérapant</p>
              <div className="duo-pricing mb-3">
                <span className="current-price fs-4 fw-bold text-danger">173 DH</span>
                <del className="text-muted ms-2 small">213 DH</del>
              </div>
              <Link to="/produits">
                <button className="btn btn-warning px-4 py-2">Découvrir l'offre</button>
              </Link>
            </div>
            <div className="duo-card-img">
              <img src={featurp1} alt="Tapis de bureau" />
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="featured-duo-card">
            <div className="duo-card-info">
              <span className="badge bg-danger mb-2">-41% DE RÉDUCTION</span>
              <h4 className="duo-title">Sac à Main pour Homme</h4>
              <p className="text-muted small mb-2">Ensemble complet 2 pièces élégant</p>
              <div className="duo-pricing mb-3">
                <span className="current-price fs-4 fw-bold text-danger">432 DH</span>
                <del className="text-muted ms-2 small">536 DH</del>
              </div>
              <Link to="/Sacetbagage">
                <button className="btn btn-warning px-4 py-2">Découvrir l'offre</button>
              </Link>
            </div>
            <div className="duo-card-img">
              <img src={featurp2} alt="Sac à main homme" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
