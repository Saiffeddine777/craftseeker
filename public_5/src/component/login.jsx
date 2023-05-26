import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission

    if (admin.email === 'admin@gmail.com' && admin.password === '123') {
      navigate('/home'); // Navigate to the home component
    } else {
      alert('Invalid credentials'); // Show error message for invalid login
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label><br />
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
        />
        <br />
        <label htmlFor="password">Password</label><br />
        <input
          type="password"
          id="password"
          name="password"
          required
          autoComplete="off"
          onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
        />
        <br />
        <input className='button' type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
