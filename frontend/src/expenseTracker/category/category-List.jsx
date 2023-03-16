import EditIcon from "@mui/icons-material/Edit";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "./category";
import { CategoryEdit } from "./category-Edit";
import { Button, Divider, Grid, Typography } from "@mui/material";

export const CategoryList = () => {
  const [list, setList] = useState([]);
  const [event, setEvent] = useState(false);
  const [edit, setEdit] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [ids, setIds] = useState("");

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const baseURL = "http://127.0.0.1:8000/api/category/";
    try {
      const response = await axios.get(baseURL);
      setList(response.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const OnClickDelete = async (id) => {
    const baseURL = `http://127.0.0.1:8000/api/category/deleteCategory/${id}`;
    try {
      const response = await axios.delete(baseURL);
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
              <Grid item container xs={12} pb={2} margin={"Auto"}>
                <Grid item xs={12} pb={2} sx={{ textAlign: "center" }}>
                  <Typography variant="h4">Category list</Typography>
                </Grid>
                <Grid item xs={10} margin={"Auto"}>
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
                  sx={{ textAlign: "center", background: "white" }}
                >
                  <Grid item xs={2}>
                    <Typography variant="h6" color={"Blue"}>
                      ID
                    </Typography>
                    <Divider color={"Black"} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h6" color={"Blue"}>
                      CATEGORY_TYPE
                    </Typography>
                    <Divider color={"Black"} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h6" color={"Blue"}>
                      CATEGORYNAME
                    </Typography>
                    <Divider color={"Black"} />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6" color={"Blue"}>
                      EDIT
                    </Typography>
                    <Divider color={"Black"} />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6" color={"Blue"}>
                      DELETE
                    </Typography>
                    <Divider color={"Black"} />
                  </Grid>
                </Grid>
                <Divider color={"red"} />
                {list.map((item) => {
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
                            ? "#2E8B57"
                            : item.category_type === "Expense"
                            ? "#FF7F50"
                            : "#000000",
                        color: "white",
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
                          <EditIcon style={{ color: "white" }} />
                        </Button>
                      </Grid>
                      <Grid item xs={2}>
                        <Button onClick={() => OnClickDelete(item.id)}>
                          <DeleteTwoToneIcon style={{ color: "white" }} />
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
