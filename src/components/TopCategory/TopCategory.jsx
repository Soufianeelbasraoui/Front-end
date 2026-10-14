import React from 'react';
import { Link } from 'react-router-dom';
import Topcategory2 from "../../assets/images/p2.png";
import Topcategory4 from "../../assets/images/imgslider3.webp";
import Topcategory3 from "../../assets/images/top2.png";
import Topcategory1 from "../../assets/images/top3.png";
import mobilier from '../../assets/images/mobilier1.png';
import './TopCategory.css';

function TopCategory() {
  return (
    <div className="container my-5">
      <div className="section-header-top mb-4 text-start">
        <h2 className="section-main-title mb-1">Top Catégories</h2>
        <p className="section-main-subtitle text-muted mb-0">Explorez nos rayons les plus recherchés du moment</p>
      </div>

      <div className="top-categories-grid">
        <Link to="/Electroniques" className="category-modern-card text-decoration-none">
          <div className="category-img-wrap">
            <img src={Topcategory1} className="category-img" alt="Électronique" />
          </div>
          <div className="category-text-wrap">
            <h5 className="category-name">Électronique</h5>
            <span className="category-action">Explorer les nouveautés →</span>
          </div>
        </Link>

        <Link to="/vetments" className="category-modern-card text-decoration-none">
          <div className="category-img-wrap">
            <img src={Topcategory2} className="category-img" alt="Vêtements" />
          </div>
          <div className="category-text-wrap">
            <h5 className="category-name">Mode & Vêtements</h5>
            <span className="category-action">Découvrir le prêt-à-porter →</span>
          </div>
        </Link>

        <Link to="/meubles" className="category-modern-card text-decoration-none">
          <div className="category-img-wrap">
            <img src={Topcategory3} className="category-img" alt="Meubles" />
          </div>
          <div className="category-text-wrap">
            <h5 className="category-name">Maison & Meubles</h5>
            <span className="category-action">Aménager votre espace →</span>
          </div>
        </Link>

        <Link to="/Sacetbagage" className="category-modern-card text-decoration-none">
          <div className="category-img-wrap">
            <img src={Topcategory4} className="category-img" alt="Sacs & Bagages" />
          </div>
          <div className="category-text-wrap">
            <h5 className="category-name">Sacs & Maroquinerie</h5>
            <span className="category-action">Voir les sacs & valises →</span>
          </div>
        </Link>
      </div>

      <div className="trio-promo-grid mt-4">
        <div className="trio-promo-card">
          <div className="trio-card-info">
            <span className="badge bg-danger mb-2">40% DE RÉDUCTION</span>
            <h4 className="trio-title">Housse de Canapé</h4>
            <p className="trio-price my-2">
              <strong className="text-danger fs-5">199.99 DH</strong>
              <del className="text-muted ms-2 small">299.60 DH</del>
            </p>
            <Link to="/meubles">
              <button className="btn btn-warning mt-1 px-3 py-1">Découvrir</button>
            </Link>
          </div>
          <div className="trio-card-img">
            <img src={mobilier} alt="Housse de Canapé" />
          </div>
        </div>

        <div className="trio-promo-card">
          <div className="trio-card-info">
            <span className="badge bg-primary mb-2">PRIX CHOC</span>
            <h4 className="trio-title">Enceinte Acoustique</h4>
            <p className="trio-price my-2">
              <strong className="text-danger fs-5">199.99 DH</strong>
            </p>
            <Link to="/Electroniques">
              <button className="btn btn-warning mt-1 px-3 py-1">Découvrir</button>
            </Link>
          </div>
          <div className="trio-card-img">
            <img src={Topcategory3} alt="Enceinte Acoustique" />
          </div>
        </div>

        <div className="trio-promo-card">
          <div className="trio-card-info">
            <span className="badge bg-danger mb-2">30% DE RÉDUCTION</span>
            <h4 className="trio-title">Sac à Dos Étudiant</h4>
            <p className="trio-price my-2">
              <strong className="text-danger fs-5">149.99 DH</strong>
              <del className="text-muted ms-2 small">219.00 DH</del>
            </p>
            <Link to="/Sacetbagage">
              <button className="btn btn-warning mt-1 px-3 py-1">Découvrir</button>
            </Link>
          </div>
          <div className="trio-card-img">
            <img src={Topcategory4} alt="Sac à Dos Étudiant" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopCategory;
