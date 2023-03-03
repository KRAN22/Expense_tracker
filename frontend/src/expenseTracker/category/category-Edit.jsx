import "./category.css";
import { Grid, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

export const CategoryEdit = (props) => {
  const name = props.category.categoryName;
  const id = props.category.ids;
  const [categoryName, setCategoryName] = useState(name);

  const onChangeHandler = (e) => {
    setCategoryName(e.target.value);
  };

  const onClickSubmit = async () => {
    const baseURL = `http://127.0.0.1:8000/api/category/updateCategory/${id}`;
    const body = { categoryName };
    try {
      const response = await axios.put(baseURL, body);
      if (response) {
        window.location.reload();
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };
  return (
    <Grid
      item
      container
      p={2}
      xs={8}
      height={"90vh"}
      width={"30%"}
      margin="auto"
      mt={"30px"}
      sx={{ background: "#e3e3e3", borderRadius: "20px" }}
    >
      <Grid item xs={12} pt={"50px"} sx={{ textAlign: "center" }}>
        <Typography variant="h5">Edit your Category</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="category"
          variant="outlined"
          type={"text"}
          value={categoryName}
          onChange={onChangeHandler}
        />
      </Grid>
      <Grid xs={12}>
        <Button fullWidth variant="contained" onClick={onClickSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};
