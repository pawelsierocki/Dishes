import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ListView from "../../components/ListView";
import { filterOwnedDishes } from "../../store/helpers/dishes";
import { getAllDishes } from "../../shared/api/dishesAPI";

class MyDishes extends Component {
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

  componentDidMount() {
    this.getList();
  }

  onUpdateList = () => {
    this.getList();
  };

  render() {
    const { dishesList, loading } = this.state;
    const { user } = this.props;
    const usersDishes = filterOwnedDishes(dishesList, user);

    return (
      <ListView
        items={usersDishes}
        loading={loading}
        onListUpdate={this.onUpdateList}
      />
    );
  }
}

MyDishes.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(mapStateToProps)(MyDishes);
