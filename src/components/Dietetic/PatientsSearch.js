import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { setSearchQuery } from "../../store/actions/actions";
import Search from "@material-ui/icons/Search";

const styles = {
  icon: {
    fontSize: "18px",
    color: "#0066cc"
  }
};

class PatientsSearch extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: ""
    };
  }

  handleChange = ev => {
    this.setState(
      {
        [ev.target.id]: ev.target.value
      },
      () => this.props.setSearchQuery(this.state.searchQuery)
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <TextField
        id="searchQuery"
        className={clsx(classes.margin, classes.textField)}
        variant="filled"
        label="Search patient by name"
        value={this.state.searchquery}
        onChange={this.handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search className={classes.icon} />
            </InputAdornment>
          )
        }}
      />
    );
  }
}

PatientsSearch.propTypes = {
  setSearchQuery: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setSearchQuery: query => dispatch(setSearchQuery(query))
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(PatientsSearch));
