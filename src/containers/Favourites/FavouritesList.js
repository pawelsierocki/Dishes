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

    var arr = Object.entries(dishesList).filter(e => e[1].favourite);

    return (
      <ListView
        items={arr}
        onListUpdate={this.onUpdateList}
        loading={loading}
      />
    );
  }
}

export default FavouritesList;
