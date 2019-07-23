import React, { Component } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import AccessibilityNew from "@material-ui/icons/AccessibilityNew";
import FastFoodIcon from "@material-ui/icons/Fastfood";
import FavouriteIcon from "@material-ui/icons/Favorite";
import Fingerpring from "@material-ui/icons/Fingerprint";
import { withRouter, Link } from "react-router-dom";

import ItemList from "../../containers/ItemList/ItemList";
import AddDish from "../../containers/AddDish/AddDish";
import FavouritesList from "../../containers/Favourites/FavouritesList";
import MyDishes from "../../containers/MyDishes/MyDishes";
import Dietetic from "../../containers/Dietetic/Dietetic";
import Menu from "./Menu";
import NavigationUserPanel from "./NavigationUserPanel";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    backgroundColor: "#0066cc"
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
    marginRight: "3rem"
  },
  link: {
    textDecoration: "none",
    color: "#000"
  },
  userLeft: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "1rem 0"
  },
  userLeftPhoto: {
    width: "50px",
    height: "50px",
    borderRadius: "50%"
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
    label: "My dishes",
    path: "/mydishes",
    icon: <Fingerpring />,
    component: <MyDishes />
  },
  {
    label: "Dietetic",
    path: "/dietetic/patients",
    icon: <AccessibilityNew />,
    component: <Dietetic />
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

  renderPartials = () => {
    const { classes } = this.props;

    return partials.map(partial => (
      <Link to={partial.path} className={classes.link} key={partial.label}>
        <ListItem button onClick={() => this.handleChangePartial(partial)}>
          <ListItemIcon>{partial.icon}</ListItemIcon>
          <ListItemText primary={partial.label} />
        </ListItem>
      </Link>
    ));
  };

  render() {
    const { classes, logout, user } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
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
            {this.props.activePage}
            <Typography variant="h6" noWrap />
            <div className={classes.userPanel}>
              <Menu logout={logout} user={this.props.user} />
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
            {this.props.activePage}
            <IconButton onClick={this.handleChange}>
              {this.state.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <NavigationUserPanel
            user={user}
            classes={classes}
            handleChange={this.handleChange}
          />
          <List>{this.renderPartials()}</List>
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

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(PersistentDrawerLeft));
