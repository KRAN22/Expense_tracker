import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "../loginPage/login";
import { SignUp } from "../loginPage/signup";
import { ExpenseTracker } from "../expenseTracker/main";
import { ProtectedRout } from "../protectedRout";
import { CategoryList } from "../expenseTracker/category/category-List";
import { Transaction } from "../expenseTracker/transactions/transaction_list";
import { Summary } from "../expenseTracker/summary/summary";

export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route element={<ProtectedRout />}>
          <Route path="/expenseTracker" element={<ExpenseTracker />}>
            <Route path="/expenseTracker/category" element={<CategoryList />} />
            <Route
              path="/expenseTracker/transaction"
              element={<Transaction />}
            />
            <Route path="/expenseTracker/summary" element={<Summary />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
