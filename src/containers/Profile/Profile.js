import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProfileView from "../../components/ProfileView";

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

export default connect(mapStateToProps)(Profile);
