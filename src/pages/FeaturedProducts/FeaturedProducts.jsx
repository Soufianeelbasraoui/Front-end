import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productAPI } from "../../services/api";
import ItemCard from "../../components/ProductCard/ItemCard";
import "./FeaturedProducts.css";
import featurp2 from "../../assets/images/featurp2.webp";
import featurp1 from "../../assets/images/featurp1.webp";

function FeaturedProducts({ handelAddtoCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await productAPI.getAll();
        // Prendre les 6 premiers ou ceux les mieux notés
        const featured = (res.data || []).slice(0, 6);
        setProducts(featured);
      } catch (err) {
        console.error("Erreur récupération produits vedette:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

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

      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Chargement des produits en vedette...</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ItemCard 
              key={product.id} 
              product={product} 
              handelAddtoCart={handelAddtoCart} 
            />
          ))}
        </div>
      )}

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
                <del className="text-muted ms-2 small">730 DH</del>
              </div>
              <Link to="/produits">
                <button className="btn btn-warning px-4 py-2">Découvrir l'offre</button>
              </Link>
            </div>
            <div className="duo-card-img">
              <img src={featurp2} alt="Sac à main" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
