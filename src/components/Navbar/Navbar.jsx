import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiShoppingCart, CiUser, CiLogout, CiHeart } from "react-icons/ci";
import { IoIosSearch, IoMdClose, IoMdMenu } from "react-icons/io";
import { MdOutlineDashboard, MdOutlineCategory, MdKeyboardArrowDown } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import Logo from "../Brand/Logo";
import "./Navbar.css";

import { productAPI } from "../../services/api";
import formatPrice from "../../utils/formatPrice";

function Nav({ products: cartCount = 0 }) {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [catalogProducts, setCatalogProducts] = useState([]);
  const [userDropdown, setUserDropdown] = useState(false);
  const searchContainerRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    productAPI.getAll()
      .then((res) => {
        setCatalogProducts(res.data || []);
      })
      .catch((err) => {
        console.error("Erreur de récupération catalogue pour la recherche:", err);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchResults([]);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered = (catalogProducts || []).filter(
      (p) =>
        p &&
        (p.title?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q))
    );

    setSearchResults(filtered.slice(0, 6));
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleCategorySelect = (path) => {
    if (path) {
      navigate(path);
      setMenuOpen(false);
    }
  };

  return (
    <div className="navbar-wrapper">
      <div className="top-promo-bar">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="promo-text">
            <span>⚡ <strong>Livraison express 24-48h</strong> partout au Maroc | Retours gratuits sous 30 jours</span>
          </div>
          <div className="promo-contact d-none d-lg-flex align-items-center gap-3">
            <a href="tel:+212522000000" className="contact-link">
              <FaPhoneAlt className="me-1" /> +212 5 22 00 00 00
            </a>
            <span className="divider-sm">|</span>
            <Link to="/contact" className="contact-link">Besoin d'aide ?</Link>
          </div>
        </div>
      </div>

      <header className="nav-container">
        <div className="container">
          <div className="top-bar">
            <div className="logo-section">
              <Logo size="md" showTagline={true} />
            </div>

            <div className="input-search d-none d-lg-flex" ref={searchContainerRef}>
              <IoIosSearch className="search-icon-left" />
              <input
                type="text"
                placeholder="Rechercher des produits, marques, catégories..."
                value={searchQuery}
                onChange={handleSearch}
              />
              {searchQuery && (
                <button type="button" className="clear-search-btn" onClick={clearSearch}>
                  <IoMdClose />
                </button>
              )}
              {searchResults.length > 0 && (
                <div className="search-results-dropdown">
                  <div className="search-results-header">
                    Résultats trouvés ({searchResults.length})
                  </div>
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
                      <div className="search-result-info">
                        <p className="search-result-name">{product.title}</p>
                        <span className="search-result-cat">{product.category}</span>
                      </div>
                      <span className="search-result-price">
                        {formatPrice(product.newPrice || product.price)}
                      </span>
                    </Link>
                  ))}
                  <Link to="/produits" className="search-view-all" onClick={clearSearch}>
                    Voir tous les produits →
                  </Link>
                </div>
              )}
              {searchQuery && searchResults.length === 0 && (
                <div className="search-results-dropdown">
                  <p className="no-results">Aucun produit ne correspond à votre recherche</p>
                </div>
              )}
            </div>

            <div className="nav-actions">
              {isAuthenticated ? (
                <div className="user-profile-menu" ref={userMenuRef}>
                  <button
                    className="user-btn"
                    onClick={() => setUserDropdown(!userDropdown)}
                    type="button"
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                    ) : (
                      <div className="user-avatar-placeholder">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                    <span className="user-name d-none d-xl-inline">{user?.name}</span>
                    <span className="user-role-badge">
                      {isAdmin ? 'Admin' : 'Client'}
                    </span>
                  </button>

                  {userDropdown && (
                    <div className="user-dropdown-card">
                      <div className="dropdown-user-header">
                        <strong>{user?.name}</strong>
                        <small>{user?.email}</small>
                      </div>
                      <div className="dropdown-divider"></div>
                      {isAdmin ? (
                        <Link
                          to="/admin"
                          className="dropdown-link"
                          onClick={() => setUserDropdown(false)}
                        >
                          <MdOutlineDashboard className="me-2 text-warning" /> Tableau Admin
                        </Link>
                      ) : (
                        <Link
                          to="/dashboard"
                          className="dropdown-link"
                          onClick={() => setUserDropdown(false)}
                        >
                          <MdOutlineDashboard className="me-2 text-primary" /> Mon Espace Client
                        </Link>
                      )}
                      <button
                        className="dropdown-link logout-link"
                        onClick={() => {
                          logout();
                          setUserDropdown(false);
                          navigate('/');
                        }}
                      >
                        <CiLogout className="me-2 text-danger" /> Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="auth-buttons d-none d-md-flex align-items-center">
                  <Link to="/Connecter" className="btn-auth-login">
                    <CiUser className="auth-ico" /> Connexion
                  </Link>
                  <span className="auth-separator">/</span>
                  <Link to="/S'inscrire" className="btn-auth-register">
                    S'inscrire
                  </Link>
                </div>
              )}

              <Link to="/wishlist" className="wishlist-badge-btn" title="Mes Favoris (Wishlist)">
                <div className="wishlist-icon-wrapper">
                  <CiHeart className="wishlist-icon" />
                </div>
              </Link>

              <Link to="/cart" className="cart-badge-btn" title="Voir mon panier">
                <div className="cart-icon-wrapper">
                  <CiShoppingCart className="cart-icon" />
                  <span className="span-card">{cartCount}</span>
                </div>
              </Link>

              <button
                className="mobile-toggle-btn d-lg-none"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
                type="button"
              >
                {menuOpen ? <IoMdClose /> : <IoMdMenu />}
              </button>
            </div>
          </div>

          <div className="navbar-bottom-row d-none d-lg-flex align-items-center justify-content-between">
            <nav className="main-nav">
              <Link to="/home" className="nav-item-link">Accueil</Link>
              <Link to="/produits" className="nav-item-link">Tous les Produits</Link>
              <Link to="/Lesoffers" className="nav-item-link offers-link">
                Offres Spéciales <span className="hot-tag">Hot</span>
              </Link>
              <Link to="/services" className="nav-item-link">Nos Services</Link>
              <Link to="/contact" className="nav-item-link">Contact</Link>
            </nav>

            <div className="category-dropdown-container">
              <div className="dropdown-hover">
                <span className="category-toggle-btn">
                  <MdOutlineCategory className="cat-icon" />
                  Toutes les Catégories
                  <MdKeyboardArrowDown className="cat-arrow" />
                </span>
                <div className="dropdown-menu-custom">
                  <Link to="/vetments" className="dropdown-item">Mode & Vêtements</Link>
                  <Link to="/Electroniques" className="dropdown-item">Électronique & High-Tech</Link>
                  <Link to="/meubles" className="dropdown-item">Maison & Meubles</Link>
                  <Link to="/Sacetbagage" className="dropdown-item">Sacs & Maroquinerie</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-drawer d-lg-none">
            <div className="mobile-search mb-3">
              <div className="input-search w-100 m-0">
                <IoIosSearch className="search-icon-left" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              {searchResults.length > 0 && (
                <div className="search-results-dropdown mobile-results">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="search-result-item"
                      onClick={() => {
                        clearSearch();
                        setMenuOpen(false);
                      }}
                    >
                      <img src={product.img} alt={product.title} className="search-result-img" />
                      <div className="search-result-info">
                        <p className="search-result-name">{product.title}</p>
                        <span className="search-result-price">{formatPrice(product.newPrice || product.price)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mobile-category mb-3">
              <select
                onChange={(e) => handleCategorySelect(e.target.value)}
                className="mobile-category-select"
              >
                <option value="">Toutes les Catégories</option>
                <option value="/vetments">Mode & Vêtements</option>
                <option value="/Electroniques">Électronique & High-Tech</option>
                <option value="/meubles">Maison & Meubles</option>
                <option value="/Sacetbagage">Sacs & Maroquinerie</option>
              </select>
            </div>

            <nav className="mobile-nav">
              <Link to="/home" onClick={() => setMenuOpen(false)}>Accueil</Link>
              <Link to="/produits" onClick={() => setMenuOpen(false)}>Tous les Produits</Link>
              <Link to="/Lesoffers" onClick={() => setMenuOpen(false)}>Offres Spéciales</Link>
              <Link to="/wishlist" onClick={() => setMenuOpen(false)}>Mes Favoris (Wishlist)</Link>
              <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </nav>

            {isAuthenticated ? (
              <div className="mobile-auth-user mt-3 pt-3 border-top">
                <div className="d-flex align-items-center gap-2 mb-3">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="user-avatar" />
                  ) : (
                    <div className="user-avatar-placeholder">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <div className="d-flex flex-column text-start min-w-0">
                    <strong className="text-dark fs-6 text-truncate">{user?.name}</strong>
                    <small className="text-muted text-truncate">{user?.email}</small>
                  </div>
                </div>
                <div className="d-flex flex-column gap-2">
                  {isAdmin ? (
                    <Link
                      to="/admin"
                      className="btn btn-warning w-100 text-center fw-bold d-flex align-items-center justify-content-center"
                      onClick={() => setMenuOpen(false)}
                    >
                      <MdOutlineDashboard className="me-2" /> Tableau Admin
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      className="btn btn-outline-primary w-100 text-center fw-bold d-flex align-items-center justify-content-center"
                      onClick={() => setMenuOpen(false)}
                    >
                      <MdOutlineDashboard className="me-2" /> Mon Espace Client
                    </Link>
                  )}
                  <button
                    type="button"
                    className="btn btn-outline-danger w-100 text-center fw-bold d-flex align-items-center justify-content-center"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                      navigate('/');
                    }}
                  >
                    <CiLogout className="me-2" /> Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <div className="mobile-auth-actions mt-3 pt-3 border-top d-flex gap-2">
                <Link
                  to="/Connecter"
                  className="btn-auth-login w-50 justify-content-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  to="/S'inscrire"
                  className="btn-auth-register w-50 justify-content-center text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default Nav;
