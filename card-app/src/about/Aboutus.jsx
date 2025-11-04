import React from 'react';
import teamImg from '../image/equipetime.png'; // Chemin vers votre image
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-us-section py-4 about">
      <div className="container">
        <div className="row align-items-center g-4">
          {/* Colonne Image */}
          <div className="col-lg-6">
            <div className="about-img-wrapper position-relative">
              <img 
                src={teamImg} 
                alt="Notre équipe" 
                className="img-fluid rounded-3 shadow-lg w-100" 
              />
              <div className="experience-badge bg-white rounded-circle p-4 shadow position-absolute">
                <div className="text-center">
                  <div className="fs-2 fw-bold text-primary1">10+</div>
                  <small className="text-muted">ans d'expérience</small>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne Texte */}
          <div className="col-lg-6">
            <h2 className="display-5 fw-bold mb-4">
              <span className="text1">À propos</span> de nous
            </h2>
            
            <p className="lead text-secondary mb-4">
              Nous transformons vos achats en une expérience exceptionnelle depuis 2012.
            </p>
            
            <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-check-circle-fill text-primary fs-5 me-3"></i>
                <span>Plus de 500,000 clients satisfaits</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-check-circle-fill text-primary fs-5 me-3"></i>
                <span>Livraison rapide dans 30 pays</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="bi bi-check-circle-fill text-primary fs-5 me-3"></i>
                <span>Produits rigoureusement sélectionnés</span>
              </div>
            </div>

            <p className="mb-4">
              Fondé par une équipe passionnée, notre marketplace s'engage à vous offrir 
              les meilleurs produits avec un service client hors pair.
            </p>

      

          </div>
        </div>

        {/* Statistiques */}
        <div className="row mt-5 pt-4 g-4">
          <div className="col-md-4">
            <div className="text-center p-4 stat-item">
              <h3 className="display-4 text-primary1 mb-2">500K+</h3>
              <p className="text-muted mb-0">Clients satisfaits</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center p-4 stat-item">
              <h3 className="display-4 text-primary1 mb-2">10K+</h3>
              <p className="text-muted mb-0">Produits disponibles</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center p-4 stat-item">
              <h3 className="display-4 text-primary1 mb-2">98%</h3>
              <p className="text-muted mb-0">Taux de satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs