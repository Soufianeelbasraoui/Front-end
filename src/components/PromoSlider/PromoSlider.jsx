import React from "react";
import { Link } from "react-router-dom";
import iphone from "../../assets/images/imgslider2.webp";
import imgslider from '../../assets/images/imgslider.png';
import cartable from "../../assets/images/imgslider3.webp";
import lp19 from "../../assets/images/imgslider4.webp";
import promoImg2 from "../../assets/images/p5.png";
import SliderServices from "./SliderServices/SliderServices";
import "./PromoSlider.css";

const PromoSlider = () => {
  return (
    <div className="container my-4">
      <div className="row g-4 align-items-stretch">
        <div className="col-lg-8">
          <div id="promoCarousel" className="carousel slide promo-slider overflow-hidden h-100" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#promoCarousel"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#promoCarousel"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#promoCarousel"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>

            <div className="carousel-inner h-100">
              <div className="carousel-item active h-100">
                <div className="d-flex align-items-center h-100 flex-column flex-md-row">
                  <div className="w-100 w-md-50 p-4 p-lg-5">
                    <div className="promo-content">
                      <span className="badge bg-danger mb-2">OFFRE HIGH-TECH</span>
                      <h2 className="fw-bold promo-heading">
                        Vivez l'expérience immersive avec le casque VR ultime
                      </h2>
                      <p className="promo-price text-muted mb-3">
                        À partir de <span className="text-danger fw-bold fs-4 ms-1">1 999 DH</span>
                      </p>
                      <Link to="/produits">
                        <button className="btn btn-warning fw-semibold px-4 py-2">Découvrir les offres</button>
                      </Link>
                    </div>
                  </div>
                  <div className="w-100 w-md-50 h-100 d-flex align-items-center justify-content-center">
                    <img
                      src={lp19}
                      className="d-block w-100 img-card promo-hero-img"
                      alt="Casque VR"
                    />
                  </div>
                </div>
              </div>

              <div className="carousel-item h-100">
                <div className="d-flex align-items-center h-100 flex-column flex-md-row">
                  <div className="w-100 w-md-50 p-4 p-lg-5">
                    <div className="promo-content">
                      <span className="badge bg-primary mb-2">VENTE FLASH</span>
                      <h2 className="fw-bold promo-heading">
                        Performance & Mobilité : Découvrez nos PC Portables
                      </h2>
                      <p className="promo-price text-muted mb-3">
                        Garantie 1 an & support dédié inclus
                      </p>
                      <Link to="/Electroniques">
                        <button className="btn btn-warning fw-semibold px-4 py-2">Explorer la boutique</button>
                      </Link>
                    </div>
                  </div>
                  <div className="w-100 w-md-50 h-100 d-flex align-items-center justify-content-center">
                    <img
                      src={imgslider}
                      className="d-block w-100 img-card promo-hero-img"
                      alt="PC Portable"
                    />
                  </div>
                </div>
              </div>

              <div className="carousel-item h-100">
                <div className="d-flex align-items-center h-100 flex-column flex-md-row">
                  <div className="w-100 w-md-50 p-4 p-lg-5">
                    <div className="promo-content">
                      <span className="badge bg-success mb-2">NOUVELLE COLLECTION</span>
                      <h2 className="fw-bold promo-heading">
                        Sublimez votre style avec nos accessoires connectés
                      </h2>
                      <p className="promo-price text-muted mb-3">
                        Design raffiné et connectivité optimale
                      </p>
                      <Link to="/produits">
                        <button className="btn btn-warning fw-semibold px-4 py-2">Voir la collection</button>
                      </Link>
                    </div>
                  </div>
                  <div className="w-100 w-md-50 h-100 d-flex align-items-center justify-content-center">
                    <img
                      src={promoImg2}
                      className="d-block w-100 img-card promo-hero-img"
                      alt="Accessoires"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#promoCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon p-3" aria-hidden="true"></span>
              <span className="visually-hidden">Précédent</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#promoCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon p-3" aria-hidden="true"></span>
              <span className="visually-hidden">Suivant</span>
            </button>
          </div>
        </div>

        <div className="col-lg-4 d-flex flex-column gap-3">
          <Link to="/Sacetbagage" className="text-decoration-none">
            <div className="promo-card d-flex align-items-center p-3 h-100">
              <img
                src={cartable}
                alt="Sac à Dos Professionnel"
                className="img-card promo-side-img me-3 flex-shrink-0"
              />
              <div className="promo-side-info">
                <span className="badge bg-danger mb-1">-20% DE REMISE</span>
                <h5 className="fw-bold mb-1 promo-side-title">Sac À Dos Pro Grande Capacité</h5>
                <p className="text-muted small mb-0">Imperméable et ergonomique</p>
              </div>
            </div>
          </Link>

          <Link to="/Electroniques" className="text-decoration-none">
            <div className="promo-card d-flex align-items-center p-3 h-100">
              <img
                src={iphone}
                alt="Smartphone Premium"
                className="img-card promo-side-img me-3 flex-shrink-0"
              />
              <div className="promo-side-info">
                <span className="badge bg-danger mb-1">PROMO LIMITÉE</span>
                <h5 className="fw-bold mb-1 promo-side-title">Smartphone Haut de Gamme</h5>
                <p className="text-muted small mb-0">Écran OLED & Triple capteur pro</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <SliderServices />
    </div>
  );
};

export default PromoSlider;
