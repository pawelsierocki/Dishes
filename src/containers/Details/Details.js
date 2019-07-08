import React, { Component } from "react";

import { setSelectedDish } from "../../store/actions/actions";

import SpeedDialTooltipOpen from "../../components/UI/SpeedDial";
import DishComments from "../../components/DishDetails/DishComments";
import DishDetails from "../../components/DishDetails/DishDetails";
import DishOwner from "../../components/DishDetails/DishOwner";

import { connect } from "react-redux";
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
  }
};

class Details extends Component {
  componentWillUnmount() {
    this.props.setSelectedDish({ selectedDish: null });
  }

  render() {
    const { dish, classes } = this.props;

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
        <DishComments />
        <SpeedDialTooltipOpen />
      </div>
    ) : (
      <h2>No dish selected</h2>
    );
  }
}

const mapStateToProps = state => ({
  dish: state.dishesReducer.selectedDish
});

const mapDispatchToProps = dispatch => ({
  setSelectedDish: dish => dispatch(setSelectedDish(dish))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Details));
