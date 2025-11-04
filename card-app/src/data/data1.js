
import p1 from "../image/p1.png";
import p1_1 from "../image/p1(1).png";
import p1_2 from "../image/p1(2).png";
import p1_3 from "../image/p1(3).png";
import p1_4 from "../image/p1(4).png";
import p1_5 from "../image/p1(5).png";
import p2 from "../image/p2.png";
import p3 from "../image/p3.png";
import p4 from "../image/p4.png";
import p5 from "../image/p5.png";
import p6 from "../image/p6.png";
//Moblier
import pmob1 from "../image/pmob.png"
import pmob2 from "../image/pmob2.png"
import pmob3 from "../image/pmob3.png"
import pmob4 from "../image/pmob4.webp"
//Électroniques
import pelck1 from "../image/pelck1.webp";
import pelck2 from "../image/pelck2.webp";
import pelck3 from "../image/pelck3.webp";
import elqu2 from "../image/elqu2.png";
import elqu1 from "../image/elqu.png";
//vetment
import pvet1 from "../image/pvet1.webp";
import pvet2 from "../image/pvet2.webp";
import pvet3 from "../image/pvet3.webp";
import Vetmen1 from "../image/vet1.png"
import Vetmen2 from "../image/vet2.png"
import Vetmen3 from "../image/vet3.png"
//sac & bagages
import psacb1 from "../image/psacb1.webp";
import psacb3 from "../image/imgslider3.webp";
import psacb2 from "../image/psacb2.webp";
import sac from "../image/sac.png"


// Fonction utilitaire pour formater le prix
const formatPrice = (price) => {
  if (typeof price === 'number') return `${price} DH`;
  if (typeof price === 'string' && !price.endsWith('DH')) return `${price} DH`;
  return price;
};


 const Featuredproducts=[

  {
    id: 13,
    img: pelck1,
    color: ["Noir", "Blanc"],
    title: "Écouteurs Sans Fil Lenovo ThinkPlus GM2 PRO",
    reviews: "2.5k",
    rating: 4,

    prevPrice: formatPrice(200),
    newPrice: formatPrice(94),

    category: "Électroniques",
    inStock: true,
    description: "Écouteurs Sans Fil Lenovo ThinkPlus GM2 PRO [Prêt pour le Bureau] - Son HiFi, Analyse Tri-Bande, Réduction Intelligente du Bruit, Appels HD",
    shipping: "Livraison gratuite",
   },
    //Meubles
   {
    id: 14,
    img: Vetmen2,
    color: ["rose"],
    title: "Blouse Décontractée Lavande à Imprimé Floral pour Femme - Col Rond Manches Courtes ",
    reviews: "3.5k",
    rating: 4,
    prevPrice: formatPrice(115),
    newPrice: formatPrice(95),
    category: "Meubles",
    inStock: true,
    description: "Blouse Décontractée Lavande à Imprimé Floral pour Femme - Col Rond Manches Courtes",
    shipping: "Livraison gratuite",
   },
   {
    id: 15,
    img:  pmob1,
    color: ["Noir", "Blanc"],
    title: "Bande d'étanchéité de porte inférieure (1 pièce)",
    reviews: "3.5k",
    rating: 4,
    prevPrice: formatPrice(50),
    newPrice: formatPrice(30),
    category: "Meubles",
    inStock: true,
    description: "1pc Bande d'étanchéité de porte inférieure non adhésive, joint de porte inférieur flexible",
    shipping: "Livraison gratuite",
   },
   //Électroniques
   {
    id: 16,
    img:pelck2,
    color: ["Noir", "Blanc"],
    title: "Support de Portable Ergonomique Réglable – ABS Pliable",
    reviews: "3.5k",
    rating: 4,
  prevPrice:formatPrice(120),
    newPrice: formatPrice(73),
    category: "Électroniques",
    inStock: true,
    description: "Support de portable ergonomique réglable, matériau ABS, design pliable léger avec clip facile",
    shipping: "Livraison gratuite",
   },
   //Vêtements
   
   {
    id: 17,
    img: pvet1,
    color: ["Noir", "Blanc"],
    title: "Jupe-Blouse Jaune Mi-longue à Boutons et Col Revers avec Motif d'Explosion Orientée",
    reviews: "3.5k",
    rating: 4,
    size: ["S", "M", "L", "XL"],
    prevPrice: formatPrice(256),
    newPrice: formatPrice(173),

    category: "Vêtements",
    inStock: true,
    description: "Jupe-Blouse Jaune Mi-longue à Boutons et Col Revers avec Motif d'Explosion Orientée",
    shipping: "Livraison gratuite",
   },
   //Électroniques
   {
    id: 18,
    img: pelck3,
    color: ["Noir", "Blanc"],
    title: "Adaptateur Hub USB-C en Aluminium – 4 Ports",
    reviews: "3.5k",
    rating: 4,
   prevPrice:formatPrice(89),
    newPrice: formatPrice(43),
    brand: "MAINALUN",
    category: "Électroniques",
    inStock: true,
    description: "Adaptateur Hub USB C en Aluminium à 4 Ports avec Ports USB Type-C et USB-A, Conception Compacte pour MacBook",
    shipping: "Livraison gratuite",
   },
   //Meubles
   {
    id: 19,
    img: pmob3,
    color: ["Noir", "Blanc"],
    title: "Porte-vêtements à 3 niveaux-Métal et plastique",
    reviews: "1.5k",
    rating: 4,
    prevPrice: formatPrice(399),
    newPrice: formatPrice(271),
    brand: "MAINALUN",
    category: "Meubles",
    inStock: true,
    description: "Porte-Vêtements Métallique et Plastique à 3 Niveaux avec Étagères de Rangement - Organisateur d'Armoire Portable Autoportant",
    shipping: "Livraison gratuite",
   },
   //Vêtements
   {
    id: 20,
    img: pvet2,
    color: ["Noir", "Blanc"],
    title: "Robe Élégante pour Femme à Col Revers Uni - Mélange de Polyester",
    reviews: "3.5k",
    size: ["S", "M", "L", "XL"],
    rating: 4,
   
    prevPrice: formatPrice(256),
    newPrice: formatPrice(150),

    category: "Vêtements",
    inStock: true,
    description: "Robe Élégante pour Femme à Col Revers Uni - Mélange de Polyester, Tissu Non Extensible",
    shipping: "Livraison gratuite",
      promo: "-25%"
   },
   //vetments
   {
    id: 21,
    img:Vetmen3,
    color: ["Noir", "Blanc"],
    title: "Haut décontracté élégant pour femmes à la mode",
    reviews: "3.5k",
    rating: 4,
    promo: "-37%",
    prevPrice:formatPrice(213),
    newPrice: formatPrice(133),
    category: "Vêtements",
    inStock: true,
    description: "Haut décontracté élégant pour femmes à la mode",
    shipping: "Livraison gratuite",
   },
   {
      id: 22,
      img: p2,
      color: ["Blanc"],
      title: "Chaussures de sport casual pour hommes tendance",
      reviews: "3.5k",
      rating: 4.5,
     
      size: [39, 40, 41, 42, 43, 44],
      prevPrice: formatPrice(150),
      newPrice: formatPrice(259),
  
      category: "Vêtements",
      inStock: true,
        promo: "-25%"
    },
    
   //Meubles
   {
    id: 23,
    img:pmob4,
    color: ["Noir", "Blanc"],
    title: "Bureau pour ordinateur à hauteur réglable - Disponible en trois couleurs",
    reviews: "3.5k",
    rating: 4,
    promo: "-25%",
  
    prevPrice:formatPrice(1200),
    newPrice: formatPrice(720),
    category: "Meubles",
    inStock: true,
    description: "Bureau pour ordinateur à hauteur réglable - Disponible en trois couleurs, ce bureau pratique présente un étagère à hauteur réglable",
    shipping: "Livraison gratuite",
   },
      //Vêtements
   {
    id: 24,
    img:pvet3,
    color: ["Noir", "Blanc"],
    title: "Joggers en Denim Harem pour Hommes - Style Urbain Décontracté",
    reviews: "3.5k",
    rating: 4,
    promo: "-27%",
    prevPrice:formatPrice(312),
    newPrice: formatPrice(299),
    category: "Vêtements",
    inStock: true,
    description: "Joggers en Denim Harem pour Hommes - Style Urbain Décontracté, Coupe Ample",
    shipping: "Livraison gratuite",
   },
   {
    id: 25,
    img:psacb1,
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
    id: 26,
    img:psacb2,
    color: ["Noir", "Blanc"],
    title: "Portefeuille en cuir synthétique de style professionnel pour hommes",
    reviews: "3.5k",
    rating: 4,
   promo: "-43%",
    prevPrice:formatPrice(50),
    newPrice: formatPrice(15),
    category: "Sacs et Bagages",
    inStock: true,
    description: "Portefeuille en cuir synthétique de style professionnel pour hommes - Couleur unie en cuir synthétique avec détail de blocs de couleurs",
    shipping: "Livraison gratuite",
   },
 
   {
    id: 27,
    img:psacb3,
    color: ["Noir", "Blanc"],
    title: "Sac à Dos Étudiant Multifonctionnel",
    reviews: "3.5k",
    rating: 4,
    prevPrice:formatPrice(349),
    newPrice: formatPrice(287),
    category: "Sacs et Bagages",
    inStock: true,
    description: "Sac À Dos Professionnel Grande Capacité",
    shipping: "Livraison gratuite",
   },
   {
    id: 28,
    img:sac,
    promo:"10%",
    color: ["Noir", "Blanc"],
    title: "Sac à Dos en Toile Durable pour Hommes - Grande Capacité, Léger pour Voyage & Ordinateur Portable avec Bretelles Réglables",
    reviews: "3.5k",
    rating: 4,
    prevPrice:formatPrice(300),
    newPrice: formatPrice(215),
    category: "Sacs et Bagages",
    inStock: true,
    description: "Sac à Dos en Toile Durable pour Hommes ",
    shipping: "Livraison gratuite",
   },
   //Électroniques
   {
    id: 29,
    img:elqu1,
    promo:"-60%",
    color: ["Noir", "Blanc"],
    title: "Repose-poignet Ergonomique pour Ordinateur & Laptop - Tapis de Souris Confortable pour Soutien de la Main",
    reviews: "3.5k",
    rating: 4,
    prevPrice:formatPrice(74),
    newPrice: formatPrice(29),
    category: "Électroniques",
    inStock: true,
    description: "Repose-poignet Ergonomique pour Ordinateur & Laptop",
    shipping: "Livraison gratuite",
   },
   {
    id: 30,
    img:elqu2,
    promo:"-67%",
    color: ["Noir", "Blanc"],
    title: "Écouteurs Sans Fil : Qualité Sonore Supérieure, Autonomie de Batterie Longue Durée",
    reviews: "3.5k",
    rating: 4,
    prevPrice:formatPrice(120),
    newPrice: formatPrice(50),
    category: "Électroniques",
    inStock: true,
    description: "Écouteurs Sans Fil : Qualité Sonore Supérieure, Autonomie de Batterie Longue Durée",
    shipping: "Livraison gratuite",
   },
   //Vêtements
   {
    id: 31,
    img:Vetmen1,
    promo:"-26%",
    color: ["Noir", "Blanc"],
    title: "T-shirt À Col Rond Imprimé Livre Et Floral, T-shirt Décontracté À Manches Courtes Pour Le Printemps Et L'été, Vêtements Pour Femmes",
    reviews: "3.5k",
    rating: 4,
    prevPrice:formatPrice(102),
    newPrice: formatPrice(75),
    category: "Vêtements",
    inStock: true,
    description: "T-shirt À Col Rond Imprimé Livre Et Floral, T-shirt Décontracté À Manches Courtes Pour Le Printemps Et L'été, Vêtements Pour Femmes",
    shipping: "Livraison gratuite",
   },
   {
    id: 32,
    img:elqu1,
    promo:"-60%",
    color: ["Noir", "Blanc"],
    title: "Repose-poignet Ergonomique pour Ordinateur & Laptop - Tapis de Souris Confortable pour Soutien de la Main",
    reviews: "3.5k",
    rating: 4,
    prevPrice:formatPrice(74),
    newPrice: formatPrice(29),
    category: "Électroniques",
    inStock: true,
    description: "Repose-poignet Ergonomique pour Ordinateur & Laptop",
    shipping: "Livraison gratuite",
   },
      //Meubles
   {
    id: 33,
    img: pmob2,
    color: ["Noir", "Blanc"],
    title: "Étagère à Chaussures en Tissu Noire - Forme en X, 4 Niveaux ",
    reviews: "3.5k",
    rating: 4,
    prevPrice: formatPrice(200),
    newPrice: formatPrice(150),
    category: "Meubles",
    inStock: true,
    description: "Étagère à Chaussures en Tissu Noire en Forme de X à 4 Niveaux - Anti-poussière, Montage Facile, Organisateur Multi-Étagères pour Entrée & Salon",
    shipping: "Livraison gratuite",
   },
];
export default Featuredproducts;