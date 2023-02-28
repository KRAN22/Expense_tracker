import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "../loginPage/login";
import { SignUp } from "../loginPage/signup";

export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/signUp" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
};
