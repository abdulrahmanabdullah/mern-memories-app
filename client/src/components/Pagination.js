import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { useStyle } from "./style";
import { Link } from "react-router-dom";

const Paginate = ({ page }) => {
  const classes = useStyle();

  useEffect(() => {}, [page]);
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    />
  );
};

export default Paginate;
