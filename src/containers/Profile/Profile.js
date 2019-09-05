import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProfileView from "../../components/ProfileView";
import { setActivePage } from "../../store/actions/actions";

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.setState({
      user: this.props.user
    });

    this.props.setActivePage("Mój profil");
  }

  render() {
    const { user } = this.state;

    return user && <ProfileView user={user} />;
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.userReducer.user
});

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
