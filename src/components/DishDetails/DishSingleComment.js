import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    background: "#fff",
    padding: "1rem",
    boxShadow: "1px 2px 5px #000",
    marginBottom: "2rem",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column"
  },
  userInfo: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "50%"
  },
  username: {
    marginLeft: "1rem",
    fontSize: "14px"
  },
  messageBox: {
    marginTop: "1.5rem",
    padding: "0 .5rem"
  },
  date: {
    marginLeft: "auto",
    fontSize: "10px",
    fontStyle: "italic"
  }
}));

const DishSingleComment = props => {
  const classes = useStyles();
  const { comment } = props;

  const { user } = comment.data;

  console.log(comment);

  return (
    <div className={classes.container}>
      <div className={classes.userInfo}>
        <img src={user.photoURL} alt="avatar" className={classes.avatar} />
        <p className={classes.username}>{user.displayName}</p>
        <p className={classes.date}>
          Published: {comment.data.publishDate.slice(0, 10)}
        </p>
      </div>
      <div className={classes.messageBox}>
        <p className={classes.message}>{comment.data.comment}</p>
      </div>
    </div>
  );
};

export default DishSingleComment;
