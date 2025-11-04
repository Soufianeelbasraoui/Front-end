
// data.js
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

// Fonction utilitaire pour formater le prix
const formatPrice = (price) => {
  if (typeof price === 'number') return `${price} DH`;
  if (typeof price === 'string' && !price.endsWith('DH')) return `${price} DH`;
  return price;
};

 const products = [
  {
    id: 1,
    img:p1,
    color: ["Noir", "Blanc"],
    title: "Baskets Chunky Tendance Pour Hommes",
    reviews: "3.5k",
    rating: 4,
    size: [38, 39, 40, 41, 42, 43],
    prevPrice: formatPrice(200),
    newPrice: formatPrice(150),
    brand: "MAINALUN",
    category: "Chaussures homme",
    inStock: true,
    description: "Baskets tendance avec semelle épaisse pour un style urbain",
    shipping: "Livraison gratuite",
  },
  // ... autres produits
  {
    id: 2,
    img: p2,
    color: ["Blanc"],
    title: "Chaussures de sport casual pour hommes tendance",
    reviews: "3.5k",
    rating: 4.5,
    size: [39, 40, 41, 42, 43, 44],
    prevPrice: formatPrice(150),
    newPrice: formatPrice(259),
    brand: "MAINALUN",
    category: "Chaussures homme",
    inStock: true,
  },
  {
    id: 3,
    img: p3,
    color: ["Rouge", "Noir"],
    title: "Veste sans manche d'hiver chaude",
    reviews: "1.5k",
    rating: 4,
    size: ["L", "XL", "XXL", "XXXL"],
    prevPrice: formatPrice(290),
    newPrice: formatPrice(250),
    brand: "H&M",
    category: "Vêtements homme",
    inStock: false,
    availableDate: "2023-11-15",
  },
  {
    id: 4,
    img: p4,
    color: ["Gris foncé", "Noir"],
    title: "Veste à capuche à manches longues",
    reviews: "3.5k",
    rating: 3.5,
    size: ["L", "XL", "XXL"],
    prevPrice: formatPrice(150),
    newPrice: formatPrice(140),
    brand: "Zara",
    category: "Vêtements homme",
    inStock: true,
  },
  {
    id: 5,
    img: p5,
    color: ["Rouge", "Bleu", "Noir"],
    title: "Short de sport amincissant pour hommes",
    reviews: "3.5k ",
    rating: 4,
    size: ["L", "XL", "XXL"],
    prevPrice: formatPrice(150),
    newPrice: formatPrice(259),
    brand: "Zara",
    category: "Vêtements homme",
    inStock: true,
  },
  {
    id: 6,
    img: p6,
    color: ["Blanc", "Noir"],
    title: "Chaussures à Enfiler pour Hommes",
    reviews: "3.5k",
    rating: 4.5,
    size: [39, 40, 41, 42],
    prevPrice: formatPrice(249),
    newPrice: formatPrice(140),
    brand: "Zara",
    category: "Chaussures homme",
    inStock: true,
  },
  {
    id: 7,
    img: p1,
    color: ["Rouge", "Blanc", "Noir"],
    title: "T-shirt Graphique",
    reviews: "3.5k",
    rating: 3,
    size: ["S", "M", "L", "XL"],
    prevPrice: formatPrice(150),
    newPrice: formatPrice(259),
    brand: "Zara",
    category: "T-shirts",
    inStock: true,
  },
  {
    id: 8,
    img: p1,
    color: ["Noir"],
    title: "T-shirt Basique",
    reviews: "3.5k",
    rating: 4,
    size: ["S", "M", "L"],
    prevPrice: formatPrice(150),
    newPrice: formatPrice(259),
    brand: "Zara",
    category: "T-shirts",
    inStock: true,
  },
  {
    id: 9,
    img: p1,
    color: ["Blanc"],
    title: "T-shirt Col V",
    reviews: "3.5k",
    rating: 4.5,
    size: ["M", "L", "XL"],
    prevPrice: formatPrice(150),
    newPrice: formatPrice(259),
    brand: "Zara",
    category: "T-shirts",
    inStock: false,
  },
  {
    id: 10,
    img: p1,
    color: ["Bleu", "Gris"],
    title: "T-shirt Manches Longues",
    reviews: "3.5k ",
    rating: 4,
    size: ["S", "M", "L", "XL"],
    prevPrice: formatPrice(150),
    newPrice: formatPrice(259),
    brand: "Zara",
    category: "T-shirts",
    inStock: true,
  },
   {
    id: 11,
    img: p5,
    color: ["Rouge", "Bleu", "Noir"],
    title: "Short de sport amincissant pour hommes",
    reviews: "3.5k ",
    rating: 4,
    size: ["L", "XL", "XXL"],
    prevPrice: formatPrice(150),
    newPrice: formatPrice(259),
    brand: "Zara",
    category: "Vêtements homme",
    inStock: true,
  },,
   {
    id: 12,
    img: p5,
    color: ["Rouge", "Bleu", "Noir"],
    title: "Short de sport amincissant pour hommes",
    reviews: "3.5k ",
    rating: 4,
    size: ["L", "XL", "XXL"],
    prevPrice: formatPrice(150),
    newPrice: formatPrice(259),
    brand: "Zara",
    category: "Vêtements homme",
    inStock: true,
  },
  
  
];
export default products;