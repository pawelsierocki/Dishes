import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import FastFoodIcon from "@material-ui/icons/Fastfood";
import FavouriteIcon from "@material-ui/icons/Favorite";
import { withRouter, Link } from "react-router-dom";

import ItemList from "../containers/ItemList/ItemList";
import AddDish from "../containers/AddDish/AddDish";
import FavouritesList from "../containers/Favourites/FavouritesList";
import { Button } from "@material-ui/core";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },

  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  drawerHeaderHeading: {
    marginRight: "auto",
    marginLeft: ".7rem"
  },
  userPanel: {
    marginLeft: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  userPanelParagraph: {
    fontSize: "12px",
    marginRight: "1rem"
  },
  link: {
    textDecoration: "none",
    color: "#000"
  }
});

let partials = [
  {
    label: "List of dishes",
    path: "/list",
    icon: <FastFoodIcon />,
    component: <ItemList />
  },
  {
    label: "Favourite",
    path: "/favourites",
    icon: <FavouriteIcon />,
    component: <FavouritesList />
  },
  {
    label: "Add new dish",
    path: "/add",
    icon: <AddIcon />,
    component: <AddDish />
  }
];

class PersistentDrawerLeft extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      confirm: false,
      render: partials[0]
    };
  }

  handleChange = () => {
    this.setState(state => {
      return {
        open: !state.open
      };
    });
  };

  handleChangePartial = partial => {
    this.setState({ render: partial });
    this.handleChange();
  };

  confirmLogout = () => {
    this.setState(state => {
      return { confirm: !state.confirm };
    });
  };

  render() {
    const { classes, logout, user } = this.props;
    const { render, confirm } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleChange}
              edge="start"
              className={clsx(
                classes.menuButton,
                this.state.open && classes.hide
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap />
            <div className={classes.userPanel}>
              <Typography
                variant="h6"
                noWrap
                className={classes.userPanelParagraph}
              >
                {!confirm ? `Hello ${user.displayName} !` : `Are you sure?`}
              </Typography>
              {!confirm ? (
                <Button onClick={this.confirmLogout}>Logout</Button>
              ) : (
                <>
                  <Button onClick={logout}>YES</Button>
                  <Button onClick={this.confirmLogout}>NO</Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <h3 className={classes.drawerHeaderHeading}>{render.label}</h3>
            <IconButton onClick={this.handleChange}>
              {classes.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {partials.map(partial => (
              <Link
                to={partial.path}
                className={classes.link}
                key={partial.label}
              >
                <ListItem
                  button
                  onClick={() => this.handleChangePartial(partial)}
                >
                  <ListItemIcon>{partial.icon}</ListItemIcon>
                  <ListItemText primary={partial.label} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open
          })}
        />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(PersistentDrawerLeft));
