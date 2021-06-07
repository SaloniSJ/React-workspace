import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import TablePagination from '@material-ui/core/TablePagination';
import React, { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationControlled(props) {
  const classes = useStyles();
  return (
      <Fragment>
    {/* <div className={classes.root}> */}
      <Pagination variant="outlined" color="primary" count={props.total_pages} page={props.currentPage} onChange={props.handleChange} />
      {/* <TablePagination
      component="div"
      count={props.total_pages}
      page={props.currentPage}
      onChangePage={props.handleChange}
      rowsPerPage={props.number_of_elements}
      onChangeRowsPerPage={props.handleChangeRowsPerPage}
    /> */}
    {/* </div> */}
    </Fragment>
  );
}
