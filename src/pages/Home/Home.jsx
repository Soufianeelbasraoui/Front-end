import React from "react";
import { Link } from "react-router-dom";
import PromoSlider from "../../components/PromoSlider/PromoSlider";
import TopCategory from "../../components/TopCategory/TopCategory";
import ProductsFeatured from "../FeaturedProducts/FeaturedProducts";
import "./Home.css";

function Home({ handelAddtoCart }) {
  return (
    <div className="home-container">
      <PromoSlider />
      <TopCategory />

      <div className="container my-4">
        <div className="home-cta-banner">
          <div className="home-cta-content">
            <span className="badge bg-danger mb-2">PROMOTIONS EXCLUSIVES</span>
            <h3 className="home-cta-title">Nos Offres Spéciales du Moment</h3>
            <p className="home-cta-desc">
              Économisez jusqu'à -50% sur une sélection de produits de grandes marques. Offres à durée limitée !
            </p>
          </div>
          <Link to="/Lesoffers" className="home-cta-btn-wrap">
            <button className="btn btn-warning px-4 py-3 fw-bold home-cta-btn">
              Voir Toutes les Offres →
            </button>
          </Link>
        </div>
      </div>

      <ProductsFeatured handelAddtoCart={handelAddtoCart} />
    </div>
  );
}

export default Home;
