import React, { Component } from "react";

import ListView from "../../components/ListView";

import { api } from "../../shared/firebase";

class FavouritesList extends Component {
  constructor() {
    super();

    this.state = {
      dishesList: []
    };
  }

  getList = () => {
    fetch(api)
      .then(res => res.json())
      .then(res => {
        this.setState({
          dishesList: res
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
    const { dishesList } = this.state;

    var arr = Object.entries(dishesList).filter(e =>
      e[1].favourite ? e : null
    );

    return <ListView items={arr} onListUpdate={this.onUpdateList} />;
  }
}

export default FavouritesList;
