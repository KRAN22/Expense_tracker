import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "../loginPage/login";

export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
};
