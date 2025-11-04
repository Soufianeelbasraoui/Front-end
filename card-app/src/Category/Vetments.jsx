import React from "react";
import { Link } from "react-router-dom";
import  Featuredproducts from "../data/data1"
import { MdOutlineStar, MdStarHalf } from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import { GrView } from "react-icons/gr";
import "./Vetments.css";
import pmob1 from "../image/pmob.png"
import pmob2 from "../image/pmob2.png"
import pmob3 from "../image/pmob3.png"
import pmob4 from "../image/pmob4.webp"
//Électroniques
import pelck1 from "../image/pelck1.webp";
import pelck2 from "../image/pelck2.webp";
import pelck3 from "../image/pelck3.webp";
import pelck4 from "../image/pelck4.webp";
//vetment
import pvet1 from "../image/pvet1.webp";
import pvet2 from "../image/pvet2.webp";
import pvet3 from "../image/pvet3.webp";

function Vetments({ handelAddtoCart }) {
  const features = [
    {
      image: pmob1,
      title: "HEAVYWEIGHT COTTON",
      description: "Rugged heavyweight cotton only gets better with time"
    },
    {
      image: pmob1,
      title: "HEAVYWEIGHT COTTON",
      description: "Rugged heavyweight cotton only gets better with time"
    },
    
    {
      image:pelck1,
      title: "CREWNECK",
      description: "Rib-knit crewneck holds its shape throughout the workday"
    },
    {
      image:pelck2,
      title: "CHEST POCKET",
      description: "Durable chest pocket with sewn-on Carhartt patch keeps items close at hand"
    },
    {
      image:pelck3,
      title: "TAGLESS",
      description: "Tagless neck label for a smooth feel"
    },
    {
      image:pelck3,
      title: "TAGLESS",
      description: "Tagless neck label for a smooth feel"
    },
    {
      image:pelck3,
      title: "TAGLESS",
      description: "Tagless neck label for a smooth feel"
    },
     {
      image:pelck3,
      title: "TAGLESS",
      description: "Tagless neck label for a smooth feel"
    },
  ];
    const VetmentsFilter=Featuredproducts.filter((ele)=>ele.category==="Vêtements")
  return (
    <div>
       <div className="produits-vitement mt-2">
        
       </div>
      <div className="product-grid drid-vitement mt-5">
        {VetmentsFilter.map((product, index) => (
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

export default Vetments;
