import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ListView from "../../components/ListView";
import { filterOwnedDishes } from "../../store/helpers/dishes";
import { getAllDishes } from "../../shared/api/dishesAPI";
import { setActivePage } from "../../store/actions/actions";

class MyDishes extends Component {
  _isMounted = false;

  constructor() {
    super();

    this.state = {
      dishesList: [],
      loading: true
    };
  }

  getList = () => {
    this._isMounted = true;

    getAllDishes()
      .then(response => {
        if (this._isMounted)
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
    this.props.setActivePage("Moje dania");
    this.getList();
  }

  componentWillUnmount() {
    this._isMounted = false;
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

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page))
});

const mapStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyDishes);
