import React, { Component } from "react";

import ListView from "../../components/ListView";

import { api } from "../../shared/firebase";

class FavouritesList extends Component {
  constructor() {
    super();

    this.state = {
      dishesList: [],
      loading: true
    };
  }
  //TODO: fetch-> change to global api class
  getList = () => {
    fetch(api)
      .then(res => res.json())
      .then(res => {
        this.setState({
          dishesList: res,
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
    // TODO: move this to global helper method
    const favouriteDishes = Object.entries(dishesList)
      .filter(e => e[1].favourite)
      .reduce((prev, next) => {
        return [...prev, { id: next[0], data: { ...next[1] } }];
      }, []);

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
