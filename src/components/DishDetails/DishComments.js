import React from "react";

const DishComments = props => {
  const { comments } = props;

  const render = comments
    ? comments.map(function(item, i) {
        return item.data.user.displayName;
      })
    : "No comments";

  return render;
};

export default DishComments;
