import {
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export const AddTransaction = () => {
  const [list, setList] = useState([]);
  const [category_id, setCategory_id] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    const baseURL = "http://127.0.0.1:8000/api/category/user_id";
    const token = localStorage.getItem("AccessToken");
    try {
      const response = await axios.get(baseURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setList(response.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const handleChange = (e) => {
    setCategory_id(e.target.value);
  };

  const onChangeAmount = (e) => {
    setAmount(e.target.value);
  };
  const onChangeDate = (e) => {
    setDate(e.target.value);
  };
  const onChangeComments = (e) => {
    setComments(e.target.value);
  };

  const SubmitHandler = async () => {
    const baseURL = "http://127.0.0.1:8000/api/transaction/add_transaction";
    const token = localStorage.getItem("AccessToken");
    const body = { category_id, amount, date, comments };
    try {
      const response = await axios.post(baseURL, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        window.location.reload();
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <Grid container xs={12} height={"100vh"}>
      <Grid
        item
        container
        xs={5}
        p={3}
        height={"90vh"}
        margin={"Auto"}
        sx={{ background: "white" }}
      >
        <Grid item xs={12} p={2} textAlign={"center"}>
          <Typography variant="h5"> Add Your Transaction</Typography>
        </Grid>
        <Grid item xs={12} p={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="category"
              onChange={handleChange}
            >
              {list.map((items) => (
                <MenuItem value={items.id}>{items.categoryName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} p={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Amount"
            type={"number"}
            onChange={onChangeAmount}
          ></TextField>
        </Grid>
        <Grid item xs={12} p={2}>
          <TextField
            fullWidth
            variant="outlined"
            type={"date"}
            onChange={onChangeDate}
          ></TextField>
        </Grid>
        <Grid item xs={12} p={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Comments"
            type={"text"}
            onChange={onChangeComments}
          ></TextField>
        </Grid>
        <Grid item xs={12} p={2}>
          <Button fullWidth variant="contained" onClick={SubmitHandler}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
