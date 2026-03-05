import React from 'react';
import './TopCategory.css';
import { Link } from 'react-router-dom';
import Topcategory2 from "../../assets/images/p2.png";
import Topcategory4 from "../../assets/images/imgslider3.webp";
import Topcategory3 from "../../assets/images/top2.png";
import Topcategory1 from "../../assets/images/top3.png";
import mobilier from '../../assets/images/mobilier1.png';

function TopCategory() {
  return (
    <div className="m-5 ">
      <h2 className="h2-Categories text-center mb-4">Top Categories</h2>
  
      <div className="top-category row justify-content-center g-4">

        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
         <Link to="/Electroniques" className="nav-link">
         <div className="category text-center p-3">
            <img src={Topcategory1} className="category-img mb-3" alt="Electronics" />
            <hr></hr>
            <p>Electronics</p>
          </div>
         </Link>
        </div>

        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
         <Link to="/vetments" className="nav-link">
         <div className="category text-center p-3">
            <img src={Topcategory2} className="category-img mb-3" alt="Clothing" />
            <hr></hr>
            <p>Vêtements</p>
          </div>
         </Link>
        </div>

        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
          <Link to="/meubles" className="nav-link">
          <div className="category text-center p-3">
            <img src={Topcategory3} className="category-img mb-3" alt="Computers" />
            <hr></hr>
           <p>Meubles</p>
          </div>
          </Link>
        </div>
        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <Link to="/Sacetbagage" className="nav-link">
        <div className="category text-center p-3">
            <img src={Topcategory4} className="category-img mb-3" alt="Computers" />
            <hr></hr>
            <p>Sacs et Bagages</p>
          </div>
        </Link>
        </div>
      </div>
     
      <div className='card-container1 mt-5'>
        {/*p1 */}
        <div className='card1-product bg-light'>
        <div>
        <h4>Housse de Canapé Bohème <small>en Chenille avec Petites</small></h4>
          <small>Discount</small>
          <h5 className='off'> 40 % OFF</h5>
          <p><span>199.99 DH</span><del>299.60 DH</del></p>
          <Link to="/produits"> <button className='btn btn-warning'>Shop Now</button></Link>
        </div>
        <div>
          <img src={mobilier}  alt="" />
        </div>
        </div>
       {/*p2 */}
       <div className='card1-product bg-light'>
        <div>
        <h4>Acher Fluence <small>Minimal Speaker</small></h4>
          <small>PRIX JUSTE</small>
          <p><span>199.99 DH</span></p>
          <Link to="/produits"> <button className='btn btn-warning'>Shop Now</button></Link>
        </div>
        <div>
          <img src={Topcategory3} alt="" />
        </div>
        </div>
        {/*p3*/}
        <div className='card1-product bg-light'>
        <div>
        <h4>Sac à Dos Étudiant <small>Multifonctionnel</small></h4>
          <small>Vente jusqu'à</small>
          <p><span className='off'>40 % OFF</span></p>
         <Link to="/produits"> <button className='btn btn-warning'>Shop Now</button></Link>
        </div>
        <div>
          <img src={Topcategory4} alt="" />
        </div>
        </div>
      </div>
    </div>
  );
}

export default TopCategory;
