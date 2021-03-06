import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Favorite from "@material-ui/icons/Favorite";
import Check from "@material-ui/icons/Check";
import FoodIcon from "@material-ui/icons/LocalDining";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";

import Modal from "./Modal";
import NewDishlayer from "./NewDishLayer";
import RemoveButton from "./Remove";

const styles = theme => ({
  card: {
    position: "relative",
    width: 240,
    margin: "10px",
    transition: "all .3s",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(0.98)"
    }
  },
  media: {
    height: 140
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    height: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  header: {
    minHeight: "80px",
    alignItems: "flex-start",
    backgroundColor: "#f9f9f9",
    transition: "all .5s",
    "&:hover": {
      color: "#3f51b5"
    }
  },
  title: {
    fontSize: ".8rem",
    minHeight: "2rem"
  },
  subheader: {
    fontSize: ".6rem"
  },
  content: {
    minHeight: "120px"
  },
  contentText: {
    fontSize: ".6rem"
  },
  ingredientContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px"
  },
  ingredient: {
    marginBottom: 0,
    marginLeft: "10px",
    fontSize: ".6rem"
  },
  icon: {
    color: "green",
    fontSize: ".6rem"
  },
  foodIcon: {
    width: "1rem",
    height: "1rem"
  },
  headerIngredientsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px"
  },
  headerIngredients: {
    marginBottom: 0,
    marginLeft: "10px",
    fontSize: ".7rem"
  },
  link: {
    color: "#000",
    textDecoration: "none"
  }
});

class RecipeReviewCard extends Component {
  constructor(props) {
    super();

    this.state = {
      expanded: false,
      fav: props.dish.data.favourite,
      open: false
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      fav: props.dish.data.favourite
    });
  }

  handleExpandClick = () => {
    this.setState(state => {
      return {
        expanded: !state.expanded
      };
    });
  };

  onChangeCheckbox = () => {
    this.setState({
      fav: !this.state.fav
    });

    this.props.handleHeart(this.props.dish, !this.state.fav);
  };

  handleClickOpen = () => {
    this.setState(state => {
      return { open: !state.open };
    });
  };

  setCurrentDish = () => {
    this.props.setCurrentDish(this.props.dish);
  };

  handleBeforeRemove = () => {
    this.setState({
      open: !this.state.open
    });

    this.props.handleDelete(this.props.dish.id);
  };

  render() {
    const { classes, dish, showDeleteBtn } = this.props;
    const dishObj = { ...dish.data };
    const ingredients = dishObj.ingredients.map((el, index) => (
      <div className={classes.ingredientContainer} key={index}>
        <Check className={classes.icon} />
        <Typography paragraph className={classes.ingredient}>
          {el}
        </Typography>
      </div>
    ));

    return (
      <Card className={classes.card}>
        <Link
          to={"/details/" + dish.id}
          className={classes.link}
          onClick={this.setCurrentDish}
        >
          <CardHeader
            title={dishObj.title}
            subheader={
              dishObj.publishDate
                ? `Opublikowano: ` + dishObj.publishDate.slice(0, 10)
                : ""
            }
            className={classes.header}
            classes={{ title: classes.title, subheader: classes.subheader }}
          />
        </Link>
        <NewDishlayer date={dishObj.publishDate} />
        <CardMedia
          className={classes.media}
          image={
            dishObj.imageUrl
              ? dishObj.imageUrl
              : "https://thumbs.dreamstime.com/z/no-fast-food-prohibition-sign-vector-label-34566705.jpg"
          }
          title={dishObj.imageUrl ? dishObj.title : "Default image"}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.contentText}
          >
            {dishObj.shortDescription}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.actions}>
          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={this.state.fav}
                onChange={this.onChangeCheckbox}
              />
            }
            className={classes.checkbox}
          />

          {showDeleteBtn && (
            <div onClick={this.handleClickOpen}>
              <RemoveButton />
            </div>
          )}

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: classes.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={classes.expanded}
            aria-label="Show more"
          >
            {!this.state.expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div className={classes.headerIngredientsContainer}>
              <FoodIcon className={classes.foodIcon} />
              <Typography paragraph className={classes.headerIngredients}>
                SKŁADNIKI
              </Typography>
            </div>
            {ingredients}
          </CardContent>
        </Collapse>
        <Modal
          handleClick={this.handleClickOpen}
          open={this.state.open}
          dish={dish.data.title}
          handleRemove={this.handleBeforeRemove}
          type="delete"
        />
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
  dish: PropTypes.object.isRequired,
  handleHeart: PropTypes.func.isRequired,
  showDeleteBtn: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  setCurrentDish: PropTypes.func.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
