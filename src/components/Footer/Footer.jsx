import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";
import { CiFacebook, CiMail, CiPhone, CiLocationOn } from "react-icons/ci";
import Logo from "../Brand/Logo";
import "./Footer.css";

const Footer = ({ messageFooter }) => {
  return (
    <footer className="footer mt-5">
      <div className="container footer-main-content">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand mb-3">
              <Logo light={true} size="md" showTagline={true} />
            </div>
            <p className="footer-desc">
              ClickStore est votre boutique en ligne de référence pour des collections tendance, du matériel électronique haut de gamme et du mobilier moderne au meilleur prix.
            </p>
            <div className="footer-badges">
              <span className="pay-badge">Paiement à la livraison</span>
              <span className="pay-badge">Carte Bancaire / CMI</span>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <h5>Navigation</h5>
            <ul className="footer-links">
              <li><Link to="/home">Accueil</Link></li>
              <li><Link to="/produits">Nos Produits</Link></li>
              <li><Link to="/Lesoffers">Offres Spéciales</Link></li>
              <li><Link to="/services">Services Client</Link></li>
              <li><Link to="/contact">Contactez-nous</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-6">
            <h5>Catégories</h5>
            <ul className="footer-links">
              <li><Link to="/vetments">Mode & Vêtements</Link></li>
              <li><Link to="/Electroniques">Électronique & High-Tech</Link></li>
              <li><Link to="/meubles">Maison & Meubles</Link></li>
              <li><Link to="/Sacetbagage">Sacs & Maroquinerie</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5>Contact & Support</h5>
            <ul className="footer-contact-info">
              <li>
                <CiLocationOn className="contact-ico" />
                <span>Boulevard d'Anfa, Casablanca, Maroc</span>
              </li>
              <li>
                <CiPhone className="contact-ico" />
                <a href="tel:+212522000000">+212 5 22 00 00 00</a>
              </li>
              <li>
                <CiMail className="contact-ico" />
                <a href="mailto:support@clickstore.ma">support@clickstore.ma</a>
              </li>
            </ul>

            <div className="footer-social-section mt-3">
              <span className="social-heading">Rejoignez-nous</span>
              <div className="social-links-grid mt-2">
                <a href="#" aria-label="Facebook" className="social-box"><CiFacebook /></a>
                <a href="#" aria-label="Instagram" className="social-box"><FaInstagram /></a>
                <a href="#" aria-label="Twitter" className="social-box"><RxTwitterLogo /></a>
                <a href="#" aria-label="WhatsApp" className="social-box"><FaWhatsapp /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-border text-center">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
            <p className="mb-0 text-muted">
              &copy; {new Date().getFullYear()} ClickStore. Tous droits réservés.
            </p>
            <div className="footer-bottom-links">
              <Link to="/services">Conditions Générales</Link>
              <span className="mx-2">•</span>
              <Link to="/services">Politique de Confidentialité</Link>
            </div>
          </div>
          {messageFooter && <small className="d-block mt-2 text-muted">{messageFooter}</small>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
