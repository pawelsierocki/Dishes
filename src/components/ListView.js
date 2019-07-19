import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import { setSelectedDish } from "../store/actions/actions";
import { enqueueSnackbar } from "../store/actions/notifier";
import { changeFavourite, deleteDish } from "../shared/api/dishesAPI";
import Card from "./UI/Card";
import Spinner from "./UI/Spinner";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "3rem auto",
    width: "85%"
  }
};

class ListView extends Component {
  handleChangeFavourite = (item, status) => {
    const data = { ...item.data };
    data.favourite = status;

    changeFavourite(item.id, data)
      .then(() => {
        !status
          ? this.props.enqueueSnackbar({ type: "removedFromFav" })
          : this.props.enqueueSnackbar({ type: "addedToFav" });

        this.props.onListUpdate();
      })
      .catch(() => {
        this.props.enqueueSnackbar({ type: "error" });
      });
  };

  handleDelete = dishId => {
    deleteDish(dishId)
      .then(() => {
        this.props.enqueueSnackbar({ type: "deleted" });

        this.props.onListUpdate();
      })
      .catch(error => {
        this.props.enqueueSnackbar({ type: "error" });
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

ListView.propTypes = {
  setSelectedDish: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.userReducer.user
});

const mapDispatchToProps = dispatch => ({
  setSelectedDish: dish => dispatch(setSelectedDish(dish)),
  enqueueSnackbar: notify => dispatch(enqueueSnackbar(notify))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ListView));
