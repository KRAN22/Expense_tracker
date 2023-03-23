import { Grid, Typography, Divider } from "@mui/material";

export const SummaryCategoryType = (props) => {
  const list = props.list;
  return (
    <Grid container xs={6} p={2}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          color={"orangered"}
          sx={{ textDecoration: "underline" }}
          fontWeight={"Bold"}
        >
          OverAll Summary
        </Typography>
      </Grid>
      <Grid item container xs={12} margin={"Auto"} pt={3}>
        <Grid item xs={6} textAlign={"center"}>
          <Typography fontWeight={"Bold"}>CATEGORYTYPE</Typography>
          <Divider color={"black"} />
        </Grid>
        <Grid item xs={6} textAlign={"center"}>
          <Typography fontWeight={"Bold"}>AMOUNT</Typography>
          <Divider color={"black"} />
        </Grid>
      </Grid>
      {list?.map((item) => {
        return (
          <Grid
            item
            container
            key={item.category_type}
            xs={12}
            margin={"Auto"}
            p={2}
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
            <Grid item xs={6} textAlign={"center"}>
              <Typography>{item.category_type}</Typography>
            </Grid>
            <Grid item xs={6} textAlign={"center"}>
              <Typography>${item.amount}</Typography>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};
