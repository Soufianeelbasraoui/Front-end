
// recommendedProducts.js - Recommended products
import pmob4 from "../assets/images/pmob4.webp"
import pelck2 from "../assets/images/pelck2.webp";

import pvet1 from "../assets/images/pvet1.webp";

import psacb2 from "../assets/images/psacb2.webp";

import formatPrice from "../utils/formatPrice";

const Featuredproduit=[
        //Électroniques
       {
        id: 30,
        img:pelck2,
        color: ["Noir", "Blanc"],
        title: "Support de Portable Ergonomique Réglable – ABS Pliable",
        reviews: "3.5k",
        rating: 4,
        prevPrice:formatPrice(199),
        newPrice: formatPrice(73),
        category: "Électroniques",
        inStock: true,
        description: "Support de portable ergonomique réglable, matériau ABS, design pliable léger avec clip facile",
        shipping: "Livraison gratuite",
       },
       //Meubles
       {
        id: 31,
        img:pmob4,
        color: ["Noir", "Blanc"],
        title: "Bureau pour ordinateur à hauteur réglable - Disponible en trois couleurs",
        reviews: "3.5k",
        rating: 4,
        prevPrice:formatPrice(1200),
        newPrice: formatPrice(720),
        category: "Meubles",
        inStock: true,
        description: "Bureau pour ordinateur à hauteur réglable - Disponible en trois couleurs, ce bureau pratique présente un étagère à hauteur réglable",
        shipping: "Livraison gratuite",
       },
          //Vêtements
       
       {
        id: 32,
       
        img:pvet1,
        color: ["Noir", "Blanc"],
        title: "Un sac à bandoulière multi-couches élégant et polyvalent",
        reviews: "3.5k",
        rating: 4,
        prevPrice:formatPrice(205),
        newPrice: formatPrice(172),
        category: "Sacs et Bagages",
        inStock: true,
        description: "Joggers en Denim Harem pour Hommes - Style Urbain Décontracté, Coupe Ample",
        shipping: "Livraison gratuite",
       },
       {
        id: 33,
        img:psacb2,
        color: ["Noir", "Blanc"],
        title: "Portefeuille en cuir synthétique de style professionnel pour hommes",
        reviews: "3.5k",
        rating: 4,
        prevPrice:formatPrice(50),
        newPrice: formatPrice(15),
        category: "Sacs et Bagages",
        inStock: true,
        description: "Portefeuille en cuir synthétique de style professionnel pour hommes - Couleur unie en cuir synthétique avec détail de blocs de couleurs",
        shipping: "Livraison gratuite",
       },
          {
        id: 34,
       
        img:pvet1,
        color: ["Noir", "Blanc"],
        title: "Un sac à bandoulière multi-couches élégant et polyvalent",
        reviews: "3.5k",
        rating: 4,
        prevPrice:formatPrice(205),
        newPrice: formatPrice(172),
        category: "Sacs et Bagages",
        inStock: true,
        description: "Joggers en Denim Harem pour Hommes - Style Urbain Décontracté, Coupe Ample",
        shipping: "Livraison gratuite",
       },
     
    
]
export default Featuredproduit;
