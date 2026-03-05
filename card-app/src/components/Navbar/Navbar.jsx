
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/shop3.png";
import "./Navbar.css";

import products from "../../data/products";
import Featuredproducts from "../../data/featuredProducts";
import formatPrice from "../../utils/formatPrice";

function Nav({ products: cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    const path = e.target.value;
    if (path) {
      navigate(path);
      setMenuOpen(false); // Close mobile menu if open
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle search input change
  const handleSearch = (e) => {
  try {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const safeProducts = Array.isArray(products) ? products : [];
    const safeFeatured = Array.isArray(Featuredproducts) ? Featuredproducts : [];

    const allProducts = [
      ...safeProducts,
      ...safeFeatured.filter(fp => !safeProducts.some(p => p?.id === fp?.id)),
    ];

    const filteredResults = allProducts.filter(
      (product) =>
        product &&
        (product.title?.toLowerCase().includes(query) ||
         product.category?.toLowerCase().includes(query) ||
         product.brand?.toLowerCase().includes(query))
    );

    setSearchResults(filteredResults);
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    setSearchResults([]);
  }
};


  // Clear search results
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="">
      <div className="top-promo-bar ">
        Livraison gratuite à partir de 20dh | Retours faciles sous 30 jours
      </div>

      <header className="nav-container">
        <div className="top-bar">
          <div className="logo">
            <img src={logo} alt="logo" className="img-logo" />
          </div>

          <nav className="main-nav d-none d-md-flex">
            <Link to="/home">Home</Link>
            <Link to="/produits">Produits</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
            <div className="nav-item dropdown-hover">
              <span className="nav-link dropdown-toggle">Catégories</span>
              <div className="dropdown-menu-custom">
                <Link to="/vetments" className="dropdown-item">Vêtements</Link>
                <Link to="/Electroniques" className="dropdown-item">Électroniques</Link>
                <Link to="/meubles" className="dropdown-item">Meubles</Link>
                <Link to="/Sacetbagage" className="dropdown-item">Sacs et Bagages</Link>
              </div>
            </div>
          </nav>

          <div className="input-search d-none d-md-flex">
            <input
              type="text"
              placeholder="chercher...."
              value={searchQuery}
              onChange={handleSearch}
            />
            <button>
              <IoIosSearch />
            </button>
            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="search-results-dropdown">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="search-result-item"
                    onClick={clearSearch}
                  >
                    <img
                      src={product.img}
                      alt={product.title}
                      className="search-result-img"
                    />
                    <div>
                      <p>{product.title}</p>
                      <p className="search-result-price">{formatPrice(product.newPrice || product.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {searchQuery && searchResults.length === 0 && (
              <div className="search-results-dropdown">
                <p className="no-results">Aucun produit trouvé</p>
              </div>
            )}
          </div>

          <div className="user-menu me-2 d-none d-md-flex">
            <div className="auth-links">
              <AiOutlineUserAdd className="nav-icon" />
              <Link to="/Connecter" className="nav-link">
                Se connecter
              </Link>
              <span className="separator">/</span>
              <Link to="/S'inscrire" className="nav-link">
                S'inscrire
              </Link>
            </div>

            <Link to="/cart" className="cart-link nav-link ms-3">
              <CiShoppingCart className="nav-icon1" />
              <span className="span-card">{cartCount}</span>
            </Link>
          </div>

          <button className="menu-toggle d-md-none" onClick={toggleMenu}>
            {menuOpen ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
          </button>
        </div>

        {/* MENU RESPONSIVE MOBILE */}
        {menuOpen && (
          <div className="mobile-menu d-md-none">
            <nav className="mobile-nav">
              <Link to="/home" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/produits" onClick={toggleMenu}>
                Produits
              </Link>
              <Link to="/services" onClick={toggleMenu}>
                Services
              </Link>
              <Link to="/contact" onClick={toggleMenu}>
                Contact
              </Link>
              <select className="mobile-category-select mx-3 mt-2" onChange={handleCategoryChange}>
                 <option value="">Catégories</option>
                 <option value="/vetments">Vêtements</option>
                 <option value="/Electroniques">Électroniques</option>
                 <option value="/meubles">Meubles</option>
                 <option value="/Sacetbagage">Sacs et Bagages</option>
              </select>
            </nav>

            <div className="input-search">
              <input
                type="text"
                placeholder="chercher...."
                value={searchQuery}
                onChange={handleSearch}
              />
              <button>
                <IoIosSearch />
              </button>
              {/* Mobile Search Results */}
              {searchResults.length > 0 && (
                <div className="search-results-dropdown">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="search-result-item"
                      onClick={() => {
                        toggleMenu();
                        clearSearch();
                      }}
                    >
                      <img
                        src={product.img}
                        alt={product.title}
                        className="search-result-img"
                      />
                       <div>
                        <p>{product.title}</p>
                        <p className="search-result-price">{formatPrice(product.newPrice || product.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {searchQuery && searchResults.length === 0 && (
                <div className="search-results-dropdown">
                  <p className="no-results">Aucun produit trouvé</p>
                </div>
              )}
            </div>

            <div className="mobile-auth">
              <Link
                to="/Connecter"
                className="auth-link"
                onClick={toggleMenu}
              >
                Se connecter
              </Link>
              <span className="separator">/</span>
              <Link
                to="/S'inscrire"
                className="auth-link"
                onClick={toggleMenu}
              >
                S'inscrire
              </Link>
              <Link to="/cart" className="auth-link" onClick={toggleMenu}>
                <CiShoppingCart className="nav-icon1" />
                <span className="span-card">{cartCount}</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Nav;
