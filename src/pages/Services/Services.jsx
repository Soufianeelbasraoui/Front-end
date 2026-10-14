import React from 'react';
import { FaShippingFast, FaExchangeAlt, FaHeadset, FaShieldAlt, FaCreditCard, FaGift } from 'react-icons/fa';
import "./Services.css"
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    { icon: <FaShippingFast />, title: "Livraison Rapide", description: "Livraison express en 24-48h dans tout le Maroc avec suivi en temps réel.", features: ["Gratuite à partir de 30 DH", "Points relais disponibles", "Livraison suivie"] },
    { icon: <FaExchangeAlt />, title: "Retours Faciles", description: "Retournez vos articles sans frais sous 14 jours si ils ne vous conviennent pas.", features: ["Remboursement sous 72h", "Procédure simplifiée", "Échange immédiat"] },
    { icon: <FaHeadset />, title: "Support 24/7", description: "Notre équipe est disponible 7j/7 pour répondre à vos questions.", features: ["Chat en direct", "Résolution rapide", "Assistance technique"] },
    { icon: <FaShieldAlt />, title: "Paiement Sécurisé", description: "Transactions 100% sécurisées avec chiffrement bancaire de niveau militaire.", features: ["CB, PayPal, CMI", "Données cryptées", "Protection anti-fraude"] },
    { icon: <FaCreditCard />, title: "Paiement en Ligne", description: "Payez en plusieurs fois sans frais avec nos solutions de paiement flexibles.", features: ["3x sans frais", "10x avec frais", "Paiement différé"] },
    { icon: <FaGift />, title: "Cadeaux & Emballage", description: "Emballage cadeau premium gratuit pour toutes vos commandes.", features: ["Message personnalisé", "Papier haut de gamme", "Options discrètes"] }
  ];

  return (
    <div className="services-page mb-5">
      <section className="services-grid-section">
        <div className="section-header">
          <h2>Vos Avantages Shopping</h2>
          <p>Tout ce dont vous avez besoin pour une expérience en ligne parfaite</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
