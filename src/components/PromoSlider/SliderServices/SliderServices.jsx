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
    <div className="services-section">
      <div className="service-wrapper">
        {serviceItems.map((service, index) => (
          <div key={index} className="service-item">
            <div className="icon me-3 flex-shrink-0">
              {service.icon}
            </div>
            <div className="min-w-0">
              <h6 className="mb-1 fw-bold text-truncate">{service.title}</h6>
              <p className="mb-0 text-muted small">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderServices;
