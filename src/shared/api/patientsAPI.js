import axios from "axios";

import { DIETETIC_ENDPOINT } from "../../constants/api";

export const getPatientsForDietetic = uid => {
  const ENDPOINT = DIETETIC_ENDPOINT(uid);
  return axios.get(ENDPOINT);
};

export const addNewPatient = (uid, newPatient) => {
  const ENDPOINT = DIETETIC_ENDPOINT(uid);

  return axios.post(ENDPOINT, newPatient);
};
