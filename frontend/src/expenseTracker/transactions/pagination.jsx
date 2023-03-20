import { Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";

export const TransactionPagination = ({
  totalPosts,
  postPerPage,
  setCurrentPage,
}) => {
  let page = 0;
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    page = i;
  }
  const onChangeHandler = (e) => {
    setCurrentPage(+e?.target?.textContent);
  };

  return (
    <Grid xs={5} margin={"Auto"}>
      <Pagination count={page} onChange={onChangeHandler} color="primary" />
    </Grid>
  );
};
