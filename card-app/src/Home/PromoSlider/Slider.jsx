import React from "react";


import iphone from "../../image/imgslider2.webp";

import imgslider from '../../image/imgslider.png'
import cartable from "../../image/imgslider3.webp";

import lp19 from "../../image/imgslider4.webp";

import promoImg2 from "../../image/p5.png";
import "./Slider.css";
import Services from "./SliderServices/Sliderservices";
import { Link } from "react-router-dom";


const PromoSlider = ({ p }) => {
  return (
    <div className="m-3  my-4">
      <div className="row gx-4">
       
        <div className="col-md-8">
          <div id="promoCarousel" className="carousel slide promo-slider overflow-hidden" data-bs-ride="carousel">
            
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#promoCarousel"
                data-bs-slide-to="0"
                className="active "
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

            <div className="carousel-inner bg-light">
                 <div className="carousel-item active">
                <div className="d-flex">
                  <div className="w-50 d-flex align-items-center p-4">
                    <div className="promo-content">
                      <h6 className="text-info ms-4">Electronics</h6>
                      <h2 className="fw-bold ms-3">
                        EXPERIENCE FEEL GREATEST WITH VIRTUAL REALITY JUST <span className="text-success">1999 DH</span>
                      </h2>
                  <Link to="/produits">
                   <button className="btn btn-warning mt-3 fw-semibold ms-5">Shop now</button>
                  </Link>
                    </div>
                  </div>
                  <div className="w-50">
                    <img
                      src={lp19}
                      className="d-block w-100 img-card"
                      alt="Slide 1"
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>

          
              <div className="carousel-item">
                <div className="d-flex">
                  <div className="w-50 d-flex align-items-center p-4">
                    <div className="promo-content">
                      <h6 className="text-info ms-3">Best Deals</h6>
                      <h2 className="fw-bold ">
                        LIMITED TIME OFFER<br />
                        SAVE ON SMART TECH
                      </h2>
                      <Link to="/produits" className="nav-link">
                         <button className="btn btn-warning mt-3 fw-semibold ms-5">Shop now</button>
                      </Link>
                   
                    </div>
                  </div>
                  <div className="w-50">
                    <img
                      src={imgslider}
                      className="d-block w-100 img-card"
                      alt="Slide 2"
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>

           
              <div className="carousel-item">
                <div className="d-flex">
                  <div className="w-50 d-flex align-items-center p-4">
                    <div className="promo-content">
                      <h6 className="text-info">Hot Product</h6>
                      <h2 className="">
                        UPGRADE YOUR STYLE<br />
                        WITH SMART ACCESSORIES
                      </h2>
                    <Link to="/produits" className="nav-link">
                      <button className="btn btn-warning mt-3 fw-semibold ms-5">Shop now</button>
                    </Link>
                    </div>
                  </div>
                  <div className="w-50">
                    <img
                      src={promoImg2}
                      className="d-block w-100 img-card"
                      alt="Slide 3"
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            </div>

        
            <button className="carousel-control-prev" type="button" data-bs-target="#promoCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon bg-dark bg-opacity-50 rounded-circle p-3" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#promoCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon bg-dark bg-opacity-50 rounded-circle p-3" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

     
        <div className="col-md-4 d-flex flex-column gap-4">
       
       <Link to="/produits" className="nav-link">
       <div className="d-flex align-items-center  p-3 promo-card  bg-light">
            <img
              src={cartable}
              alt="Bag"
              className="me-2 img-card img-card"
              style={{ width: "150px", height: "155px", objectFit: "cover" }}
            />
            <div>
              <h5 className="fw-bold mb-1">Sac À Dos Professionnel Grande Capacité</h5>
              <span className="badge bg-danger rounded-pill">20% OFF</span>
              <p className="text-muted mt-2">Sac à Dos Étudiant Multifonctionnel</p>
            </div>
          </div></Link>

      
       <Link to="/produits" className="nav-link">
       <div className="d-flex align-items-center  p-3 promo-card  bg-light">
            <img
              src={iphone}
              alt="iPhone"
              className="me-2 img-card"
              style={{ width: "150px", height: "155px", objectFit: "cover" }}
            />
            <div>
              <h5 className="fw-bold mb-1">Iphone 16 Pro Max.</h5>
              <span className="badge bg-danger rounded-pill">40% OFF</span>
              <p className="text-muted mt-2">Découvrez le meilleur smartphone au monde</p>
            </div>
          </div>
       </Link>
        </div>
      </div>
 <Services/>
    </div>
  );
};

export default PromoSlider;