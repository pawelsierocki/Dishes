import React from "react";
import { Link } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AccessibilityNew from "@material-ui/icons/AccessibilityNew";
import Storage from "@material-ui/icons/Storage";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100%"
  },
  "@media only screen and (max-width: 600px)": {
    root: {
      marginTop: "-.5rem"
    }
  }
});

export default function Submenu() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="Icon label tabs example"
      >
        <Tab
          icon={<AccessibilityNew />}
          label="PACJENCI"
          component={Link}
          to={"/dietetic/patients"}
        />
        <Tab
          icon={<Storage />}
          label="DIETY"
          component={Link}
          to={"/dietetic/diet"}
        />
        <Tab
          icon={<PersonPinIcon />}
          label="PLACEHOLDER"
          component={Link}
          to={"/dietetic/diet"}
        />
        <Tab
          icon={<PersonPinIcon />}
          label="PLACEHOLDER"
          component={Link}
          to={"/dietetic/diet"}
        />
        <Tab
          icon={<PersonPinIcon />}
          label="PLACEHOLDER"
          component={Link}
          to={"/dietetic/diet"}
        />
        <Tab
          icon={<PersonPinIcon />}
          label="PLACEHOLDER"
          component={Link}
          to={"/dietetic/diet"}
        />
      </Tabs>
    </Paper>
  );
}
