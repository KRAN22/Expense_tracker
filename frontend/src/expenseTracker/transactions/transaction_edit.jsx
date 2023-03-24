import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

export const EditTransaction = ({ transaction }) => {
  const id = transaction.id;
  console.log(transaction.list);
  const [amount, setAmount] = useState(transaction?.amount);
  const [date, setDate] = useState(transaction.date);
  const [comments, setComments] = useState(transaction.comments);
  const [category_type, setCategory_type] = useState(transaction.categoryType);

  const onChangeAmount = (e) => {
    setAmount(e.target.value);
  };
  const onChangeDate = (e) => {
    setDate(e.target.value);
  };
  const onChangeComments = (e) => {
    setComments(e.target.value);
  };
  const onChangeCategoryType = (e) => {
    setCategory_type(e.target.value);
  };

  const SubmitHandler = async () => {
    const baseUrl = `http://127.0.0.1:8000/api/transaction/editTransaction/${id}`;
    const body = { amount: +amount, date, comments, category_type };
    const token = localStorage.getItem("AccessToken");

    try {
      const response = await axios.put(baseUrl, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        window.location.reload();
      }
    } catch (e) {
      console.log(e.response.date);
    }
  };

  return (
    <Grid
      item
      container
      p={2}
      xs={5}
      height={"90vh"}
      margin="auto"
      mt={"30px"}
      sx={{ background: "#e3e3e3", borderRadius: "20px" }}
    >
      <Grid item xs={12} pt={"50px"} sx={{ textAlign: "center" }}>
        <Typography variant="h5">Edit your Transaction</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">CategoryType</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="categoryType"
            onChange={onChangeCategoryType}
          >
            <MenuItem value="Income">INCOME</MenuItem>
            <MenuItem value="Expense">EXPENSE</MenuItem>
            <MenuItem value="Savings">SAVINGS</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Amount"
          variant="outlined"
          type={"number"}
          value={amount}
          onChange={onChangeAmount}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          type={"date"}
          value={date}
          onChange={onChangeDate}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Comments"
          variant="outlined"
          type={"text"}
          value={comments}
          onChange={onChangeComments}
        />
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth variant="contained" onClick={SubmitHandler}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};
