import React, { Component } from "react";
import { connect } from "react-redux";

import ListView from "../../components/ListView";
import { filterDishes } from "../../store/helpers/dishes";
import { getAllDishes, getAllIngredients } from "../../shared/api/dishesAPI";
import { setActivePage, setIngredients } from "../../store/actions/actions";

class ItemList extends Component {
  _isMounted = false;

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
        if (this._isMounted)
          this.setState({
            dishesList: response.data
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getIngredients = () => {
    getAllIngredients()
      .then(response => {
        if (this._isMounted)
          this.setState({
            ingredients: response.data,
            loading: false
          });

        this.props.setIngredients(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this._isMounted = true;

    this.props.setActivePage("Lista dań");
    this.getIngredients();
    this.onUpdateList();
  }

  componentWillUnmount() {
    this._isMounted = false;
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

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page)),
  setIngredients: ingredients => dispatch(setIngredients(ingredients))
});

export default connect(
  null,
  mapDispatchToProps
)(ItemList);
