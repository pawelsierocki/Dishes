import axios from "axios";

import {
  DIETETIC_ENDPOINT,
  DIETETIC_INTERVIEW_ENDPOINT
} from "../../constants/api";

export const getPatientsForDietetic = uid => {
  const ENDPOINT = DIETETIC_ENDPOINT(uid);
  return axios.get(ENDPOINT);
};

export const addNewPatient = (uid, newPatient) => {
  const ENDPOINT = DIETETIC_ENDPOINT(uid);

  return axios.post(ENDPOINT, newPatient);
};

export const addInterviewForPatient = (uid, patientID, interview) => {
  const ENDPOINT = DIETETIC_INTERVIEW_ENDPOINT(uid, patientID);

  return axios.put(ENDPOINT, interview);
};
