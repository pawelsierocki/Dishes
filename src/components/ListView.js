import React, { Component } from "react";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";

import Card from "./Card";
import Spinner from "./Spinner";

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
    var data = { ...item[1] };
    data.favourite = status;

    axios
      .put(
        `https://reactproject-de081.firebaseio.com/dishes/${item[0]}.json`,
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
        if (this.props.onListUpdate) this.props.onListUpdate();
      })
      .catch(error => {
        this.props.enqueueSnackbar(error, {
          variant: "error"
        });
      });
  };

  renderList = () => {
    const { items, classes, loading } = this.props;

    switch (loading) {
      case true: {
        return <Spinner />;
      }

      default: {
        return items && items.length ? (
          <div className={classes.container}>
            {items.map((key, index) => {
              return (
                <div key={index}>
                  <Card dish={key} handleHeart={this.handleChangeFavourite} />
                </div>
              );
            })}
          </div>
        ) : (
          <h1>No dishes added to favourites yet.</h1>
        );
      }
    }
  };

  render() {
    return this.renderList();
  }
}

export default withSnackbar(withStyles(styles)(ListView));
