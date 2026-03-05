import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Featuredproducts from '../../data/featuredProducts';
import { MdOutlineStar, MdStarHalf } from 'react-icons/md';
import { GrView } from 'react-icons/gr';
import { LiaCartPlusSolid } from 'react-icons/lia';
import './Offers.css';

function Offers({ handelAddtoCart}) {
  const [filter, setFilter] = useState('all');
  const [cart, setCart] = useState([]);

  const filteredProducts = Featuredproducts.filter(product => 
    product.promo
  ).filter(product => 
    filter === 'all' ? true : product.category === filter
  );

  return (
    <div className="offers-container">
      <h2 className="offers-title">Nos Offres Spéciales</h2>
      
      <div className="filter-container">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Tous</button>
        <button className={`filter-btn ${filter === 'Électroniques' ? 'active' : ''}`} onClick={() => setFilter('Électroniques')}>Électroniques</button>
        <button className={`filter-btn ${filter === 'Meubles' ? 'active' : ''}`} onClick={() => setFilter('Meubles')}>Meubles</button>
        <button className={`filter-btn ${filter === 'Vêtements' ? 'active' : ''}`} onClick={() => setFilter('Vêtements')}>Vêtements</button>
        <button className={`filter-btn ${filter === 'Sacs et Bagages' ? 'active' : ''}`} onClick={() => setFilter('Sacs et Bagages')}>Sacs & Bagages</button>
      </div>
      
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              {product.promo && (
                <div className="product-badge">
                  <span className="promo-badge">{product.promo}</span>
                </div>
              )}
              
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image-container">
                  <img src={product.img} alt={product.title} className="product-image" />
                </div>
                <h3 className="product-title">{product.title}</h3>
              </Link>
              
              <div className="product-pricing">
                {product.prevPrice && (
                  <span className="old-price">{product.prevPrice}</span>
                )}
                <span className="current-price">{product.newPrice}</span>
              </div>
              
              <div className="product-meta">
                <div className="product-rating">
                  {[...Array(Math.floor(product.rating))].map((_, i) => (
                    <MdOutlineStar key={i} className="star-icon" />
                  ))}
                  {product.rating % 1 !== 0 && <MdStarHalf className="star-icon" />}
                  <span className="review-count">({product.reviews})</span>
                </div>
                
                <div className="product-actions">
                  <Link to={`/product/${product.id}`} className="view-button">
                    <GrView className="action-icon" />
                  </Link>
                  <button
                    className="cart-button"
                    onClick={(e) => {
                      e.preventDefault();
                      handelAddtoCart(product);
                    }}
                  >
                    <LiaCartPlusSolid className="action-icon" />
                  </button>
                </div>
              </div>
              
              <div className="product-shipping">{product.shipping}</div>
            </div>
          ))
        ) : (
          <p>Aucun produit en promotion pour cette catégorie.</p>
        )}
      </div>
    </div>
  );
}

export default Offers;
