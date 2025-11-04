import React from 'react';
import card from "../assets/shop2.png"
import "./Maine.css";
import {FaShippingFast,FaHeadset,FaLock } from "react-icons/fa";
import Products from '../Home/Home';
function Maine() {
  return (
    <div>
      
      <div className='main-container'>
      <div className="overlay">
        <h4 className='h5'>Bienvenue sur mon site <span className='Click'>Click</span><span className='Store'>Store</span></h4>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo, nobis.</p>
        <button className="button-main"> En savoir plus</button>
      </div>
      <div className='img-container'>
       <img src={card} alt="" className='image'/>
      </div>
      
    </div> 
    <div className='section-service'>
    <section className='section2'>
      <FaShippingFast className='icons'/>
      <div>
      <h4>Livraison gratuite</h4>
      <p>Lorem ipsum dolor sit.</p>
      </div>
    </section>
    <section className='section2'>
      <FaLock className='icons'/>
      <div>
      <h4>Paiement sécurisé</h4>
      <p>Lorem ipsum dolor sit.</p>
      </div>
    </section>
    <section className='section2'>
       <FaHeadset className='icons'/>
      <div>
      <h4>Support 24/7</h4>
      <p>Lorem ipsum dolor sit.</p>
      </div>
    </section>
    <section className='section2'>
  
      <div>
      <h4>Livraison gratuite</h4>
      <p>Lorem ipsum dolor sit.</p>
      </div>
    </section>
    </div>

    </div>
  );
}

export default Maine;
