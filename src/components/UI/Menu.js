import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Face from "@material-ui/icons/Face";
import LinkOff from "@material-ui/icons/LinkOff";
import { makeStyles } from "@material-ui/core/styles";

import UserImage from "./UserImage";

const styles = makeStyles({
  icon: {
    fontSize: "30px",
    transition: "all .5s",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(0.95)",
      color: "#a9a9a9"
    }
  },
  iconMenu: {
    marginRight: "2rem",
    fontSize: "18px"
  },
  menuLabel: {
    fontSize: "16px",
    fontStyle: "italic"
  },
  link: {
    textDecoration: "none",
    color: "#000"
  },
  photo: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    marginRight: "10px",
    "&:hover": {
      cursor: "pointer"
    }
  }
});

export default function SimpleMenu(props) {
  const classes = styles();
  const { logout, user } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <div onClick={handleClick}>
        <UserImage
          userPhoto={user.photoURL}
          scale={classes.photo}
          alt="miniature"
        />
      </div>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/profile/" className={classes.link}>
          <MenuItem onClick={handleClose} className={classes.menuLabel}>
            <Face className={classes.iconMenu} />
            Profile
          </MenuItem>
        </Link>

        <MenuItem onClick={logout} className={classes.menuLabel}>
          <LinkOff className={classes.iconMenu} />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

SimpleMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};
