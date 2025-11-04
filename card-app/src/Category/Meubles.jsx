import React from "react";
import { Link } from "react-router-dom";
import  Featuredproducts from "../data/data1"
import { MdOutlineStar, MdStarHalf } from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import { GrView } from "react-icons/gr";
import "./Meubles.css";


function Meubles({ handelAddtoCart }) {
    const MeublesFilter=Featuredproducts.filter((ele)=>ele.category==="Meubles")
  return (
    <div>
      
      <div className="product-grid mt-5">
        {MeublesFilter.map((product, index) => (
          <div key={index} className="product-card">
           <Link to={`/product/${product.id}`}  className="text-decoration-none text-dark">
              <img src={product.img} alt={product.title} className="product-image" />
              <p className="product-title">{product.title}</p>
            </Link>
            <div className="product-price">
              {product.prevPrice && (
                <span className="old-price">{product.newPrice}</span>
              )}
              <span className="product-price1 ms-2">{product.prevPrice}</span>
              <span className="ms-1 reviews">{product.reviews}</span>
              <span className="ms-3">
                <Link to={`/product/${index}`} className="text-decoration-none text-dark view">
                  <GrView />
                </Link>
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
    </div>
  );
}

export default Meubles;
