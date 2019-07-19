import { ENQUEUE_SNACKBAR } from "../../constants/action-types";

const initialState = {
  type: ""
};

const enqueueSnackbar = (state, payload) => ({
  ...state,
  ...payload
});

const notifierReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR: {
      return enqueueSnackbar(state, action.payload);
    }

    default:
      return state;
  }
};

export default notifierReducer;
