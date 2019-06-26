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
import { withRouter } from "react-router-dom";

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
  }
});

let components = [
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
      render: components[0]
    };
  }

  componentWillMount() {
    components.map(eachComponent => {
      if (eachComponent.path === this.props.history.location.pathname) {
        this.setState({ render: eachComponent });
      }
    });
  }

  handleChange = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleChangePartial = text => {
    components.map(eachComponent => {
      if (eachComponent.label === text) {
        this.setState({ render: eachComponent, open: !this.state.open });
        this.props.history.push(eachComponent.path);
      }
    });
  };

  render() {
    const { classes, logout, user } = this.props;
    const { render } = this.state;

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
            <Typography variant="h6" noWrap>
              {render.label}
            </Typography>
            <div className={classes.userPanel}>
              <Typography
                variant="h6"
                noWrap
                className={classes.userPanelParagraph}
              >
                Hello {user.displayName} !
              </Typography>
              <Button onClick={logout}>Logout</Button>
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
            {components.map((component, index) => (
              <ListItem
                button
                key={component.label}
                onClick={() => this.handleChangePartial(component.label)}
              >
                <ListItemIcon>{component.icon}</ListItemIcon>
                <ListItemText primary={component.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open
          })}
        >
          <div className={classes.drawerHeader} />
          {render.component}
        </main>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(PersistentDrawerLeft));
