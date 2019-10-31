import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TextField from "@material-ui/core/TextField";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "name", label: "Nazwa", minWidth: 350 },
  { id: "grams", label: "Gramatura", minWidth: 100 },
  {
    id: "fat",
    label: "Tłuszcz",
    minWidth: 150,
    align: "right",
    format: value => value.toFixed(2)
  },
  {
    id: "fiber",
    label: "Błonnik",
    minWidth: 150,
    align: "right",
    format: value => value.toFixed(2)
  },
  {
    id: "carbohydrates",
    label: "Węglodowany",
    minWidth: 150,
    align: "right",
    format: value => value.toFixed(2)
  }
];

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  tableWrapper: {
    maxHeight: 700,
    overflow: "auto"
  },
  head: {
    backgroundColor: "#f9f9f9",
    position: "sticky",
    top: 0
  },
  textField: {
    marginBottom: "2rem",
    marginTop: "0"
  },
  tableRow: {
    "&:hover": {
      cursor: "pointer"
    }
  },
  active: {
    background: "#f50057",
    fontWeight: "bold"
  }
});

export default function IngredientsTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [filter, setFilter] = React.useState("");
  const [active, setActive] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = ev => {
    setFilter(ev.target.value);
  };

  let items = props.dataSource.filter(el =>
    el.name.toUpperCase().includes(filter.toUpperCase())
  );

  return (
    <>
      <TextField
        id="standard-full-width"
        helperText="Szukaj po nazwie"
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
        fullWidth
        className={classes.textField}
        onChange={ev => handleChange(ev)}
      />
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className={classes.head}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items &&
                items
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        onClick={() => {
                          props.onClick(row);
                          setActive(row.id);
                        }}
                        className={
                          active === row.id ? classes.active : classes.tableRow
                        }
                      >
                        {columns.map(column => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </div>
        {props.dataSource && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={props.dataSource.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "previous page"
            }}
            nextIconButtonProps={{
              "aria-label": "next page"
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </>
  );
}
