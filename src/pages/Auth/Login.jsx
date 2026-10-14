import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt, FaGoogle } from "react-icons/fa";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setLoginError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email est invalide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const data = await login(formData.email, formData.password);
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.errors?.email?.[0] || "Échec de la connexion. Vérifiez vos identifiants.";
      setLoginError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (email, password) => {
    setFormData({ email, password });
    try {
      setLoading(true);
      const data = await login(email, password);
      if (data.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setLoginError("Échec de la connexion démo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="connecter-container">
      <div className="connecter-card">
        <h2 className="connecter-title">Se connecter</h2>

        <div className="demo-credentials-box">
          <p className="demo-hint">Connexion rapide :</p>
          <div className="demo-btn-group">
            <button
              type="button"
              className="demo-badge-btn admin"
              onClick={() => handleQuickLogin('admin@example.com', 'admin')}
              disabled={loading}
            >
              👑 Admin (Dashboard)
            </button>
            <button
              type="button"
              className="demo-badge-btn user"
              onClick={() => handleQuickLogin('user@example.com', 'user')}
              disabled={loading}
            >
              👤 Client (Profil)
            </button>
          </div>
        </div>

        {loginError && (
          <Alert variant="danger" className="connecter-alert">
            {loginError}
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
                value={formData.email}
                onChange={handleChange}
                placeholder="Adresse email"
                isInvalid={!!errors.email}
                aria-label="Adresse email"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <div className="input-group">
              <span className="input-icon">
                <FaLock />
              </span>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                isInvalid={!!errors.password}
                aria-label="Mot de passe"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <div className="connecter-links mb-4">
            <Link to="/MotDePasseOublie" className="forgot-password">
              Mot de passe oublié ?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="connecter-btn"
            aria-label="Se connecter"
            disabled={loading}
          >
            <FaSignInAlt className="me-2" />
            {loading ? "Connexion..." : "Se connecter"}
          </Button>

          <div className="divider">
            <span>ou</span>
          </div>

          <Button
            type="button"
            variant="outline-dark"
            className="google-btn"
            onClick={loginWithGoogle}
          >
            <FaGoogle className="me-2" style={{ color: '#ea4335' }} />
            Se connecter avec Google
          </Button>
        </Form>

        <div className="connecter-footer">
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

export default Login;
