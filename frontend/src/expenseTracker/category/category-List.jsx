import EditIcon from "@mui/icons-material/Edit";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "./category";
import { CategoryEdit } from "./category-Edit";
import { Button, Divider, Grid, Typography } from "@mui/material";

export const CategoryList = () => {
  const [list, setList] = useState();
  const [event, setEvent] = useState(false);
  const [edit, setEdit] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [ids, setIds] = useState("");

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const baseURL = "http://127.0.0.1:8000/api/category/user_id";
    const token = localStorage.getItem("AccessToken");
    try {
      const response = await axios.get(baseURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setList(response.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  console.log(list);

  const OnClickDelete = async (id) => {
    const baseURL = `http://127.0.0.1:8000/api/category/deleteCategory/${id}`;
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

  const OnClickEvent = () => {
    setEvent(true);
  };
  const onClickEdit = (categoryName, id) => {
    setEdit(true);
    setCategoryName(categoryName);
    setIds(id);
  };

  return (
    <>
      {edit ? (
        <CategoryEdit category={{ categoryName, ids }} />
      ) : (
        <>
          {event ? (
            <Category />
          ) : (
            <Grid container xs={12}>
              <Grid item container xs={12} p={2} margin={"Auto"}>
                <Grid item xs={12} p={3} sx={{ textAlign: "center" }}>
                  <Typography variant="h4">Category List</Typography>
                </Grid>
                <Grid id item xs={10} margin={"Auto"}>
                  <Button
                    sx={{ float: "right" }}
                    variant="contained"
                    onClick={OnClickEvent}
                  >
                    Add Category
                  </Button>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid
                  item
                  container
                  xs={10}
                  margin={"Auto"}
                  sx={{
                    textAlign: "center",
                    background: "white",
                    border: "2px solid black",
                  }}
                >
                  <Grid item xs={2} p={1}>
                    <Typography variant="h6" color={"Blue"}>
                      ID
                    </Typography>
                  </Grid>
                  <Grid item xs={3} p={1}>
                    <Typography variant="h6" color={"Blue"}>
                      CATEGORY_TYPE
                    </Typography>
                  </Grid>
                  <Grid item xs={3} p={1}>
                    <Typography variant="h6" color={"Blue"}>
                      CATEGORYNAME
                    </Typography>
                  </Grid>
                  <Grid item xs={2} p={1}>
                    <Typography variant="h6" color={"Blue"}>
                      EDIT
                    </Typography>
                  </Grid>
                  <Grid item xs={2} p={1}>
                    <Typography variant="h6" color={"Blue"}>
                      DELETE
                    </Typography>
                  </Grid>
                </Grid>
                <Divider color={"red"} />
                {list?.map((item) => {
                  return (
                    <Grid
                      item
                      container
                      key={item.id}
                      xs={10}
                      margin={"Auto"}
                      sx={{
                        textAlign: "center",
                        background:
                          item.category_type === "Savings"
                            ? "#A8A9AD"
                            : item.category_type === "Expense"
                            ? "#AFB1AE"
                            : "#D8D8D8",
                        color: "black",
                      }}
                    >
                      <Grid item xs={2}>
                        <Typography variant="h6">{item.id}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h6">
                          {item.category_type}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h6">
                          {item.categoryName}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          onClick={() =>
                            onClickEdit(item.categoryName, item.id)
                          }
                        >
                          <EditIcon style={{ color: "black" }} />
                        </Button>
                      </Grid>
                      <Grid item xs={2}>
                        <Button onClick={() => OnClickDelete(item.id)}>
                          <DeleteTwoToneIcon style={{ color: "black" }} />
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
