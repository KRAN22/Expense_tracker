import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

export const Summary = () => {
  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();
  const [list, setList] = useState([]);
  const [summaryList, setSummaryList] = useState([]);

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    const baseURL = "http://127.0.0.1:8000/api/transaction/";
    try {
      const response = await axios.get(baseURL);
      setList(response.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const onSearch = () => {
    const startDate = new Date(toDate);
    const endDate = new Date(fromDate);

    const from = startDate.getTime();
    const to = endDate.getTime();

    // Filter records within the date range
    const filteredRecords = list.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate.getTime() >= from && recordDate.getTime() <= to;
    });

    // const categoryNames = filteredRecords.map(
    //   (item) => item.category.categoryName
    // );

    const resultList = [];
    // Log the filtered records
    const salaryResult = filteredRecords.reduce(
      (acc, item) => {
        if (item.category.categoryName === "salary") {
          return {
            amount: acc.amount + item.amount,
            category_type: item.category.category_type,
            categoryName: item.category.categoryName,
          };
        } else {
          return acc;
        }
      },
      { amount: 0 }
    );
    console.log(salaryResult);
    resultList.push(salaryResult);

    const stocksResult = filteredRecords.reduce(
      (acc, item) => {
        if (item.category.categoryName === "stocks") {
          return {
            amount: acc.amount + item.amount,
            category_type: item.category.category_type,
            categoryName: item.category.categoryName,
          };
        } else {
          return acc;
        }
      },
      { amount: 0 }
    );
    resultList.push(stocksResult);
    setSummaryList(resultList);
  };

  const onChangeToDate = (e) => {
    setToDate(e.target.value);
  };

  const onChangeFromDate = (e) => {
    setFromDate(e.target.value);
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
        <Grid item container xs={12} p={2}>
          <Grid item xs={4} p={2} border={"1px solid"} textAlign={"center"}>
            <Typography>CATEGORY</Typography>
          </Grid>
          <Grid item xs={4} p={2} border={"1px solid"} textAlign={"center"}>
            <Typography>TYPE</Typography>
          </Grid>
          <Grid item xs={4} p={2} border={"1px solid"} textAlign={"center"}>
            <Typography>Amount</Typography>
          </Grid>
        </Grid>
        {summaryList.map((item) => {
          return (
            <Grid item container key={""} xs={12} p={2}>
              <Grid item xs={4} textAlign={"center"}>
                <Typography>{item.categoryName}</Typography>
              </Grid>
              <Grid item xs={4} textAlign={"center"}>
                <Typography>{item.category_type}</Typography>
              </Grid>
              <Grid item xs={4} textAlign={"center"}>
                <Typography>{item.amount}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
