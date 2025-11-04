import React from 'react';
import { Carousel } from 'react-bootstrap';
import './ProductCarousel.css';

import psacb1 from "../image/psacb1.webp";
import psacb2 from "../image/psacb2.webp";
import psacb3 from "../image/imgslider3.webp";
import { Link } from 'react-router-dom';


// Fonction pour grouper les produits par 5
const chunkProducts = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

const ProductCarousel = () => {
  const groupedProducts = chunkProducts(products, 5);

  return (
    <div className="product-carousel mt-4 m-5">
      <div className="carousel-header">
       <Link to="/Lesoffers" className='nav-link'> <span className="header-title">⚡ Choix du moment</span>
       <span className="header-subtitle">Offre à durée limitée ➔</span></Link>
      </div>
      <Carousel indicators={false} interval={null} className="custom-carousel mb-5">
        {groupedProducts.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="product-group">
              {group.map((product, idx) => (
                <div className="product-card" key={idx}>
                  <img src={product.image} alt={product.title} className="product-image" />
                  <div className="product-info">
                    <p className="product-title">{product.title}</p>
                    <div className="price-section">
                      <span className="current-price">{product.price}</span>
                      <span className="original-price">{product.originalPrice}</span>
                      <span className="discount">{product.discount}</span>
                    </div>
                <div className='time-lifet1'>
                 <span className="time-left">{product.timeLeft}</span>
                </div>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < product.rating ? 'star filled' : 'star'}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
