import React from "react";
import { Route, Switch } from "react-router-dom";

import Patients from "../../components/Dietetic/Patients";
import Diet from "../../components/Dietetic/Diet";
import AddNewPatient from "../../components/Dietetic/AddNewPatient";
import PatientDetails from "../../components/Dietetic/PatientDetails";
import PatientInterview from "../../components/Dietetic/PatientInterview";

const DieteticRouter = () => {
  return (
    <Switch>
      <Route path="/dietetic/patients" exact component={Patients} />
      <Route
        path="/dietetic/patients/id/:id"
        exact
        component={PatientDetails}
      />
      <Route
        path="/dietetic/patients/id/:id/interview"
        exact
        component={PatientInterview}
      />
      <Route path="/dietetic/patients/add" component={AddNewPatient} />
      <Route path="/dietetic/diet" component={Diet} />
    </Switch>
  );
};

export default DieteticRouter;
