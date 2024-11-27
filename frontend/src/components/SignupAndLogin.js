import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyStyle.css';

const SignupAndLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }

      const data = await response.json();

      if (isLogin) {
        console.log('Login successful:', data);
        navigate('/dashboard');
      } else {
        console.log('Signup successful');
        navigate('/login');
      }
    } catch (err) {
      setError('Error: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <div className="signup-login-container" id="auth-container">
      {/* Background Video */}
      <video
        className="background-video"
        autoPlay
        loop
        
      >
        <source src="/res.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Authentication Form */}
      <h2 className="auth-title" id="auth-title">{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit} className="auth-form" id="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
          id="auth-input-username"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          id="auth-input-password"
          required
        />
        <button type="submit" className="auth-button" id="auth-submit-button">
          {isLogin ? 'Login' : 'Signup'}
        </button>
      </form>
      {error && <p className="error-message" id="auth-error">{error}</p>}
      <p className="auth-toggle" id="auth-toggle">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button onClick={() => setIsLogin(!isLogin)} className="auth-toggle-button" id="auth-toggle-button">
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </p>
    </div>
  );
};

export default SignupAndLogin;
