import { FETCH_CURRENT_USER } from "../../constants/action-types";

export const fetchCurrentUserOnStart = payload => ({
  type: FETCH_CURRENT_USER,
  payload
});
