import React, { Component } from "react";
import { connect } from "react-redux";

import ListView from "../../components/ListView";
import { filterFavouriteDishes } from "../../store/helpers/dishes";
import { getAllDishes } from "../../shared/api/dishesAPI";
import { setActivePage } from "../../store/actions/actions";

class FavouritesList extends Component {
  constructor() {
    super();

    this.state = {
      dishesList: [],
      loading: true
    };
  }

  getList = () => {
    getAllDishes()
      .then(response => {
        this.setState({
          dishesList: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentWillMount() {
    this.props.setActivePage("Ulubione");
    this.onUpdateList();
  }

  onUpdateList = () => {
    this.getList();
  };

  render() {
    const { dishesList, loading } = this.state;
    const favouriteDishes = filterFavouriteDishes(dishesList);

    return (
      <ListView
        items={favouriteDishes}
        onListUpdate={this.onUpdateList}
        loading={loading}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page))
});

export default connect(
  null,
  mapDispatchToProps
)(FavouritesList);
