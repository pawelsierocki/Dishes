import { ENQUEUE_SNACKBAR } from "../../constants/action-types";

export const enqueueSnackbar = payload => ({
  type: ENQUEUE_SNACKBAR,
  payload
});
