import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp ,FaInstagram} from "react-icons/fa6";
import { RxTwitterLogo } from "react-icons/rx";
import { CiFacebook } from "react-icons/ci";
import "./Footer.css"
const Footer = ({ messageFooter }) => {
  return (

    <footer className="footer mt-5">
      <div className="container">
        <div className="row text-start">
          {/* Services */}
          <div className="col-md-3 mb-4">
            <h5>Nos services</h5>
            <ul className="list-unstyled">
              <li><Link to="/services" className="text-decoration-none">Support client 24/7</Link></li>
              <li><Link to="/services" className="text-decoration-none">Livraison gratuite</Link></li>
              <li><Link to="/services" className="text-decoration-none">Paiement sécurisé</Link></li>
              <li><Link to="/services" className="text-decoration-none">Offres exclusives</Link></li>
            </ul>
          </div>

          {/* Informations */}
          <div className="col-md-3 mb-4">
            <h5>Informations</h5>
            <ul className="list-unstyled">
              <li><Link to="/home" className="text-decoration-none">Boutique</Link></li>
              <li><Link to="/services" className="text-decoration-none">Services</Link></li>
              <li><Link to="/contact" className="text-decoration-none">Contact</Link></li>
              <li><Link to="/home" className="text-decoration-none">Catégories</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h5>Contactez-nous</h5>
            <ul className="list-unstyled">
              <li><i className="fa-solid fa-envelope me-2"></i> support@ecommerce.com</li>
              <li><i className="fa-solid fa-phone me-2"></i> +212 7 77 11 76 02</li>
              <li><i className="fa-solid fa-location-dot me-2"></i> 123 Rue du Commerce, Paris</li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div className="col-md-3 mb-4">
            <h5>Suivez-nous</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none social-link"><CiFacebook className="social-icon" /> Facebook</a></li>
              <li><a href="#" className="text-decoration-none social-link"><RxTwitterLogo className="social-icon" /> Twitter</a></li>
              <li><a href="#" className="text-decoration-none social-link"><FaInstagram className="social-icon" /> Instagram</a></li>
              <li><a href="#" className="text-decoration-none social-link"><FaWhatsapp className="social-icon" /> WhatsApp</a></li>
            </ul>
          </div>
        </div>

        {/* Bas de page */}
        <div className="footer-border text-center">
          <p className="mb-0">&copy; 2025 E-commerce. Tous droits réservés.</p>
          {messageFooter && <small className="d-block mt-2">{messageFooter}</small>}
        </div>
      </div>
    </footer>
 


  );
};

export default Footer;
