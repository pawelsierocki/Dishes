import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import EmailIcon from "@material-ui/icons/Email";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PhoneIcon from "@material-ui/icons/Phone";

const styles = makeStyles({
  container: {
    width: "100%",
    fontFamily: "Encode Sans Condensed"
  },
  header: {
    height: "300px",
    position: "relative",
    backgroundColor: "#f1f1f1"
  },
  image: {
    position: "absolute",
    bottom: "-65%",
    width: "200px",
    height: "200px",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "50%"
  },
  content: {
    marginTop: "7rem",
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  },
  username: {
    textAlign: "center",
    letterSpacing: "1px",
    fontSize: "28px"
  },
  paragraph: {
    display: "flex",
    justifyContent: "center",
    margin: "1rem auto",
    padding: "5px",
    width: "15%",
    transition: "all .5s",
    "&:hover": {
      cursor: "pointer",
      transform: "translateX(-10%)"
    }
  },
  icon: {
    marginRight: "auto",
    fontSize: "20px"
  }
});

const ProfileView = props => {
  const { user } = props;
  console.log(user);
  const classes = styles();

  return (
    user && (
      <div className={classes.container}>
        <div className={classes.header}>
          <img src={user.photoURL} alt="photoURL" className={classes.image} />
        </div>

        <div className={classes.content}>
          <h2 className={classes.username}>{user.displayName}</h2>
          <p className={classes.paragraph}>
            <EmailIcon className={classes.icon} />
            {user.email}
          </p>
          <p className={classes.paragraph}>
            <PermIdentityIcon className={classes.icon} />
            {user.uid}
          </p>
          <p className={classes.paragraph}>
            <PhoneIcon className={classes.icon} />
            {user.phoneNumer ? user.phoneNumer : "xxx-xxx-xxx"}
          </p>
        </div>
      </div>
    )
  );
};

export default ProfileView;
