import React from "react";
import DishSingleComment from "./DishSingleComment";

const DishComments = props => {
  const { comments } = props;

  console.log(comments);

  const render = comments
    ? comments.map(function(item, i) {
        return <DishSingleComment key={i} comment={item} />;
      })
    : "No comments";

  return render;
};

export default DishComments;
