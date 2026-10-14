import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { Form, Button, Alert } from "react-bootstrap";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
    setSuccess("");
  };

  const validateEmail = () => {
    if (!email) {
      return "L'email est requis";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "L'email est invalide";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail();
    if (emailError) {
      setError(emailError);
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Password reset request for:", email);
      setSuccess("Un lien de réinitialisation a été envoyé à votre adresse email.");
      setEmail("");
    } catch (err) {
      setError("Échec de l'envoi du lien de réinitialisation. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">Mot de passe oublié</h2>
        <p className="forgot-password-subtitle">
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </p>

        {success && (
          <Alert variant="success" className="forgot-password-alert">
            {success}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="forgot-password-alert">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-4" controlId="formEmail">
            <div className="input-group">
              <span className="input-icon">
                <FaEnvelope />
              </span>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Adresse email"
                isInvalid={!!error}
                aria-label="Adresse email"
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="forgot-password-btn"
            disabled={isLoading}
            aria-label="Envoyer le lien de réinitialisation"
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              <FaPaperPlane className="me-2" />
            )}
            {isLoading ? "Envoi..." : "Envoyer"}
          </Button>
        </Form>

        <div className="forgot-password-footer">
          <p>
            Vous avez un compte ?{" "}
            <Link to="/Connecter" className="login-link">
              Se connecter
            </Link>
          </p>
          <p>
            Pas de compte ?{" "}
            <Link to="/S'inscrire" className="signup-link">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
