import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    background: "#fff",
    boxShadow: "1px 2px 5px #000",
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "column"
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    background: "#0066cc",
    color: "#fff",
    padding: ".5rem"
  },
  avatar: {
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "50%",
    border: "2px solid #fff"
  },
  username: {
    marginLeft: "1rem",
    fontSize: "14px"
  },
  messageBox: {
    marginTop: "1rem",
    padding: "0 1rem"
  },
  date: {
    marginLeft: "auto",
    fontSize: "10px",
    fontStyle: "italic"
  },
  "@media only screen and (max-width: 767px)": {
    avatar: {
      width: "2rem",
      height: "2rem"
    },
    username: {
      fontSize: "12px"
    },
    date: {
      fontSize: "8px"
    }
  }
}));

const DishSingleComment = props => {
  const classes = useStyles();
  const { comment } = props;
  const { user } = comment.data;

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

DishSingleComment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default DishSingleComment;
