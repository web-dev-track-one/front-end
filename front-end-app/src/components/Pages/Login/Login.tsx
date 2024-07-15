// src/components/Login.js
import React from "react";
import { useState, useEffect } from "react";
import "./Login.css";

interface LoginResponse {
  token: string;
  message?: string;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message === "Login successful") {
      const token = localStorage.getItem("token");
      if (token) {
        // Redirect or load admin page
        window.location.href = "/admin";
      }
    }
  }, [message]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data: LoginResponse = await response.json();
      if (response.ok) {
        // Save the token (e.g., in localStorage or a cookie)
        localStorage.setItem("token", data.token);
        setMessage("Login successful");
        // Redirect or load admin page
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to login");
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
        </div>
      </div>
    </div>
  );
};

export default Login;
