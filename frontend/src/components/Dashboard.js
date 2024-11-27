// src/components/Dashboard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductBarChart from './ProductBarChart';
import './Dashboard.css';

const Dashboard = ({ products }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? 'N/A' : numericPrice.toFixed(2);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div className="dashboard-container" id="dashboard-container">
      {/* Background Video */}
      <video className="background-video" autoPlay loop id="background-video">
        <source src="/res.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="dashboard-content" id="dashboard-content">
        <header className="dashboard-header" id="dashboard-header">
          <h2>Dashboard</h2>
          <nav className="dashboard-nav" id="dashboard-nav">
            <Link to="/products" className="nav-link" id="nav-link-products">Product Management</Link>
            <Link to="/users" className="nav-link" id="nav-link-users">User Management</Link>
            <button onClick={handleLogout} className="logout-btn" id="logout-btn">Logout</button>
          </nav>
        </header>

        <section className="dashboard-main" id="dashboard-main">
          <h3 id='myh3'>Products Overview</h3>
          {products.length === 0 ? (
            <p id="no-products-message">No products have been added yet.</p>
          ) : (
            <div className="dashboard-data" id="dashboard-data">
              <div className="chart-container" id="chart-container">
                <ProductBarChart products={products} />
              </div>

              {/* Images Container beneath the graph */}
            </div>
          )}
        </section>
      </div>
      <div className="images-container" id="images-container">
                <img src="/1Braai.jpeg" alt="Product 1" className="product-image" id="product-image-1" />
                <img src="/2Steers.webp" alt="Product 2" className="product-image" id="product-image-2" />
                <img src="/3pizza.jpg" alt="Product 3" className="product-image" id="product-image-3" />
                <img src="/4Steak.jpg" alt="Product 4" className="product-image" id="product-image-4" />
                <img src="/5drumstick.jpg" alt="Product 5" className="product-image" id="product-image-5" />
              </div>

      <footer className="footer" id="footer">
        <div className="footer-content" id="footer-content">
          <div className="footer-links" id="footer-links">
            <Link to="#" className="footer-link" id="footer-link-about">About</Link>
            <Link to="#" className="footer-link" id="footer-link-privacy">Privacy Policy</Link>
            <Link to="#" className="footer-link" id="footer-link-terms">Terms of Service</Link>
            <Link to="#" className="footer-link" id="footer-link-contact">Contact</Link>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} Wings_cafe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
