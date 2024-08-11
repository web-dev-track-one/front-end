import React from "react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface ProtectedRouteProps {
  element: React.ComponentType<any>;
  token: string | null;
}

const ProtectedRoute = ({
  element: Component,
  token,
  ...rest
}: ProtectedRouteProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (token) {
          // Send a request to the server to verify token validity
          const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/auth/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            // If token is invalid, clear it locally and redirect to login
            localStorage.removeItem("token");
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    verifyToken();
  }, [token]);

  return token ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
