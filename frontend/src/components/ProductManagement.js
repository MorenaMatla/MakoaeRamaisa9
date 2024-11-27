import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductManagement.css';

const ProductManagement = ({ setProducts }) => { 
  const [products, setLocalProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products using fetch API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setLocalProducts(data);
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Error fetching products');
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const response = await fetch(`http://localhost:5000/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        setEditingProduct(null);
      } else {
        const response = await fetch('http://localhost:5000/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
      }
      fetchProducts();
      setNewProduct({ name: '', description: '', price: '', quantity: '' });
      setError('');
    } catch (err) {
      console.error('Error adding/updating product:', err);
      setError('Error adding/updating product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleSellProduct = async (id) => {
    const product = products.find((p) => p.id === id);
    if (product && product.quantity > 0) {
      const updatedQuantity = product.quantity - 1;
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...product,
            quantity: updatedQuantity,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to update product quantity');
        }
        fetchProducts();
      } catch (err) {
        console.error('Error selling product:', err);
        setError('Error selling product');
      }
    } else {
      setError('Product is out of stock');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Error deleting product');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="product-management" id="product-management-container" style={{ position: 'relative' }}>
      {/* Background Video */}
      <video
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
        autoPlay
        loop
        
      >
        <source src="/res.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <header className="header" id="product-management-header">
        <h2>Product Management</h2>
        <nav className="navigation" id="product-management-nav">
          <ul>
            <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
            <li><Link to="/users" className="nav-link">User Management</Link></li>
          </ul>
          <button onClick={handleLogout} className="logout-button" id="logout-button">Logout</button>
        </nav>
      </header>

      {error && <p className="error" id="error-message">{error}</p>}
      <form onSubmit={handleAddProduct} className="product-form" id="product-form">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="product-input"
          id="product-name"
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="product-input"
          id="product-description"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          step="0.01"
          required
          className="product-input"
          id="product-price"
        />
        <input
          type="number"
          name="quantity"
          value={newProduct.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
          className="product-input"
          id="product-quantity"
        />
        <button type="submit" className="product-button" id="submit-button">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <h3>Product List</h3>
      <div className="product-table-container" id="product-table-container">
        <table className="product-table" id="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="product-row">
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button onClick={() => handleEditProduct(product)} className="action-button edit-button">Edit</button>
                  <button onClick={() => handleSellProduct(product.id)} className="action-button sell-button">Sell</button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="action-button delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
