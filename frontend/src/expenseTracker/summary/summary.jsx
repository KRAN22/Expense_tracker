import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { SummaryCategoryType } from "./overall_summary";

export const Summary = () => {
  const [start_date, setStart_date] = useState();
  const [end_date, setEnd_date] = useState();
  const [list, setList] = useState([]);
  const [event, setEvent] = useState(false);

  const onSearch = async () => {
    setEvent(true);
    const baseURL = `http://127.0.0.1:8000/api/summary/?start_date=${start_date}&end_date=${end_date}`;
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

  const onChangeToDate = (e) => {
    setStart_date(e.target.value);
  };

  const onChangeFromDate = (e) => {
    setEnd_date(e.target.value);
  };

  return (
    <Grid container xs={12} height={"100vh"} sx={{ overflowY: "scroll" }}>
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
            color={"orangered"}
            textAlign={"center"}
            fontWeight={"Bold"}
            sx={{ textDecoration: "underline" }}
          >
            Search Your Summary
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6} p={2}>
            <Typography>To Date</Typography>
            <TextField onChange={onChangeToDate} fullWidth type={"date"} />
          </Grid>
          <Grid item xs={6} p={2}>
            <Typography>From Date</Typography>
            <TextField fullWidth onChange={onChangeFromDate} type={"date"} />
          </Grid>
        </Grid>
        <Grid item xs={12} pr={2} margin={"Auto"}>
          <Button
            variant="contained"
            sx={{
              fontWeight: "bold",
              float: "right",
            }}
            onClick={onSearch}
          >
            Search
          </Button>
        </Grid>
        {event ? (
          <>
            <SummaryCategoryType list={list.overAllSummary} />
            <Grid item container xs={4} height={"15vh"} pt={2} pl={2}>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{ textDecoration: "underline" }}
                  color={"orangered"}
                  fontWeight={"Bold"}
                >
                  Bank Balance
                </Typography>
              </Grid>
              <Grid item container xs={12} pt={6}>
                <Grid
                  item
                  xs={6}
                  p={2}
                  fontWeight={"Bold"}
                  sx={{ background: "#AFB1AE" }}
                >
                  TotalBalance
                </Grid>
                <Grid
                  item
                  xs={6}
                  p={2}
                  sx={{ background: "#A8A9AD", color: "Black" }}
                >
                  ${list.bankBalance}
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} p={2}>
              <Grid item xs={12} pt={4}>
                <Typography
                  variant="h5"
                  color={"orangered"}
                  sx={{ textDecoration: "underline" }}
                  fontWeight={"Bold"}
                >
                  Category Summary
                </Typography>
              </Grid>
              <Grid item container xs={12} pt={0}>
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
              {list.categorySummary?.map((items) => {
                return (
                  <Grid
                    item
                    container
                    key={items.id}
                    xs={12}
                    p={2}
                    sx={{
                      textAlign: "center",
                      background:
                        items.category_type === "Savings"
                          ? "#A8A9AD"
                          : items.category_type === "Expense"
                          ? "#AFB1AE"
                          : "#D8D8D8",
                      color: "black",
                    }}
                  >
                    <Grid item xs={4}>
                      <Typography>{items.categoryName}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>{items.category_type}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>${items.amount}</Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Typography textAlign={"center"} color={"red"} variant="h4">
              *Please Search With Dates
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
