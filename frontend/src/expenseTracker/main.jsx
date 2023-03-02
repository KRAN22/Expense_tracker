import React from "react";
import "./main.css";
import image from "../image/image1.png";
import { Link, Outlet } from "react-router-dom";

export const ExpenseTracker = () => {
  return (
    <div className="ex-main">
      <div className="ex-sidebar">
        <div className="ex-sidebar-body">
          <div className="ex-image">
            <img src={image} alt="people" />
            <h5>Hello,kranthi</h5>
            <hr className="hr"></hr>
          </div>
          <div className="ex-categories">
            <Link to={"/expenseTracker/category"}>Category</Link>
          </div>
        </div>
      </div>
      <div className="ex-header">
        <Outlet />
      </div>
    </div>
  );
};
