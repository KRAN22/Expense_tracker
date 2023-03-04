import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

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
    <Grid container xs={12} height={"100vh"} margin={"Auto"}>
      <Grid
        item
        container
        xs={4}
        height={"90vh"}
        p={2}
        sx={{
          background: "white",
          margin: "Auto",
          borderRadius: "30px",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" pt={"40px"} sx={{ textAlign: "center" }}>
            Add Your Category
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="category"
            variant="outlined"
            type={"text"}
            onChange={onChangeHandler}
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" onClick={SubmitHandler}>
            Add
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
