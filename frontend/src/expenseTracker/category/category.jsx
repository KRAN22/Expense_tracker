import React from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./category.css";
import { useState, useEffect } from "react";
import axios from "axios";

export const Category = () => {
  const [categoryName, setCategoryName] = useState();
  const [list, setList] = useState([]);

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

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const baseURL = "http://127.0.0.1:8000/api/category/";
    try {
      const response = await axios.get(baseURL);
      setList(response.data);
    } catch (e) {
      console.log(e.response.data);
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
      <div className="category-list">
        <div className="list-box">
          <h1>Category list</h1>
          <div className="category-list-items">
            <div className="id">
              <h2>ID</h2>
            </div>
            <div className="category">
              <h2>CATEGORIES NAME</h2>
            </div>
          </div>
          <hr className="hr"></hr>
          <div>
            {list.map((item) => {
              return (
                <div key={item.id} className="category-list-items">
                  <div className="id">
                    <h2>{item.id}</h2>
                  </div>
                  <div className="category">
                    <h2>{item.categoryName}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
