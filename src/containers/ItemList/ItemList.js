import React, { Component } from "react";

import ListView from "../../components/ListView";

import { api } from "../../shared/firebase";

class ItemList extends Component {
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

  componentDidMount() {
    this.getList();
  }

  onUpdateList = () => {
    this.getList();
  };

  render() {
    const { dishesList, loading } = this.state;
    // TODO: move this to global helper method
    const dishesCollection = Object.entries(dishesList).reduce((prev, next) => {
      return [...prev, { id: next[0], data: { ...next[1] } }];
    }, []);

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
