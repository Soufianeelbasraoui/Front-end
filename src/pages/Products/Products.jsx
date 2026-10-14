import React, { useState } from "react";
import Featuredproducts from "../../data/featuredProducts";
import ItemCard from "../../components/ProductCard/ItemCard";
import nowcollection from "../../assets/images/Ncollection.jpg";
import "./Products.css";

const CATEGORIES = [
  { id: "all", name: "Tous les produits" },
  { id: "Électroniques", name: "Électroniques" },
  { id: "Vêtements", name: "Vêtements" },
  { id: "Meubles", name: "Mobilier" },
  { id: "Sacs et Bagages", name: "Sacs & Bagages" },
];

function Products({ handelAddtoCart }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [produitfilter, setProduitFilter] = useState(Featuredproducts);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      setProduitFilter(Featuredproducts);
    } else {
      setProduitFilter(Featuredproducts.filter((ele) => ele.category === categoryId));
    }
  };

  return (
    <div className="products-page-wrapper">
      <div className="container mt-4">
        <div className="products-hero-banner">
          <img 
            src={nowcollection} 
            alt="Tous les Produits" 
            className="products-banner-img"
          />
          <div className="products-banner-overlay"></div>
          <div className="products-banner-content">
            <span className="badge bg-primary mb-2">CATALOGUE ClickStore</span>
            <h1 className="banner-title">Tous nos Produits</h1>
            <p className="banner-desc">Explorez notre sélection complète d'articles soigneusement choisis pour vous.</p>
          </div>
        </div>

        <div className="recommended-section mt-4 mb-3">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <div>
              <h2 className="section-heading mb-1">Recommandations & Catégories</h2>
              <p className="section-subheading text-muted mb-0">Découvrez nos articles par catégorie</p>
            </div>
            <span className="recommended-count badge bg-white text-dark border">
              {produitfilter.length} produit{produitfilter.length > 1 ? "s" : ""} disponible{produitfilter.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="category-filter-buttons mt-3">
            {CATEGORIES.map((cat) => {
              const count = cat.id === "all" 
                ? Featuredproducts.length 
                : Featuredproducts.filter((p) => p.category === cat.id).length;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`category-filter-btn ${isActive ? "active" : ""}`}
                  onClick={() => handleCategorySelect(cat.id)}
                >
                  <span className="category-filter-name">{cat.name}</span>
                  <span className="category-filter-count">
                    {count} {count > 1 ? "articles" : "article"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="product-grid mt-4">
          {produitfilter.map((product) => (
            <ItemCard 
              key={product.id} 
              product={product} 
              handelAddtoCart={handelAddtoCart} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
