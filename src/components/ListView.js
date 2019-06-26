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
    flexWrap: "wrap"
  },
  spinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  }
};

class ListView extends Component {
  constructor() {
    super();

    this.state = {
      items: null
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      items: props.items
    });
  }

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
        this.props.enqueueSnackbar(`Something went wrong`, {
          variant: "error"
        });
      });
  };

  render() {
    const { classes } = this.props;

    const { items } = this.state;

    return items ? (
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
      <div className={classes.spinner}>
        <Spinner />
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(ListView));
