import React from "react";
import { Link } from "react-router-dom";
import PromoSlider from "../../components/PromoSlider/PromoSlider";
import TopCategory from "../../components/TopCategory/TopCategory";
import "./Home.css";
import ProductsFeatured from "../FeaturedProducts/FeaturedProducts";

function Home({ handelAddtoCart }) {
  return (
    <div>
      <PromoSlider />
      <TopCategory />
      <ProductsFeatured  handelAddtoCart={handelAddtoCart}  />

  
      <hr className="mt-5" />
      <div className="container text-center py-4">
        <h5>Voir les recommandations personnalisées</h5>
        <Link to="/connecter" className="btn btn-warning my-2">Se connecter</Link>
        <p className="small mt-2">
          Nouveau client? <Link to="/S'inscrire">Commencez ici.</Link>
        </p>
      </div>
      <hr />
    </div>
  );
}

export default Home;
