import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import { MdOutlineSupportAgent } from 'react-icons/md';

import "./Contact.css"

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Votre message a été envoyé avec succès !');
  };

  return (
    <div className="contact-page">
      <div className="contact-container mt-5">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon"><FaMapMarkerAlt /></div>
            <h3>Adresse</h3>
            <p>123 Avenue Mohammed VI, Casablanca, Maroc</p>
          </div>
          <div className="info-card">
            <div className="info-icon"><FaPhoneAlt /></div>
            <h3>Téléphone</h3>
            <p>+212 6 12 34 56 78</p>
            <p>+212 5 22 33 44 55</p>
          </div>
          <div className="info-card">
            <div className="info-icon"><FaEnvelope /></div>
            <h3>Email</h3>
            <p>contact@votreboutique.com</p>
            <p>support@votreboutique.com</p>
          </div>
          <div className="info-card">
            <div className="info-icon"><FaClock /></div>
            <h3>Heures d'ouverture</h3>
            <p>Lundi - Vendredi: 9h - 19h</p>
            <p>Samedi: 10h - 16h</p>
          </div>
        </div>

        <div className="contact-form-container">
          <div className="form-header">
            <div className="form-icon"><MdOutlineSupportAgent /></div>
            <h2>Service client 24/7</h2>
            <p>Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les plus brefs délais</p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group"><input type="text" placeholder="Votre nom complet" required /></div>
            <div className="form-group"><input type="email" placeholder="Votre adresse email" required /></div>
            <div className="form-group"><input type="tel" placeholder="Votre numéro de téléphone" /></div>
            <div className="form-group">
              <select required>
                <option value="">Sujet de votre message</option>
                <option value="commande">Question sur une commande</option>
                <option value="produit">Question sur un produit</option>
                <option value="retour">Retour ou échange</option>
                <option value="autre">Autre question</option>
              </select>
            </div>
            <div className="form-group"><textarea placeholder="Votre message..." rows="5" required></textarea></div>
            <button type="submit" className="submit-btn">Envoyer le message <FaPaperPlane className="btn-icon" /></button>
          </form>
        </div>
      </div>

      <div className="map-container">
        <iframe 
          title="Localisation"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.349646143043!2d-7.632913684798475!3d33.59624978073238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d3731f922c01%3A0x5e46c1e1fc83142d!2sAvenue%20Mohammed%20VI%2C%20Casablanca!5e0!3m2!1sen!2sma!4v1620000000000!5m2!1sen!2sma" 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
