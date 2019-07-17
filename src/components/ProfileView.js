import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import EmailIcon from "@material-ui/icons/Email";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PhoneIcon from "@material-ui/icons/Phone";
import AddIcon from "@material-ui/icons/Add";

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
      color: "#0066CC"
    }
  },
  icon: {
    marginRight: "auto",
    fontSize: "20px"
  },
  headerJoined: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
    margin: 0,
    fontStyle: "italic",
    fontSize: "12px"
  },
  fab: {
    position: "fixed",
    bottom: "1rem",
    left: "1rem"
  }
});

const ProfileView = props => {
  const { user } = props;
  const classes = styles();

  return (
    //TODO: move img to own component
    user && (
      <div className={classes.container}>
        <div className={classes.header}>
          <img src={user.photoURL} alt="photoURL" className={classes.image} />
          <p className={classes.headerJoined}>
            Joined: {user.metadata.creationTime.slice(0, 16)}
          </p>
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
        <Fab color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Fab>
      </div>
    )
  );
};

export default ProfileView;
