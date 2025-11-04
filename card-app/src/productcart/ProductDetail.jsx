
/*
import React from "react";
import { useParams } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import products from "../../../data/data";
import "./Product1.css"
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductDetail({ handelAddtoCart }) {
  const { id } = useParams();
  const product = products[id];

  if (!product) {
    return <h2 className="text-center mt-5">Produit introuvable</h2>;
  }

  return (
    <div className="container mt-5 ms-5">
      <div className="row">
   
        
        <div className="col-md-6 text-center">
          <img src={product.img} alt={product.title} className="card-img-top imgcard1" />
          
        </div>
       
      
        <div className="col-md-6">
          
          <h3>{product.title}</h3>
          <p><strong>Catégorie:</strong> {product.category}</p>

          <p>
            <strong>Prix:</strong>
            <span className="text-danger ms-2">{product.newPrice} </span>
            <del className="text-muted ms-2">{product.prevPrice}</del>
          </p>
          <p> <strong>Color:</strong>  {product.color}</p>
        
          <label>Qte:</label>
          <select name="" id="" className="qte-producte">
            <option value="">1</option>
             <option value="">2</option>
             <option value="">3</option>
             <option value="">4</option>
             <option value="">5</option>
             <option value="">6</option>
             <option value="">7</option>
          </select>
          <p>
            <FaStar className="text-warning" />
            <FaStar className="text-warning" />
            <FaStar className="text-warning" />
            <FaStar className="text-warning" />
            <FaStar className="text-secondary" /> ({product.reviews})
          </p>
       <div>
       {product.size.map((ele ,index)=>(
            <button key={index}>{ele.size}</button>
          ))}
       </div>
          <p><strong>Size: </strong>{product.size.join(', ')}</p>

     
          <button className="btn btn-warning w-100" onClick={() => handelAddtoCart(product)}>
            <FaShoppingCart className="me-2" /> Ajouter au panier
          </button> 
          <button className="btn btn-outline-secondary w-100 mt-2">
            <Link to="/home">RETOUR À LA BOUTIQUE</Link>
          </button>
          <span ><small className="mt-4"><CiDeliveryTruck className="me-2 icones"/>Livraison gratuite sur toutes les commandes</small></span>
          <span><small>Retour gratuitAjustement des prix</small></span>
        </div>
      </div>
     
    </div>
  );
}

export default ProductDetail;
*/


import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import products from "../data/data";
import Featuredproducts from "../data/data1";
import "./Product1.css";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Featuredproduit from "../data/data2";

function ProductDetail({ handelAddtoCart }) {
  const { id } = useParams();

  const allProducts = [...products, ...Featuredproducts,... Featuredproduit]; 
 const product = allProducts?.find((prod) => prod?.id?.toString() === id);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <h2 className="text-center mt-5">Produit introuvable</h2>;
  }

  return (
    <div className="container mt-5 ms-5">
      <div className="row">
        <div className="col-md-6 text-center">
          <img src={product.img} alt={product.title} className="card-img-top imgcard1" />
        </div>
       
        <div className="col-md-6">
          <h3>{product.title}</h3>
          <p><strong>Catégorie:</strong> {product.category}</p>

          <p>
            <strong>Prix:</strong>
            <span className="text-danger ms-2">{product.newPrice} DH</span>
            {product.prevPrice && (
              <del className="text-muted ms-2">{product.prevPrice} DH</del>
            )}
          </p>
          
          <p><strong>Couleur:</strong> {product.color}</p>
        
          <div className="mb-3">
            <label><strong>Quantité:</strong></label>
            <select 
              className="qte-producte"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <FaStar className="text-warning" />
            <FaStar className="text-warning" />
            <FaStar className="text-warning" />
            <FaStar className="text-warning" />
            <FaStar className="text-secondary" /> ({product.reviews})
          </div>

          {product.size && (
            <div className="mb-3">
              <strong>Taille:</strong>
              <div className="d-flex flex-wrap mt-2">
                {product.size.map((size, index) => (
                  <button
                    key={index}
                    className={`btn me-2 mb-2 ${selectedSize === size ? 'btn-dark' : 'btn-outline-dark'}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button 
            className="btn btn-warning w-100" 
            onClick={() => handelAddtoCart({...product, quantity, selectedSize})}
          >
            <FaShoppingCart className="me-2" /> Ajouter au panier
          </button> 

          <Link to="/produits" className="btn btn-outline-secondary w-100 mt-2">
            RETOUR À LA BOUTIQUE
          </Link>

          <div className="mt-4">
            <small><CiDeliveryTruck className="me-2 icones"/>Livraison gratuite sur toutes les commandes</small>
            <br />
            <small>Retour gratuit - Ajustement des prix</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

