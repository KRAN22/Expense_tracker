import { Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";

export const TransactionPagination = ({ totalPosts, limit, setPage }) => {
  let page = 0;
  for (let i = 1; i <= Math.ceil(totalPosts / limit); i++) {
    page = i;
  }
  const onChangeHandler = (e) => {
    setPage(+e.target.textContent);
  };

  return (
    <Grid xs={5} margin={"Auto"}>
      <Pagination count={page} onChange={onChangeHandler} color="primary" />
    </Grid>
  );
};
