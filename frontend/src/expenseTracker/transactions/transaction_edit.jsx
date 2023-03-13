import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export const EditTransaction = (props) => {
  const transaction = props.transaction;
  const [amount, setAmount] = useState(transaction.amount);
  const [date, setDate] = useState(transaction.date);
  const [comments, setComments] = useState(transaction.comments);

  const onChangeAmount = (e) => {
    setAmount(e.target.value);
  };
  const onChangeDate = (e) => {
    setDate(e.target.value);
  };
  const onChangeComments = (e) => {
    setComments(e.target.value);
  };

  const SubmitHandler = async (id) => {
    const baseUrl = `http://127.0.0.1:8000/api/transaction/editTransaction/${id}`;
    const body = { amount, date, comments };
    try {
      const response = await axios.put(baseUrl, body);
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
      xs={9}
      height={"90vh"}
      width={"30%"}
      margin="auto"
      mt={"30px"}
      sx={{ background: "#e3e3e3", borderRadius: "20px" }}
    >
      <Grid item xs={12} pt={"50px"} sx={{ textAlign: "center" }}>
        <Typography variant="h5">Edit your Transaction</Typography>
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
