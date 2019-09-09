import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Edit from "@material-ui/icons/Edit";
import PriorityHigh from "@material-ui/icons/NotificationsNone";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    marginLeft: "auto",
    marginRight: "auto",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  row: {
    transition: "all .5s",
    "&:hover": {
      backgroundColor: "#f9f9f9"
    }
  },
  actionIcon: {
    transition: "all .5s",
    "&:hover": {
      cursor: "pointer",
      color: "#0066cc"
    }
  },
  link: {
    color: "#000",
    textDecoration: "none"
  },
  warning: {
    color: "red",
    fontSize: "18px",
    marginLeft: ".5rem"
  },
  popover: {
    pointerEvents: "none"
  },
  paper: {
    padding: theme.spacing(1)
  },
  centerRow: {
    display: "flex",
    alignItems: "center"
  },
  center: {
    display: "flex",
    alignItems: "center"
  },
  tooltipText: {
    fontSize: "12px",
    fontStyle: "italic",
    color: "red"
  }
}));

const calculateAge = birthdayDate => {
  const diff = Date.now() - new Date(birthdayDate).getTime();
  const ageDate = new Date(diff);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

function SimpleTable(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const { patients } = props;

  function handlePopoverOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handlePopoverClose() {
    setAnchorEl(null);
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Pacjent</TableCell>
            <TableCell align="right">Wiek</TableCell>
            <TableCell align="right">Miasto</TableCell>
            <TableCell align="right">Telefon</TableCell>
            <TableCell align="right">Płeć</TableCell>
            <TableCell align="right">Akcje</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((row, index) => (
            <TableRow className={classes.row} key={row.id}>
              <TableCell component="th" scope="row">
                <div className={classes.center}>
                  {row.data.fullName}
                  {!row.data.interview && (
                    <PriorityHigh
                      className={classes.warning}
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                    />
                  )}
                </div>
              </TableCell>
              <TableCell align="right">{calculateAge(row.data.date)}</TableCell>
              <TableCell align="right">{row.data.city}</TableCell>
              <TableCell align="right">{row.data.telephoneNumber}</TableCell>
              <TableCell align="right">{row.data.sex}</TableCell>
              <TableCell align="right">
                <Link
                  to={`/dietetic/patients/id/${row.id}`}
                  className={classes.link}
                  onClick={() => props.setActivePatient(row)}
                >
                  <Edit
                    className={classes.actionIcon}
                    onClick={() => props.setActivePatient(row)}
                  />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography className={classes.tooltipText}>
          Wywiad żywieniowy nie został jeszcze przeprowadzony. Przejdź do szczegółów pacjenta aby wypełnić ankietę.
        </Typography>
      </Popover>
    </Paper>
  );
}

SimpleTable.propTypes = {
  patients: PropTypes.array.isRequired
};

export default SimpleTable;
