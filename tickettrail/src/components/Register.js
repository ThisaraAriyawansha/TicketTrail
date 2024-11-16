import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./CSS/Registration.css"; 

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer", // Default role
  });

  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form Data:", formData);
    alert("Registration successful!");
    navigate("/login");
  };

  const handleBackButtonClick = () => {
    navigate("/");
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h1 className="registration-title">Sign Up</h1>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="submit-button">Register</button>
        </form>

        <button onClick={handleBackButtonClick} className="back-button">
          &larr; Back to Home
        </button>
      </div>
    </div>
  );
};

export default Registration;
