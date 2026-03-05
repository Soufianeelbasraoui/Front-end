import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaCreditCard, FaMoneyBillWave, FaPaypal } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import formatPrice from "../../utils/formatPrice";
import "./Cart.css";
import cartImg from "../../assets/images/cart.png";

function Cart({ painer, handeleRemove }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [quantities, setQuantities] = useState(
    painer.reduce((acc, item, index) => {
      acc[index] = item.quantity || 1;
      return acc;
    }, {})
  );

  const totalPrix = painer.reduce((total, item, index) => {

    const price = parseFloat(item.newPrice.replace("DH", "").trim()) || 0;
    return total + price * quantities[index];
  }, 0);

  const handleQuantityChange = (index, value) => {
    const newValue = Math.max(1, Math.min(10, parseInt(value) || 1));
    setQuantities((prev) => ({
      ...prev,
      [index]: newValue,
    }));
  };

  const handlePaymentSubmit = () => {
    alert(
      `Paiement ${paymentMethod} effectué pour un total de ${totalPrix.toFixed(
        2
      )} DH`
    );
    setShowPaymentModal(false);
  };

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-items">
          {painer.length === 0 ? (
            <div className="empty-cart">
              <img
                src={cartImg}
                alt="Panier vide"
                className="empty-cart-img"
              />
              <h3>Votre panier est vide</h3>
              <p>Parcourez nos collections et trouvez des articles qui vous plaisent</p>
              <Link to="/produits" className="checkout-btn" style={{ display: 'inline-block', width: 'auto', textDecoration: 'none' }}>
                Continuer mes achats
              </Link>
            </div>
          ) : (
            <div className="items-list">
              {painer.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="item-image">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className="item-details">
                    <h4>{item.title}</h4>
                    {item.selectedSize && (
                      <p className="item-size">Taille: {item.selectedSize}</p>
                    )}
                    <p className="item-price">{formatPrice(item.newPrice)}</p>
                    <div className="quantity-control">
                      <button
                        onClick={() => handleQuantityChange(index, quantities[index] - 1)}
                        disabled={quantities[index] <= 1}
                      >
                        -
                      </button>
                      <span>{quantities[index]}</span>
                      <button
                        onClick={() => handleQuantityChange(index, quantities[index] + 1)}
                        disabled={quantities[index] >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="item-actions">
                    <div className="item-total">
                      {formatPrice(
                        (parseFloat(item.newPrice.replace("DH", "").trim()) * quantities[index]).toFixed(2)
                      )}
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handeleRemove(index)}
                      title="Supprimer"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {painer.length > 0 && (
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Récapitulatif</h3>
              <div className="summary-row">
                <span>Sous-total</span>
                <span>{formatPrice(totalPrix.toFixed(2))}</span>
              </div>
              <div className="summary-row">
                <span>Livraison</span>
                <span className="free-shipping">Gratuite</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-total">
                <span>Total</span>
                <span>{formatPrice(totalPrix.toFixed(2))}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={() => setShowPaymentModal(true)}
              >
                Passer la commande
              </button>
              <Link to="/home" className="continue-shopping">
                Continuer mes achats
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Modal de paiement */}
      <Modal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Méthode de paiement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="payment-options">
            <div
              className={`payment-method ${
                paymentMethod === "card" ? "selected" : ""
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <div className="method-icon">
                <FaCreditCard size={24} />
              </div>
              <div className="method-info">
                <h6>Carte bancaire</h6>
                <p className="text-muted small">
                  Paiement sécurisé par carte de crédit/débit
                </p>
              </div>
              <div className="method-check"></div>
            </div>

            <div
              className={`payment-method ${
                paymentMethod === "paypal" ? "selected" : ""
              }`}
              onClick={() => setPaymentMethod("paypal")}
            >
              <div className="method-icon">
                <FaPaypal size={24} />
              </div>
              <div className="method-info">
                <h6>PayPal</h6>
                <p className="text-muted small">
                  Paiement rapide et sécurisé via votre compte PayPal
                </p>
              </div>
              <div className="method-check"></div>
            </div>

            <div
              className={`payment-method ${
                paymentMethod === "cash" ? "selected" : ""
              }`}
              onClick={() => setPaymentMethod("cash")}
            >
              <div className="method-icon">
                <FaMoneyBillWave size={24} />
              </div>
              <div className="method-info">
                <h6>Paiement à la livraison</h6>
                <p className="text-muted small">
                  Payez lorsque vous recevez votre commande
                </p>
              </div>
              <div className="method-check"></div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPaymentModal(false)}
          >
            Annuler
          </Button>
          <Button
            variant="success"
            onClick={handlePaymentSubmit}
            disabled={!paymentMethod}
          >
            Confirmer le paiement
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Cart;
