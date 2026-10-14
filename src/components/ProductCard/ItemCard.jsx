import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineStar, MdStarHalf } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { LiaCartPlusSolid } from "react-icons/lia";
import formatPrice from "../../utils/formatPrice";
import "./ItemCard.css";

function ItemCard({ product, handelAddtoCart }) {
  if (!product) return null;

  const ratingValue = parseFloat(product.rating) || 4;
  const fullStars = Math.floor(ratingValue);
  const hasHalfStar = ratingValue % 1 !== 0;

  return (
    <div className="product-card">
      {product.promo && (
        <div className="product-badge">
          <span className="promo-badge">{product.promo}</span>
        </div>
      )}

      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img src={product.img} alt={product.title} className="product-image" />
        </div>
        <h3 className="product-title" title={product.title}>{product.title}</h3>
      </Link>

      <div className="product-pricing">
        {product.prevPrice && (
          <span className="old-price">{formatPrice(product.prevPrice)}</span>
        )}
        <span className="current-price">
          {formatPrice(product.newPrice || product.new_price || product.price)}
        </span>
      </div>

      <div className="product-meta">
        <div className="product-rating">
          {[...Array(fullStars)].map((_, i) => (
            <MdOutlineStar key={i} className="star-icon" />
          ))}
          {hasHalfStar && <MdStarHalf className="star-icon" />}
          {product.reviews && <span className="review-count">({product.reviews})</span>}
        </div>

        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="view-button" title="Voir détails">
            <GrView className="action-icon" />
          </Link>
          <button
            className="cart-button"
            title="Ajouter au panier"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handelAddtoCart(product);
            }}
          >
            <LiaCartPlusSolid className="action-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
