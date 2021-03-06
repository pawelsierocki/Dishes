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
    justifyContent: "flex-end",
    background: "#f9f9f9"
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
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    marginTop: "14px"
  },
  logo: {
    width: 50,
    marginLeft: "auto"
  },
  companyName: {
    marginRight: "auto",
    marginLeft: ".8rem",
    fontStyle: "italic",
    letterSpacing: ".5px",
    fontSize: "14px"
  },
  companyNameBigLetter: {
    color: "#5EDFAC",
    fontSize: "20px"
  },
  dietetic: {
    color: "#fff",
    background: "#0066cc",
    overflow: "hidden",
    boxShadow: "inset 0 0 70px #000000",
    transition: "all .5s",
    "&:hover": {
      boxShadow: "0px 0px 4px #000",
      background: "#0066cc"
    }
  },
  dieteticIcon: {
    color: "#fff"
  },
  "@keyframes hotAnimation": {
    "0%": { boxShadow: "0px 0px 0px #fff" },
    "50%": { boxShadow: "0px 0px 30px #fff" },
    "100%": { boxShadow: "0px 0px 0px #fff" }
  },
  hot: {
    color: "#fff",
    background: "red",
    position: "absolute",
    right: "-20px",
    top: "15px",
    transform: "rotate(45deg)",
    padding: "2px 30px",
    fontSize: "10px",
    animation: "$hotAnimation 2s infinite",
    textShadow: "1px 2px 3px #fff"
  }
});

let partials = [
  {
    label: "Lista dań",
    path: "/list",
    icon: <FastFoodIcon />,
    component: <ItemList />
  },
  {
    label: "Ulubione",
    path: "/favourites",
    icon: <FavouriteIcon />,
    component: <FavouritesList />
  },
  {
    label: "Moje dania",
    path: "/mydishes",
    icon: <Fingerpring />,
    component: <MyDishes />
  },
  {
    label: "Dietetyk",
    path: "/dietetic/patients",
    icon: <AccessibilityNew />,
    component: <Dietetic />
  },
  {
    label: "Dodaj nowe danie",
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

  renderHot = label => {
    const { classes } = this.props;
    if (label === "Dietetyk") return <div className={classes.hot}>NOWOŚĆ</div>;
  };

  renderPartials = () => {
    const { classes } = this.props;

    return partials.map(partial => (
      <Link to={partial.path} className={classes.link} key={partial.label}>
        <ListItem
          button
          onClick={() => this.handleChangePartial(partial)}
          className={partial.label === "Dietetyk" ? classes.dietetic : ""}
        >
          <ListItemIcon
            className={partial.label === "Dietetyk" ? classes.dieteticIcon : ""}
          >
            {partial.icon}
          </ListItemIcon>
          <ListItemText primary={partial.label} />
          {this.renderHot(partial.label)}
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
            <img
              src="https://telemedi.co/build/media/disease-icons/sore_throat.png"
              alt="logo"
              className={classes.logo}
            />
            <p className={classes.companyName}>
              <span className={classes.companyNameBigLetter}>D</span>iet
              <span className={classes.companyNameBigLetter}>P</span>ro
            </p>
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
