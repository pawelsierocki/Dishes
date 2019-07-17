import React, { Component } from "react";

import ListView from "../../components/ListView";
import { filterFavouriteDishes } from "../../store/helpers/dishes";
import { getAllDishes } from "../../shared/api/dishesAPI";

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
    this.getList();
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

export default FavouritesList;
