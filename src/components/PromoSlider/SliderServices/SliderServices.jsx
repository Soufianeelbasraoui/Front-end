import React from "react";
import { FiTruck, FiRefreshCw, FiCreditCard, FiHeadphones, FiGift } from "react-icons/fi";
import "./SliderServices.css";

const SliderServices = () => {
  const serviceItems = [
    {
      icon: <FiTruck />,
      title: "Livraison Rapide",
      description: "En 24/48h partout au Maroc"
    },
    {
      icon: <FiRefreshCw />,
      title: "Retours Faciles",
      description: "Échange sous 30 jours"
    },
    {
      icon: <FiCreditCard />,
      title: "Paiement Sécurisé",
      description: "À la livraison ou par carte"
    },
    {
      icon: <FiHeadphones />,
      title: "Support Dédié",
      description: "À votre écoute 7j/7"
    },
    {
      icon: <FiGift />,
      title: "Service Cadeau",
      description: "Emballage & avantages"
    }
  ];

  return (
    <div className="services-section py-4">
      <div className="m-3">
        <div className="d-flex justify-content-between align-items-center service-wrapper">
          {serviceItems.map((service, index) => (
            <div key={index} className="d-flex align-items-center service-item">
              <div className="icon text-warning fs-3 me-3">
                {service.icon}
              </div>
              <div>
                <h6 className="mb-1 fw-bold">{service.title}</h6>
                <p className="mb-0 text-muted small">{service.description}</p>
              </div>
              {index < serviceItems.length - 1 && (
                <div className="vertical-divider mx-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderServices;
