import React, { Component } from "react";
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

    return <ProfileView user={user} />;
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(mapStateToProps)(Profile);
