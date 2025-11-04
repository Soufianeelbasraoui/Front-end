import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineStar, MdStarHalf } from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import Featuredproduit from "../data/data2";
import { GrView } from "react-icons/gr";
import "./Featuredp.css";
import featurp2 from "../image/featurp2.webp";
import featurp1 from "../image/featurp1.webp";

function ProductsFeatured({handelAddtoCart }) {
  return (
    <div>
      <div className="Featured-products">
        <h5 className="ms-3">Featured products</h5>
        <Link to="/produits" className="me-4 auth-link nav-link">View All</Link>
      </div>

      <div className="product-grid">
        {Featuredproduit.map((product, index) => (
          <div key={index} className="product-card">
          <Link to={`/product/${product.id}`}  className="text-decoration-none text-dark">
                        <img src={product.img} alt={product.title} className="product-image" />
                        <p className="product-title">{product.title}</p>
                      </Link>
            <div className="product-price">
              {product.prevPrice && (
                <span className="old-price">{product.prevPrice}</span>
              )}
              <span className="product-price1 ms-2">{product.newPrice}</span>
              <span className="ms-1 reviews">{product.reviews}</span>
              <span className="ms-3">
                <p className="promo1">{product.promo}</p> 
              </span>
            </div>

            <div className="star-icon mt-3">
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdStarHalf />
              <button
              className="btn1"
               onClick={(e) => {
                  e.preventDefault();
                  handelAddtoCart(product);
                }}
            >
              <LiaCartPlusSolid className="icon-cart" />
            </button>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="featur_produits">
            <div className="div-text">
              <h4>Grand Tapis de Bureau <span>25% OFF</span></h4>
              <small>Grand Tapis de Bureau en Similicuir Imperméable</small>
            </div>
            <div className="div-prix">
              <del className="delspan">213 DH</del>
              <span className="delspan span1">173 DH</span>
            <Link to="/produits">
              <button className="btn btn-warning mt-2">Shop Now</button>
            </Link>
            </div>
            <div>
              <img src={featurp1} alt="Tapis de bureau" />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="featur_produits">
            <div className="div-text">
              <h4>Sac à Main pour Homme <span>41% OFF</span></h4>
              <small>Ensemble de 2 pièces, Sac à Main pour Homme</small>
            </div>
            <div className="div-prix">
              <del className="delspan">536 DH</del>
              <span className="delspan span1">432 DH</span>
             <Link to="/produits">
              <button className="btn btn-danger mt-2">Shop Now</button>
             </Link>
            </div>
            <div>
              <img src={featurp2} alt="Sac à main homme" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsFeatured;
