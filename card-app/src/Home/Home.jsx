import React from "react";
import { Link } from "react-router-dom";
import products from "../data/data";
import { MdOutlineStar, MdStarHalf } from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import PromoSlider from "./PromoSlider/Slider";
import Topcategory from "./Topcategory/Topcategory";
import "./Home.css";
import ProductsFeatured from "../Featuredproducts/Featuredp";

function Products({ handelAddtoCart }) {
  const groupProducts = (products, size) => {
    const result = [];
    for (let i = 0; i < products.length; i += size) {
      result.push(products.slice(i, i + size));
    }
    return result;
  };

  const grouped = groupProducts(products, 6);

  return (
    <div>
      <PromoSlider />
      <Topcategory />
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

export default Products;