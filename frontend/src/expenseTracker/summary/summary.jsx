import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const Summary = () => {
  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();

  const onChangeToDate = (e) => {
    console.log(e.target.value);
  };

  const onChangeFromDate = (e) => {
    console.log(e.target.value);
  };

  return (
    <Grid container xs={12} height={"100vh"}>
      <Grid
        item
        container
        xs={11}
        pb={5}
        sx={{ background: "white", borderRadius: "20px" }}
        margin={"Auto"}
      >
        <Grid item xs={12} sx={{ height: "75px" }}>
          <Typography
            variant="h5"
            p={2}
            textAlign={"center"}
            fontWeight={"Bold"}
          >
            Search Your Summary
          </Typography>
        </Grid>
        <Grid item xs={5} p={2}>
          <Typography>To Date</Typography>
          <TextField onChange={onChangeToDate} fullWidth type={"date"} />
        </Grid>
        <Grid item xs={5} p={2}>
          <Typography>From Date</Typography>
          <TextField fullWidth onChange={onChangeFromDate} type={"date"} />
        </Grid>
        <Grid item xs={2} pt={2.5} pr={2} margin={"Auto"} textAlign={"center"}>
          <Button
            fullWidth
            variant="contained"
            sx={{ color: "white", fontWeight: "bold", boxSizing: "borderBox" }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
