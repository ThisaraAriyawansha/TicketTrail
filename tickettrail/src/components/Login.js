import React from "react";

const Login = () => {
  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <p>Welcome back! Log in to access your account.</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
};

export default Login;
