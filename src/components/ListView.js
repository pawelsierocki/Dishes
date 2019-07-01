import React, { Component } from "react";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import { withSnackbar } from "notistack";

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
    var data = { ...item.data };
    data.favourite = status;

    axios
      .put(
        `https://reactproject-de081.firebaseio.com/dishes/${item.id}.json`,
        data
      )
      .then(() => {
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
    axios
      .delete(`https://reactproject-de081.firebaseio.com/dishes/${dishId}.json`)
      .then(() => {
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

  renderList = () => {
    const { items, classes, loading, user } = this.props;

    switch (loading) {
      case true: {
        return <Spinner />;
      }

      default: {
        return (
          <div className={classes.container}>
            {items && items.length ? (
              items.map((key, index) => {
                return (
                  <div key={index}>
                    <Card
                      dish={key}
                      handleHeart={this.handleChangeFavourite}
                      showDeleteBtn={
                        key.data.user ? user.uid === key.data.user.uid : false
                      }
                      handleDelete={this.handleDelete}
                    />
                  </div>
                );
              })
            ) : (
              <h1>No dishes yet.</h1>
            )}
          </div>
        );
      }
    }
  };

  render() {
    return this.renderList();
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(mapStateToProps)(
  withSnackbar(withStyles(styles)(ListView))
);
