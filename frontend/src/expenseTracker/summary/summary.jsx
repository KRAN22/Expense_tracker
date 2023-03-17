import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { SummaryCategoryType } from "./summary_category_type";

export const Summary = () => {
  const [start_date, setStart_date] = useState();
  const [end_date, setEnd_date] = useState();
  const [list, setList] = useState([]);

  const onSearch = async () => {
    const baseURL = `http://127.0.0.1:8000/api/summary/?start_date=${start_date}&end_date=${end_date}`;
    try {
      const response = await axios.get(baseURL);
      setList(response.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const onChangeToDate = (e) => {
    setStart_date(e.target.value);
  };

  const onChangeFromDate = (e) => {
    setEnd_date(e.target.value);
  };

  return (
    <Grid container xs={12} height={"100vh"}>
      <Grid
        item
        container
        xs={11}
        p={2}
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
        <Grid item container xs={12}>
          <Grid item xs={5} p={2}>
            <Typography>To Date</Typography>
            <TextField onChange={onChangeToDate} fullWidth type={"date"} />
          </Grid>
          <Grid item xs={5} p={2}>
            <Typography>From Date</Typography>
            <TextField fullWidth onChange={onChangeFromDate} type={"date"} />
          </Grid>

          <Grid
            item
            xs={2}
            pt={2.5}
            pr={2}
            margin={"Auto"}
            textAlign={"center"}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{
                color: "white",
                fontWeight: "bold",
                boxSizing: "borderBox",
              }}
              onClick={onSearch}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <SummaryCategoryType list={list.overAllSummary} />
        <Grid item container xs={12} pt={2}>
          <Grid item xs={4} pt={2} textAlign={"center"}>
            <Typography fontWeight={"Bold"}>CATEGORY</Typography>
            <Divider color={"black"} />
          </Grid>
          <Grid item xs={4} pt={2} textAlign={"center"}>
            <Typography fontWeight={"Bold"}>TYPE</Typography>
            <Divider color={"black"} />
          </Grid>
          <Grid item xs={4} pt={2} textAlign={"center"}>
            <Typography fontWeight={"Bold"}>Amount</Typography>
            <Divider color={"black"} />
          </Grid>
        </Grid>
        {list.categorySummary?.map((item) => {
          return (
            <Grid
              item
              container
              key={item.id}
              xs={12}
              p={1}
              sx={{
                textAlign: "center",
                background:
                  item.category_type === "Savings"
                    ? "#2E8B57"
                    : item.category_type === "Expense"
                    ? "#FF7F50"
                    : "#000000",
                color: "white",
              }}
            >
              <Grid item xs={4}>
                <Typography>{item.categoryName}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{item.category_type}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>${item.amount}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
