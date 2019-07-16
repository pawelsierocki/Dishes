import React, { Component } from "react";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import { withSnackbar } from "notistack";

import { setSelectedDish } from "../store/actions/actions";

import Card from "./UI/Card";
import Spinner from "./UI/Spinner";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "3rem",
    justifyContent: "center"
  }
};

class ListView extends Component {
  handleChangeFavourite = (item, status) => {
    const data = { ...item.data };
    data.favourite = status;
    //TODO: fetch-> change to global api class
    axios
      .put(
        `https://reactproject-de081.firebaseio.com/dishes/${item.id}.json`,
        data
      )
      .then(() => {
        //TODO: snackbar class
        status
          ? this.props.enqueueSnackbar(
              `Added ${data.title} to favourite list`,
              { variant: "success" }
            )
          : this.props.enqueueSnackbar(
              `Removed ${data.title} from favourite list`,
              { variant: "warning" }
            );

        this.props.onListUpdate();
      })
      .catch(error => {
        this.props.enqueueSnackbar(error, {
          variant: "error"
        });
      });
  };

  handleDelete = dishId => {
    //TODO: fetch-> change to global api class
    axios
      .delete(`https://reactproject-de081.firebaseio.com/dishes/${dishId}.json`)
      .then(() => {
        //TODO: snackbar class
        this.props.enqueueSnackbar(`Successfully deleted`, {
          variant: "success"
        });

        this.props.onListUpdate();
      })
      .catch(error => {
        this.props.enqueueSnackbar(error, {
          variant: "error"
        });
      });
  };

  setDish = dish => {
    this.props.setSelectedDish({ selectedDish: dish });
  };

  renderList = () => {
    const { items, classes, loading, user } = this.props;

    return loading ? (
      <Spinner />
    ) : (
      <div className={classes.container}>
        {items && items.length ? (
          items.map((key, index) => (
            <div key={index}>
              <Card
                dish={key}
                handleHeart={this.handleChangeFavourite}
                showDeleteBtn={
                  key.data.user ? user.uid === key.data.user.uid : false
                }
                handleDelete={this.handleDelete}
                setCurrentDish={this.setDish}
              />
            </div>
          ))
        ) : (
          <h1>No dishes yet.</h1>
        )}
      </div>
    );
  };

  render() {
    return this.renderList();
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
});

const mapDispatchToProps = dispatch => ({
  setSelectedDish: dish => dispatch(setSelectedDish(dish))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(withStyles(styles)(ListView)));
