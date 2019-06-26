import React, { Component } from "react";

import ListView from "../../components/ListView";

import { api } from "../../shared/firebase";

class ItemList extends Component {
  constructor() {
    super();

    this.state = {
      dishesList: []
    };
  }

  componentDidMount() {
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
  }

  render() {
    const { dishesList } = this.state;

    var arr = Object.entries(dishesList).filter(e => e);

    return <ListView items={arr} />;
  }
}

export default ItemList;
