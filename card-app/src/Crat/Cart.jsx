import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import "./Cart.css";
import cart from "../image/cart.png";

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
    // Ici vous pourriez ajouter la logique de traitement du paiement
    alert(
      `Paiement ${paymentMethod} effectué pour un total de ${totalPrix.toFixed(
        2
      )} DH`
    );
    setShowPaymentModal(false);
  };

  return (
    <div className="container py-5">
    

      <div className="row g-4">
        <div className="col-lg-8">
          {painer.length === 0 ? (
            <div className="card shadow-sm border-0">
              <div className="card-body text-center p-5">
                <img
                  src={cart}
                  alt="Panier vide"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "200px", opacity: 0.7 }}
                />
                <h4 className="mb-3">Votre panier est vide</h4>
                <p className="text-muted mb-4">
                  Parcourez nos collections et trouvez des articles qui vous plaisent
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <Link to="/produits" className="btn btn-outline-primary px-4">
                    Continuer vos achats
                  </Link>
                  <div className="dropdown">
                    <button
                      className="btn btn-warning dropdown-toggle"
                      type="button"
                      id="authDropdown"
                      data-bs-toggle="dropdown"
                    >
                      Connexion/Inscription
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/Connecter" className="dropdown-item">
                          Se connecter
                        </Link>
                      </li>
                      <li>
                        <Link to="/S'inscrire" className="dropdown-item">
                          S'inscrire
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm border-0">
              <ul className="list-group list-group-flush">
                {painer.map((item, index) => (
                  <li key={index} className="list-group-item py-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="rounded me-3"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                      />
                      <div className="flex-grow-1">
                        <h5 className="mb-1">{item.title}</h5>
                        {item.selectedSize && (
                          <div className="text-muted small mb-1">
                            Taille: {item.selectedSize}
                          </div>
                        )}
                        <div className="d-flex align-items-center">
                          <div className="input-group me-3" style={{ width: "120px" }}>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() =>
                                handleQuantityChange(index, quantities[index] - 1)
                              }
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="form-control form-control-sm text-center"
                              value={quantities[index]}
                              min={1}
                              max={10}
                              onChange={(e) =>
                                handleQuantityChange(index, e.target.value)
                              }
                            />
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() =>
                                handleQuantityChange(index, quantities[index] + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold text-success mb-2">
                          {(
                            parseFloat(item.newPrice.replace("DH", "").trim()) *
                            quantities[index]
                          ).toFixed(2)}{" "}
                          DH
                        </div>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handeleRemove(index)}
                          title="Supprimer"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {painer.length > 0 && (
          <div className="col-lg-4">
            <div
              className="card shadow-sm border-0 sticky-top"
              style={{ top: "20px" }}
            >
              <div className="card-body">
                <h5 className="card-title mb-3">Récapitulatif de commande</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span>Sous-total</span>
                  <span>{totalPrix.toFixed(2)} DH</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Livraison</span>
                  <span className="text-success">Gratuite</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                  <span>Total</span>
                  <span className="text-primary">{totalPrix.toFixed(2)} DH</span>
                </div>

                <button
                  className="btn btn-success w-100 py-2 mb-2"
                  onClick={() => setShowPaymentModal(true)}
                >
                  Passer la commande
                </button>

                <Link
                  to="/home"
                  className="btn btn-outline-secondary w-100 py-2"
                >
                  Continuer mes achats
                </Link>
              </div>
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
          <div className="payment-methods">
            <div
              className={`payment-option ${
                paymentMethod === "card" ? "selected" : ""
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <div className="payment-icon">
                <FaCreditCard size={24} />
              </div>
              <div className="payment-details">
                <h6>Carte bancaire</h6>
                <p className="text-muted small">
                  Paiement sécurisé par carte de crédit/débit
                </p>
              </div>
            </div>

            <div
              className={`payment-option ${
                paymentMethod === "cash" ? "selected" : ""
              }`}
              onClick={() => setPaymentMethod("cash")}
            >
              <div className="payment-icon">
                <FaMoneyBillWave size={24} />
              </div>
              <div className="payment-details">
                <h6>Paiement à la livraison</h6>
                <p className="text-muted small">
                  Payez lorsque vous recevez votre commande
                </p>
              </div>
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