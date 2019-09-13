import * as firebase from "firebase";

const API_HOST = process.env.REACT_APP_API_HOST;
const API_CONFIG = {
  apiKey: process.env.REACT_APP_API_CONFIG_API_KEY,
  authDomain: process.env.REACT_APP_API_CONFIG_API_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_API_CONFIG_API_DATABASEURL,
  projectId: process.env.REACT_APP_API_CONFIG_API_PROJECTID,
  storageBucket: process.env.REACT_APP_API_CONFIG_API_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_API_CONFIG_API_MESSAGINGSENDERID
};
const API_URI = `${API_HOST}`;
const API_COMMENTS_URI = `${API_HOST}/comments`;
const API_DIETETIC = `${API_HOST}/dietetic`;

export const ENDPOINT_DISH = `${API_URI}/dishes.json`;
export const ENDPOINT_INGREDIENTS = `${API_URI}/ingredients.json`;

export const ENDPOINT_DISH_CHANGE = id => {
  return `${API_URI}/dishes/${id}.json`;
};

export const ENDPOINT_COMMENT = id => {
  return `${API_COMMENTS_URI}/${id}.json`;
};

export const DIETETIC_ENDPOINT = id => {
  return `${API_DIETETIC}/${id}.json`;
};

export const DIETETIC_INTERVIEW_ENDPOINT = (id, patientID) => {
  return `${API_DIETETIC}/${id}/${patientID}/interview.json`;
};

export const firebaseApp = firebase.initializeApp(API_CONFIG);
