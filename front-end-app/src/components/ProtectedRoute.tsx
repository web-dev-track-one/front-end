import React, { Dispatch, SetStateAction } from "react";
import { Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ComponentType<any>;
  token: string | null;
  setAuthToken: Dispatch<SetStateAction<string | null>>;
}

const ProtectedRoute = ({
  element: Component,
  token,
  ...rest
}: ProtectedRouteProps) => {
  let location = useLocation();

  return token ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
