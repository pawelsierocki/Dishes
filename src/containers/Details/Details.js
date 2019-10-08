import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core";

import { getCommentsForDish, addNewComment } from "../../shared/api/dishesAPI";
import { filterDishes } from "../../store/helpers/dishes";
import { setSelectedDish, setActivePage } from "../../store/actions/actions";

import SpeedDialTooltipOpen from "../../components/UI/SpeedDial";
import DishComments from "../../components/DishDetails/DishComments";
import DishDetails from "../../components/DishDetails/DishDetails";
import DishOwner from "../../components/DishDetails/DishOwner";
import DishCommentsForm from "../../components/DishDetails/DishCommentsForm";

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
    width: "100%",
    marginBottom: "3rem"
  },
  bottom: {
    display: "flex",
    flexDirection: "column",
    marginTop: "5rem",
    borderTop: "1px solid #000",
    paddingTop: "5rem",
    flexWrap: "wrap"
  },
  commentSection: {
    width: "100%",
    marginLeft: "auto"
  },
  "@media only screen and (max-width: 991px)": {
    main: {
      flexDirection: "column"
    },
    owner: {
      marginLeft: 0
    }
  }
};

class Details extends Component {
  _isMounted = false;

  constructor() {
    super();

    this.state = {
      comments: null
    };
  }

  componentDidMount() {
    if (this.props.dish) {
      this.getCommentsFromDB();
      this.props.setActivePage(`Szczegóły: ${this.props.dish.data.title}`);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getCommentsFromDB = () => {
    this._isMounted = true;

    getCommentsForDish(this.props.dish.id)
      .then(resp => {
        if (this._isMounted)
          this.setState({
            comments: resp.data
          });
      })
      .catch(() => {
        this.setState({
          comments: null
        });
      });
  };

  addComment = message => {
    addNewComment(this.props.dish.id, {
      user: this.props.user,
      comment: message,
      publishDate: new Date()
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
    const commentsList = comments ? filterDishes(comments) : null;

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
            <DishComments comments={commentsList} />
          </div>
        </div>
        <SpeedDialTooltipOpen />
      </div>
    ) : (
      <Redirect to="/list" />
    );
  }
}

Details.propTypes = {
  setSelectedDish: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  dish: state.dishesReducer.selectedDish,
  user: state.userReducer.user
});

const mapDispatchToProps = dispatch => ({
  setSelectedDish: dish => dispatch(setSelectedDish(dish)),
  setActivePage: page => dispatch(setActivePage(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Details));
