
import pmob4 from "../image/pmob4.webp"
import pelck2 from "../image/pelck2.webp";
import pvet3 from "../image/pvet3.webp";
//sac & bagages
import psacb1 from "../image/psacb1.webp";
import psacb3 from "../image/imgslider3.webp";
import psacb2 from "../image/psacb2.webp";
const formatPrice = (price) => {
   if (typeof price === 'number') return `${price} DH`;
   if (typeof price === 'string' && !price.endsWith('DH')) return `${price} DH`;
   return price;
 };
const Offers=[
     {
            id: 36,
            promo:"-27%",
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
            id: 37,
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
            id: 38,
           
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
            id: 39,
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
]
export default Offers;