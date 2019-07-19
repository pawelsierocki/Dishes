import React from "react";
import PropTypes from "prop-types";

import DishSingleComment from "./DishSingleComment";

const DishComments = props => {
  const { comments } = props;
  const render = comments
    ? comments.map(function(item, i) {
        return <DishSingleComment key={i} comment={item} />;
      })
    : "No comments";

  return render;
};

DishComments.propTypes = {
  comments: PropTypes.array
};

export default DishComments;
