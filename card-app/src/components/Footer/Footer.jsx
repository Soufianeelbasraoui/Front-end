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
        <div className="row">
         
          <div className="col-md-3 mb-4">
            <h5>Nos services</h5>
            <ul className="list-unstyled">
              <li><Link to="/services">Support client 24/7</Link></li>
              <li><Link to="/services">Livraison gratuite</Link></li>
              <li><Link to="/services">Paiement sécurisé</Link></li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Informations</h5>
            <ul className="list-unstyled">
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/home">Catégories</Link></li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Contactez-nous</h5>
            <ul className="list-unstyled footer-contact-info">
              <li>
                <i className="fa-solid fa-envelope"></i>
                <span>support@ecommerce.com</span>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <span>+212 7 77 11 76 02</span>
              </li>
              <li>
                <i className="fa-solid fa-location-dot"></i>
                <span>123 Rue du Commerce, Paris</span>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Suivez-nous</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="social-link"><CiFacebook className="social-icon" /> Facebook</a></li>
              <li><a href="#" className="social-link"><RxTwitterLogo className="social-icon" /> Twitter</a></li>
              <li><a href="#" className="social-link"><FaInstagram className="social-icon" /> Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-border text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} E-commerce. Tous droits réservés.</p>
          {messageFooter && <small className="d-block mt-2">{messageFooter}</small>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
