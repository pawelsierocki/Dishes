import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    marginLeft: "auto",
    marginRight: "auto",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const calculateAge = birthdayDate => {
  const diff = Date.now() - new Date(birthdayDate).getTime();
  const ageDate = new Date(diff);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default function SimpleTable(props) {
  const classes = useStyles();
  const { patients } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Telephone</TableCell>
            <TableCell align="right">Sex</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.data.fullName}
              </TableCell>
              <TableCell align="right">{calculateAge(row.data.date)}</TableCell>
              <TableCell align="right">{row.data.city}</TableCell>
              <TableCell align="right">{row.data.telephoneNumber}</TableCell>
              <TableCell align="right">{row.data.sex}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
