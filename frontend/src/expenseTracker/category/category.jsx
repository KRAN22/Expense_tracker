import React from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./category.css";
import { useState } from "react";
import axios from "axios";
import { CategoryList } from "./categoryList";

export const Category = () => {
  const [categoryName, setCategoryName] = useState();

  const onChangeHandler = (e) => {
    setCategoryName(e.target.value);
  };

  const SubmitHandler = async () => {
    if (categoryName.length > 0) {
      const baseURL = "http://127.0.0.1:8000/api/category/addCategory";
      const body = { categoryName };
      try {
        const response = await axios.post(baseURL, body);
        if (response) {
          window.location.reload();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="category-main">
      <div className="category-add">
        <div className="box">
          <h1>Add your Category</h1>
          <div className="tag">
            <TextField
              id="outlined-basic"
              label="category"
              variant="outlined"
              type={"text"}
              onChange={onChangeHandler}
            />
          </div>
          <div className="tag">
            <Button
              id="category-Btn"
              variant="contained"
              onClick={SubmitHandler}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      <CategoryList />
    </div>
  );
};
