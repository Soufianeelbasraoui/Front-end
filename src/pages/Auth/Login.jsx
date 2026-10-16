import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt, FaGoogle } from "react-icons/fa";
import { Form, Button, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "L'email est invalide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 4) {
      newErrors.password = "Le mot de passe doit contenir au moins 4 caractères";
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
      const data = await login(formData.email.trim(), formData.password);
      toast.success("Connexion réussie ! Bienvenue " + (data.user?.name || ""));
      
      const userRole = data.user?.role || (formData.email.toLowerCase().includes('admin') ? 'admin' : 'user');
      const originPath = location.state?.from?.pathname;

      if (originPath && originPath !== '/Connecter' && originPath !== '/connecter') {
        if (originPath.startsWith('/admin') && userRole !== 'admin') {
          navigate('/dashboard');
        } else {
          navigate(originPath);
        }
      } else if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      const message = error.response?.data?.message || "Email ou mot de passe incorrect.";
      setLoginError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="connecter-container">
      <div className="connecter-card">
        <h2 className="connecter-title">Se connecter</h2>

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
                autoComplete="email"
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
                autoComplete="current-password"
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
            className="connecter-button w-100"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              <FaSignInAlt className="me-2" />
            )}
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </Form>

        <div className="connecter-separator">
          <span>OU</span>
        </div>

        <Button
          type="button"
          variant="outline-secondary"
          className="google-button w-100 mb-4"
          onClick={loginWithGoogle}
          disabled={loading}
        >
          <FaGoogle className="me-2 text-danger" />
          Continuer avec Google
        </Button>

        <div className="connecter-footer">
          <p>
            Vous n'avez pas de compte ?{" "}
            <Link to="/sinscrire" className="signup-link">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
