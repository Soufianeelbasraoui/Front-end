import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaGoogle } from "react-icons/fa";
import { Form, Button, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import "./Register.css";
import "../Auth/Login.css";

function Register() {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSignupError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName || !formData.fullName.trim()) {
      newErrors.fullName = "Le nom complet est requis";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Le nom doit contenir au moins 2 caractères";
    }
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "L'email est invalide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 4) {
      newErrors.password = "Le mot de passe doit contenir au moins 4 caractères";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "La confirmation du mot de passe est requise";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
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
      const res = await register(
        formData.fullName.trim(),
        formData.email.trim().toLowerCase(),
        formData.password
      );
      toast.success("Compte créé avec succès ! Bienvenue " + (res?.user?.name || ""));
      if (res?.user?.role === 'admin' || formData.email.toLowerCase().includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      const message = error.response?.data?.message || 
        error.response?.data?.errors?.email?.[0] || 
        "Échec de l'inscription. Cet email est peut-être déjà utilisé.";
      setSignupError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sinscrire-container">
      <div className="sinscrire-card">
        <h2 className="sinscrire-title">S'inscrire</h2>
        {signupError && (
          <Alert variant="danger" className="sinscrire-alert">
            {signupError}
          </Alert>
        )}
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-4" controlId="formFullName">
            <div className="input-group">
              <span className="input-icon">
                <FaUser />
              </span>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nom complet"
                isInvalid={!!errors.fullName}
                aria-label="Nom complet"
                autoComplete="name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

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
                autoComplete="new-password"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formConfirmPassword">
            <div className="input-group">
              <span className="input-icon">
                <FaLock />
              </span>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmer le mot de passe"
                isInvalid={!!errors.confirmPassword}
                aria-label="Confirmer le mot de passe"
                autoComplete="new-password"
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Button
            type="submit"
            className="sinscrire-button w-100"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              <FaUserPlus className="me-2" />
            )}
            {loading ? "Création du compte..." : "Créer un compte"}
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
          S'inscrire avec Google
        </Button>

        <div className="sinscrire-footer">
          <p>
            Vous avez déjà un compte ?{" "}
            <Link to="/connecter" className="login-link">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
