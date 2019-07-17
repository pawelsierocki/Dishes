import React, { Component } from "react";

import ListView from "../../components/ListView";
import { filterDishes } from "../../store/helpers/dishes";
import { getAllDishes } from "../../shared/api/dishesAPI";

class ItemList extends Component {
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
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getList();
  }

  onUpdateList = () => {
    this.getList();
  };

  render() {
    const { dishesList, loading } = this.state;
    const dishesCollection = filterDishes(dishesList);

    return (
      <ListView
        items={dishesCollection}
        loading={loading}
        onListUpdate={this.onUpdateList}
      />
    );
  }
}

export default ItemList;
