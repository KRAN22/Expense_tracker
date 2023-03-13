import { Button, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddTransaction } from "./transaction_add";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import { EditTransaction } from "./transaction_edit";

export const Transaction = () => {
  const [list, setList] = useState([]);
  const [event, setEvent] = useState(false);
  const [edit, setEdit] = useState(false);
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [comments, setComments] = useState("");
  const [id, setId] = useState();

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
    console.log(id);
    const baseURL = `http://127.0.0.1:8000/api/transaction/deleteTransaction/${id}`;
    try {
      const response = await axios.delete(baseURL);
      if (response) {
        window.location.reload();
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const onClickEdit = (amount, date, comments, id) => {
    setEdit(true);
    setAmount(amount);
    setComments(comments);
    setDate(date);
    setId(id);
  };

  return (
    <>
      {edit ? (
        <EditTransaction transaction={{ amount, date, comments, id }} />
      ) : (
        <>
          {event ? (
            <AddTransaction />
          ) : (
            <Grid container item xs={12} sm={12} md={12}>
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
                  <Typography variant="h4">Transaction list</Typography>
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
                  }}
                >
                  <Grid item xs={2}>
                    <Typography p={1} variant="h6" color={"Blue"}>
                      CATEGORY
                    </Typography>
                    <Divider color={"black"} />
                  </Grid>
                  <Grid item xs={1}>
                    <Typography p={1} variant="h6" color={"Blue"}>
                      TYPE
                    </Typography>
                    <Divider color={"black"} />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography p={1} variant="h6" color={"Blue"}>
                      AMOUNT
                    </Typography>
                    <Divider color={"black"} />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography p={1} variant="h6" color={"Blue"}>
                      DATE
                    </Typography>
                    <Divider color={"black"} />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography p={1} variant="h6" color={"Blue"}>
                      COMMENTS
                    </Typography>
                    <Divider color={"black"} />
                  </Grid>
                  <Grid item xs={1}>
                    <Typography p={1} variant="h6" color={"Blue"}>
                      EDIT
                    </Typography>
                    <Divider color={"black"} />
                  </Grid>
                  <Grid item xs={2} color={"Blue"} boxSizing={"border-box"}>
                    <Typography pb={1} pt={1} variant="h6">
                      DELETE
                    </Typography>
                    <Divider color={"black"} />
                  </Grid>
                </Grid>
                {list.map((item) => {
                  return (
                    <Grid
                      item
                      container
                      key={item.id}
                      xs={12}
                      sm={11}
                      md={11}
                      margin={"Auto"}
                      sx={{
                        textAlign: "center",
                        background:
                          item.category.category_type === "Savings"
                            ? "#2E8B57"
                            : "#FF7F50",
                        color: "white",
                      }}
                    >
                      <Grid item xs={2}>
                        <Typography variant="h6">
                          {item.category.categoryName}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography variant="h6">
                          {item.category.category_type}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h6">{item.amount}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h6">
                          {getDateFormat(item.date)}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h6">{item.comments}</Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Button
                          onClick={() =>
                            onClickEdit(
                              item.amount,
                              item.date,
                              item.comments,
                              item.id
                            )
                          }
                        >
                          <EditIcon style={{ color: "white" }} />
                        </Button>
                      </Grid>
                      <Grid item xs={2}>
                        <Button onClick={() => OnClickDelete(item.id)}>
                          <DeleteTwoToneIcon sx={{ color: "white" }} />
                        </Button>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          )}
        </>
      )}
    </>
  );
};
