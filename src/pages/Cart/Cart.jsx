import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaTrashAlt, 
  FaCreditCard, 
  FaMoneyBillWave, 
  FaPaypal, 
  FaShieldAlt, 
  FaTruck, 
  FaUndo, 
  FaShoppingBag, 
  FaArrowRight,
  FaTag
} from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { orderAPI } from "../../services/api";
import formatPrice from "../../utils/formatPrice";
import "./Cart.css";
import cartImg from "../../assets/images/cart.png";

function Cart({ painer = [], handeleRemove }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const [quantities, setQuantities] = useState(
    painer.reduce((acc, item, index) => {
      acc[index] = item.quantity || 1;
      return acc;
    }, {})
  );

  const getNumericPrice = (val) => {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    const cleaned = String(val).replace(/[^0-9.]/g, '');
    return parseFloat(cleaned) || 0;
  };

  const sousTotal = painer.reduce((total, item, index) => {
    const price = getNumericPrice(item.newPrice || item.new_price || item.price);
    const qty = quantities[index] || 1;
    return total + price * qty;
  }, 0);

  const totalFinal = Math.max(0, sousTotal - discount);

  const handleQuantityChange = (index, value) => {
    const newValue = Math.max(1, Math.min(10, parseInt(value) || 1));
    setQuantities((prev) => ({
      ...prev,
      [index]: newValue,
    }));
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    const code = promoCode.trim().toUpperCase();
    if (code === "PROMO10" || code === "SOLDE10") {
      setDiscount(sousTotal * 0.1);
      setPromoApplied(true);
    } else if (code === "VIP20") {
      setDiscount(sousTotal * 0.2);
      setPromoApplied(true);
    } else if (!code) {
      setPromoError("Veuillez saisir un code.");
    } else {
      setPromoError("Code invalide ou expiré.");
    }
  };

  const handlePaymentSubmit = async () => {
    try {
      const orderData = {
        total: totalFinal,
        payment_method: paymentMethod || "card",
        items: painer.map((item, index) => ({
          title: item.title,
          price: getNumericPrice(item.newPrice || item.new_price || item.price),
          quantity: quantities[index] || 1,
          selected_size: item.selectedSize || null,
          img: item.img || null,
          product_id: item.id || null,
        })),
      };
      const res = await orderAPI.create(orderData);
      toast.success(`Commande n°${res.data.id} confirmée avec succès !`);
      setShowPaymentModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'enregistrement de la commande.");
    }
  };

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        <div className="checkout-steps-bar">
          <div className="step-item active">
            <span className="step-circle">1</span>
            <span className="step-label">Panier</span>
          </div>
          <div className="step-connector"></div>
          <div className="step-item">
            <span className="step-circle">2</span>
            <span className="step-label">Livraison</span>
          </div>
          <div className="step-connector"></div>
          <div className="step-item">
            <span className="step-circle">3</span>
            <span className="step-label">Paiement</span>
          </div>
        </div>

        <div className="cart-header-title">
          <div className="header-text-group">
            <h1>Mon Panier</h1>
            <span className="cart-count-badge">
              <FaShoppingBag className="me-1" />
              {painer.length} {painer.length > 1 ? "articles" : "article"}
            </span>
          </div>
          {painer.length > 0 && (
            <Link to="/produits" className="back-to-shop-link">
              Continuer mes achats <FaArrowRight className="ms-1" />
            </Link>
          )}
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {painer.length === 0 ? (
              <div className="empty-cart-card">
                <div className="empty-cart-icon-wrap">
                  <img src={cartImg} alt="Panier vide" className="empty-cart-img" />
                </div>
                <h3>Votre panier est vide</h3>
                <p>Découvrez notre catalogue et ajoutez vos articles favoris en quelques clics.</p>
                <Link to="/produits" className="empty-cart-action-btn">
                  Explorer les produits <FaArrowRight className="ms-2" />
                </Link>
              </div>
            ) : (
              <div className="items-list-card">
                {painer.map((item, index) => {
                  const unitPrice = getNumericPrice(item.newPrice || item.new_price || item.price);
                  const currentQty = quantities[index] || 1;
                  const itemTotal = unitPrice * currentQty;

                  return (
                    <div key={index} className="cart-item-row">
                      <Link to={item.id ? `/product/${item.id}` : '#'} className="item-thumb-wrapper">
                        <img src={item.img} alt={item.title} />
                      </Link>

                      <div className="item-main-info">
                        <span className="item-category-tag">{item.category || "Produit"}</span>
                        <Link to={item.id ? `/product/${item.id}` : '#'} className="item-title-link">
                          <h4 className="item-name">{item.title}</h4>
                        </Link>
                        {item.selectedSize && (
                          <span className="item-pill">Taille : {item.selectedSize}</span>
                        )}
                        <div className="item-unit-price">
                          Prix unitaire : <strong>{formatPrice(unitPrice)}</strong>
                        </div>
                      </div>

                      <div className="item-quantity-wrapper">
                        <label className="qty-label">Quantité</label>
                        <div className="quantity-stepper">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(index, currentQty - 1)}
                            disabled={currentQty <= 1}
                            aria-label="Diminuer la quantité"
                          >
                            −
                          </button>
                          <span className="qty-number">{currentQty}</span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(index, currentQty + 1)}
                            disabled={currentQty >= 10}
                            aria-label="Augmenter la quantité"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="item-total-wrapper">
                        <span className="total-label">Total</span>
                        <span className="item-total-price">{formatPrice(itemTotal.toFixed(2))}</span>
                        <button
                          type="button"
                          className="remove-item-btn"
                          onClick={() => handeleRemove(index)}
                          title="Supprimer cet article"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {painer.length > 0 && (
            <div className="cart-summary-col">
              <div className="summary-card-modern">
                <h3 className="summary-title">Récapitulatif de commande</h3>

                <div className="summary-breakdown">
                  <div className="breakdown-row">
                    <span>Sous-total ({painer.length} articles)</span>
                    <span className="val">{formatPrice(sousTotal.toFixed(2))}</span>
                  </div>

                  <div className="breakdown-row">
                    <span>Frais de livraison</span>
                    <span className="val shipping-free">Inclus</span>
                  </div>

                  {discount > 0 && (
                    <div className="breakdown-row discount-row">
                      <span>Remise appliquée</span>
                      <span className="val text-success">- {formatPrice(discount.toFixed(2))}</span>
                    </div>
                  )}

                  <div className="promo-code-section">
                    <form onSubmit={handleApplyPromo} className="promo-input-group">
                      <div className="promo-input-box">
                        <FaTag className="promo-icon" />
                        <input
                          type="text"
                          placeholder="Code promo (ex: PROMO10)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="apply-promo-btn">
                        Appliquer
                      </button>
                    </form>
                    {promoApplied && (
                      <span className="promo-success-msg">Code appliqué avec succès !</span>
                    )}
                    {promoError && (
                      <span className="promo-error-msg">{promoError}</span>
                    )}
                  </div>

                  <div className="summary-divider-line"></div>

                  <div className="summary-final-total">
                    <div className="total-text-group">
                      <span className="total-text">Total TTC</span>
                      <small className="taxes-note">TVA incluse</small>
                    </div>
                    <span className="total-price-highlight">
                      {formatPrice(totalFinal.toFixed(2))}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="main-checkout-btn"
                  onClick={() => setShowPaymentModal(true)}
                >
                  Passer la commande
                </button>

                <div className="trust-badges-grid">
                  <div className="trust-badge-item">
                    <FaShieldAlt className="trust-icon" />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                  <div className="trust-badge-item">
                    <FaTruck className="trust-icon" />
                    <span>Livraison rapide partout</span>
                  </div>
                  <div className="trust-badge-item">
                    <FaUndo className="trust-icon" />
                    <span>Retours faciles sous 14j</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Modal
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
          centered
          className="payment-modal-modern"
        >
          <Modal.Header closeButton>
            <Modal.Title>Choisissez votre mode de paiement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="payment-options-list">
              <div
                className={`payment-option-card ${paymentMethod === "card" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("card")}
              >
                <div className="method-icon-wrap card-icon">
                  <FaCreditCard />
                </div>
                <div className="method-text">
                  <h6>Carte bancaire</h6>
                  <p>Visa, MasterCard, CMI sécurisé</p>
                </div>
                <div className="custom-radio"></div>
              </div>

              <div
                className={`payment-option-card ${paymentMethod === "paypal" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("paypal")}
              >
                <div className="method-icon-wrap paypal-icon">
                  <FaPaypal />
                </div>
                <div className="method-text">
                  <h6>PayPal</h6>
                  <p>Règlement rapide via votre compte</p>
                </div>
                <div className="custom-radio"></div>
              </div>

              <div
                className={`payment-option-card ${paymentMethod === "cash" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("cash")}
              >
                <div className="method-icon-wrap cash-icon">
                  <FaMoneyBillWave />
                </div>
                <div className="method-text">
                  <h6>Paiement à la livraison</h6>
                  <p>Réglez en espèces à la réception</p>
                </div>
                <div className="custom-radio"></div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              className="modal-cancel-btn"
              onClick={() => setShowPaymentModal(false)}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              className="modal-confirm-btn"
              onClick={handlePaymentSubmit}
              disabled={!paymentMethod}
            >
              Confirmer ({formatPrice(totalFinal.toFixed(2))})
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Cart;
