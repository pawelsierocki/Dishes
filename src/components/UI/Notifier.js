import { Component } from "react";
import { connect } from "react-redux";

import { withSnackbar } from "notistack";

class Notifier extends Component {
  componentWillUpdate(props) {
    const type = props.type;
    let variant,
      body = "";

    switch (type) {
      case "addedToFav": {
        variant = "success";
        body = "Successfully added to favourites";
        break;
      }
      case "addedNewDish": {
        variant = "success";
        body = "Successfully added new dish";
        break;
      }
      case "removedFromFav": {
        variant = "warning";
        body = "Successfully removed from favourites";
        break;
      }
      case "deleted": {
        variant = "warning";
        body = "Successfully deleted";
        break;
      }
      case "error": {
        variant = "warning";
        body = "Something went wrong";
        break;
      }

      default:
        return;
    }

    this.props.enqueueSnackbar(body, {
      variant
    });
  }
  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  type: state.notifierReducer.type
});

export default connect(mapStateToProps)(withSnackbar(Notifier));
