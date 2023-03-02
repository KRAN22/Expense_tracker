import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = { loggedIn: window.localStorage.getItem("AccessToken") };
  return user && user.loggedIn;
};

export const ProtectedRout = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={"/"} />;
};
