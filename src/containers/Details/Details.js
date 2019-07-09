import React, { Component } from "react";

import axios from "axios";

import { getComments } from "../../shared/firebase";

import { setSelectedDish } from "../../store/actions/actions";

import SpeedDialTooltipOpen from "../../components/UI/SpeedDial";
import DishComments from "../../components/DishDetails/DishComments";
import DishDetails from "../../components/DishDetails/DishDetails";
import DishOwner from "../../components/DishDetails/DishOwner";
import DishCommentsForm from "../../components/DishDetails/DishCommentsForm";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "5rem"
  },
  main: {
    display: "flex",
    flexDirection: "row"
  },
  owner: {
    marginLeft: "auto"
  },
  data: {
    display: "flex",
    flexDirection: "column",
    fontSize: "12px",
    fontStyle: "italic"
  },
  form: {
    width: "20%"
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    marginTop: "5rem"
  },
  commentSection: {
    width: "70%",
    marginLeft: "auto"
  }
};

class Details extends Component {
  constructor() {
    super();

    this.state = {
      comments: null
    };
  }

  componentDidMount() {
    if (this.props.dish) {
      this.getCommentsFromDB();
    }
  }

  componentWillUnmount() {
    this.props.setSelectedDish({ selectedDish: null });
  }

  getCommentsFromDB = () => {
    const commentEndPoint = getComments(this.props.dish.id);

    axios
      .get(commentEndPoint)
      .then(resp => {
        this.setState({
          comments: resp.data
            ? Object.entries(resp.data).reduce((prev, next) => {
                return [...prev, { id: next[0], data: { ...next[1] } }];
              }, [])
            : null
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  addComment = message => {
    const commentEndPoint = getComments(this.props.dish.id);

    axios
      .post(commentEndPoint, {
        user: this.props.user,
        comment: message
      })
      .then(() => {
        this.getCommentsFromDB();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { dish, classes } = this.props;

    const { comments } = this.state;

    return dish ? (
      <div className={classes.container}>
        <div className={classes.main}>
          <div className={classes.data}>
            <DishDetails dish={dish.data} />
          </div>
          <div className={classes.owner}>
            <DishOwner owner={dish.data.user} />
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.form}>
            <DishCommentsForm
              user={this.props.user}
              addComment={this.addComment}
            />
          </div>
          <div className={classes.commentSection}>
            <DishComments comments={comments} />
          </div>
        </div>
        <SpeedDialTooltipOpen />
      </div>
    ) : (
      <Redirect to="/list" />
    );
  }
}

const mapStateToProps = state => ({
  dish: state.dishesReducer.selectedDish,
  user: state.userReducer.user
});

const mapDispatchToProps = dispatch => ({
  setSelectedDish: dish => dispatch(setSelectedDish(dish))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Details));
