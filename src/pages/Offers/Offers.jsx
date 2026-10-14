import React, { useState } from "react";
import Featuredproducts from "../../data/featuredProducts";
import ItemCard from "../../components/ProductCard/ItemCard";
import bannerImg from "../../assets/images/imgslider4.webp";
import "./Offers.css";

const OFFER_CATEGORIES = [
  { id: "all", name: "Tous les articles" },
  { id: "Électroniques", name: "Électroniques" },
  { id: "Meubles", name: "Meubles" },
  { id: "Vêtements", name: "Vêtements" },
  { id: "Sacs et Bagages", name: "Sacs & Bagages" },
];

function Offers({ handelAddtoCart }) {
  const [filter, setFilter] = useState("all");

  const promoProducts = Featuredproducts.filter((product) => product.promo);

  const filteredProducts = promoProducts.filter((product) => 
    filter === "all" ? true : product.category === filter
  );

  return (
    <div className="offers-page-wrapper">
      <div className="container mt-4">
        <div className="offers-hero-banner">
          <img src={bannerImg} alt="Nos Offres Spéciales" className="offers-banner-img" />
          <div className="offers-banner-overlay"></div>
          <div className="offers-banner-content">
            <span className="badge bg-danger mb-2">VENTES FLASH DU MOMENT</span>
            <h1 className="banner-title">Jusqu'à -50% sur vos articles préférés</h1>
            <p className="banner-desc">Profitez de réductions exclusives et d'offres limitées sur toute notre sélection.</p>
          </div>
        </div>

        <div className="offers-header-section mt-4 mb-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div className="offers-title-group text-start">
              <h2 className="offers-title mb-1">Nos Offres Spéciales</h2>
              <p className="offers-subtitle text-muted mb-0">Découvrez nos promotions exclusives par catégorie</p>
            </div>
            <span className="offers-count-badge badge bg-white text-dark border">
              {filteredProducts.length} offre{filteredProducts.length > 1 ? "s" : ""} disponible{filteredProducts.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="offers-filter-buttons mt-3">
            {OFFER_CATEGORIES.map((cat) => {
              const count = cat.id === "all"
                ? promoProducts.length
                : promoProducts.filter((p) => p.category === cat.id).length;
              const isActive = filter === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`offer-filter-btn ${isActive ? "active" : ""}`}
                  onClick={() => setFilter(cat.id)}
                >
                  <span className="offer-filter-name">{cat.name}</span>
                  <span className="offer-filter-count">
                    {count} {count > 1 ? "promos" : "promo"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="product-grid mt-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ItemCard 
                key={product.id} 
                product={product} 
                handelAddtoCart={handelAddtoCart} 
              />
            ))
          ) : (
            <div className="no-offers-box text-center py-5">
              <p className="text-muted mb-0">Aucun produit en promotion pour cette catégorie actuellement.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Offers;
