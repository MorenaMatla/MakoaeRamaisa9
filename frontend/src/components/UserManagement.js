import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Error fetching users');
    }
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Error adding user');
      }

      setNewUser({ username: '', password: '' });
      fetchUsers();
    } catch (err) {
      setError('Error adding user');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ username: user.username, password: '' });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Error updating user');
      }

      setEditingUser(null);
      setNewUser({ username: '', password: '' });
      fetchUsers();
    } catch (err) {
      setError('Error updating user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting user');
      }

      fetchUsers();
    } catch (err) {
      setError('Error deleting user');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="user-management" id="user-management-container" style={{ position: 'relative' }}>
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

      <header className="header" id="user-management-header">
        <h2 id="user-management-title">User Management</h2>
        <nav className="navigation" id="user-management-nav">
          <ul>
            <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
            <li><Link to="/products" className="nav-link">Product Management</Link></li>
          </ul>
          <button onClick={handleLogout} className="logout-button" id="user-management-logout">Logout</button>
        </nav>
      </header>
      
      {error && <p className="error" id="user-management-error">{error}</p>}
      
      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="user-form" id="user-management-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleInputChange}
          required
          className="user-input"
          id="user-input-username"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
          required
          className="user-input"
          id="user-input-password"
        />
        <button type="submit" className="user-button" id="user-form-submit">
          {editingUser ? 'Update User' : 'Add User'}
        </button>
      </form>

      <table className="user-table" id="user-management-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="user-row">
              <td>{user.username}</td>
              <td>
                <button onClick={() => handleEditUser(user)} className="action-button edit-button">Edit</button>
                <button onClick={() => handleDeleteUser(user.id)} className="action-button delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
