import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import "./CSS/Login.css"; // Updated file name for specificity

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Login form submitted!");
  };

  const handleBackButtonClick = () => {
    navigate("/"); // Navigate back to home
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Log in to access your account</p>
        <form onSubmit={handleSubmit} className="login-form">

          <div className="login-form-group">
            <label className="login-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="login-input"
              required
            />
          </div>
          <div className="login-form-group">
            <label className="login-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="login-input"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          <button onClick={handleBackButtonClick} className="back-button">
            &larr; Back to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
