// src/components/Login.js
import React from "react";
import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
interface LoginResponse {
  token: string;
  message?: string;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data: LoginResponse = await response.json();
      if (response.ok) {
        // Save the token (e.g., in localStorage or a cookie)
        localStorage.setItem("token", data.token);

        console.log("Login successful");
        navigate("/admin");
      } else {
        if (response.status === 401) {
          setShowError("Invalid credentials"); // Show invalid credentials error
        } else {
          setShowError("Server error"); // Show network error
        }
      }
    } catch (err) {
      console.error(err);
      setShowError("Network error"); // Show error message
    }
  };

  return (
    <div className="login-head">
      <div className="login-container">
        <div className="header-container">
          <h1>Admin</h1>
        </div>
        <div className="login-body">
          <form onSubmit={handleLogin}>
            <div className="login-group">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                className="login-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="login-control"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </form>
          {showError && (
            <div className="error-box">
              {showError}
              <button className="close-button" onClick={() => setShowError("")}>
                x
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
