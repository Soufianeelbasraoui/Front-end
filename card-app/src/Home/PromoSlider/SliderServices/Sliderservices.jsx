import React from "react";
import { FiTruck, FiRefreshCw, FiCreditCard, FiHeadphones, FiGift } from "react-icons/fi";
import "./Sliderservices.css";

const Services = () => {
  const serviceItems = [
    {
      icon: <FiTruck />,
      title: "Free Delivery",
      description: "For all orders over $99"
    },
    {
      icon: <FiRefreshCw />,
      title: "90 Days Return",
      description: "If goods have problems"
    },
    {
      icon: <FiCreditCard />,
      title: "Secure Payment",
      description: "100% secure payment"
    },
    {
      icon: <FiHeadphones />,
      title: "24/7 Support",
      description: "Dedicated support"
    },
    {
      icon: <FiGift />,
      title: "Gift Service",
      description: "Support gift service"
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

export default Services;
