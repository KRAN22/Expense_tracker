import { Grid, Typography, Divider } from "@mui/material";

export const SummaryCategoryType = (props) => {
  const list = props.list;

  return (
    <Grid container xs={6} margin={"Auto"}>
      <Grid item xs={12} textAlign={"center"}>
        <Typography variant="h5" fontWeight={"Bold"}>
          Category_Type Summary
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
            xs={12}
            margin={"Auto"}
            p={2}
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
