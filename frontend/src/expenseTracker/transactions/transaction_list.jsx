import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddTransaction } from "./transaction_add";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import { EditTransaction } from "./transaction_edit";
import { TransactionPagination } from "./pagination";

export const Transaction = () => {
  const [list, setList] = useState([]);
  const [event, setEvent] = useState(false);
  const [edit, setEdit] = useState(false);
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [comments, setComments] = useState("");
  const [id, setId] = useState();
  const [categoryType, setCategoryType] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimitPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState();

  useEffect(() => {
    getTransaction();
  }, [page]);

  const getTransaction = async () => {
    const baseURL = `http://127.0.0.1:8000/api/transaction/user_id/?limit=${limit}&page=${page}`;
    const token = localStorage.getItem("AccessToken");
    try {
      const response = await axios.get(baseURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalPosts(response.data.count);
      setList(response.data.date);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const OnClickEvent = () => {
    setEvent(true);
  };

  const getDateFormat = (str) => {
    const dateStr = str.split("T")[0];
    const parts = dateStr.split("-");
    const date = parts[2] + "-" + parts[1] + "-" + parts[0];
    return date;
  };

  const OnClickDelete = async (id) => {
    const baseURL = `http://127.0.0.1:8000/api/transaction/deleteTransaction/${id}`;
    const token = localStorage.getItem("AccessToken");
    try {
      const response = await axios.delete(baseURL, {
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

  const onClickEdit = (amount, date, comments, id, categoryType) => {
    setEdit(true);
    setAmount(amount);
    setComments(comments);
    setDate(date);
    setId(id);
    setCategoryType(categoryType);
  };

  return (
    <>
      {edit ? (
        <EditTransaction
          transaction={{ amount, date, comments, id, categoryType }}
        />
      ) : (
        <>
          {event ? (
            <AddTransaction />
          ) : (
            <Grid container item xs={12} sm={12} md={12} height={"100%"}>
              <Grid
                item
                container
                xs={12}
                sm={11}
                md={11}
                pb={2}
                margin={"Auto"}
              >
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography variant="h4" p={2}>
                    Transaction List
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    sx={{ float: "right" }}
                    variant="contained"
                    onClick={OnClickEvent}
                  >
                    Add Transaction
                  </Button>
                </Grid>
              </Grid>
              <Grid item container xs={12} sm={12} md={12}>
                <Grid
                  item
                  container
                  xs={12}
                  sm={11}
                  md={11}
                  margin={"Auto"}
                  sx={{
                    textAlign: "center",
                    background: "white",
                    boxSizing: "border-box",
                    border: "2px solid black",
                  }}
                >
                  <Grid item xs={2}>
                    <Typography p={1} variant="h6" color={"Blue"}>
                      CATEGORY
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography p={1} variant="h6" color={"Blue"}>
                      TYPE
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography p={1} variant="h6" color={"Blue"}>
                      AMOUNT
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography p={1} variant="h6" color={"Blue"}>
                      DATE
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography p={1} variant="h6" color={"Blue"}>
                      COMMENTS
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography p={1} variant="h6" color={"Blue"}>
                      EDIT
                    </Typography>
                  </Grid>
                  <Grid item xs={2} color={"Blue"} boxSizing={"border-box"}>
                    <Typography pb={1} pt={1} variant="h6">
                      DELETE
                    </Typography>
                  </Grid>
                </Grid>
                {list?.map((items) => {
                  return (
                    <Grid
                      item
                      container
                      key={items.id}
                      xs={12}
                      sm={11}
                      md={11}
                      margin={"Auto"}
                      sx={{
                        textAlign: "center",
                        background:
                          items.category.category_type === "Savings"
                            ? "#A8A9AD"
                            : items.category.category_type === "Expense"
                            ? "#AFB1AE"
                            : "#D8D8D8",
                        color: "black",
                      }}
                    >
                      <Grid item xs={2}>
                        <Typography variant="h6">
                          {items.category.categoryName}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography variant="h6">
                          {items.category.category_type}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h6">{items.amount}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h6">
                          {getDateFormat(items.date)}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h6">{items.comments}</Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Button
                          onClick={() =>
                            onClickEdit(
                              items.amount,
                              items.date,
                              items.comments,
                              items.id,
                              items.category.category_type
                            )
                          }
                        >
                          <EditIcon style={{ color: "black" }} />
                        </Button>
                      </Grid>
                      <Grid item xs={2}>
                        <Button onClick={() => OnClickDelete(items.id)}>
                          <DeleteTwoToneIcon sx={{ color: "black" }} />
                        </Button>
                      </Grid>
                    </Grid>
                  );
                })}
                <Grid item xs={5} p={2} margin={"Auto"}>
                  <TransactionPagination
                    totalPosts={totalPosts}
                    limit={limit}
                    setPage={setPage}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </>
  );
};
