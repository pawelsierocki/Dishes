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

    const arr = Object.entries(dishesList).reduce((prev, next) => {
      return [...prev, { id: next[0], data: { ...next[1] } }];
    }, []);

    return (
      <ListView
        items={arr}
        loading={loading}
        onListUpdate={this.onUpdateList}
      />
    );
  }
}

export default ItemList;
