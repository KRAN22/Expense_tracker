import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export const Transaction = () => {
  const [list, setList] = useState();

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    const baseURL = "http://127.0.0.1:8000/app/transaction/";
    try {
      const response = await axios.get(baseURL);
      setList(response.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };
  console.log(list);

  return (
    <Grid container xs={12}>
      <Grid item container xs={10} p={2} margin={"Auto"}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h4">Transaction list</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained">Add Transaction</Button>
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
            <Typography variant="h6">ID</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">CATEGORY_ID</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">AMOUNT</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">DATE</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">COMMENTS</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

// {list.map((item, index) => {
//   return (
//     <Grid
//       item
//       container
//       key={index}
//       xs={10}
//       margin={"Auto"}
//       sx={{ textAlign: "center", background: "white" }}
//     >
//       <Grid item xs={2}>
//         <Typography variant="h6">{item.id}</Typography>
//       </Grid>
//       <Grid item xs={2}>
//         <Typography variant="h6">{item.category_id}</Typography>
//       </Grid>
//       <Grid item xs={2}>
//         <Typography variant="h6">{item.amount}</Typography>
//       </Grid>
//       <Grid item xs={2}>
//         <Typography variant="h6">{item.date}</Typography>
//       </Grid>
//     </Grid>
//   );
// })}
