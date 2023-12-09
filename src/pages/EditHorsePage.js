import React from "react";
import EditHorse from "../components/EditHorse";

const EditHorsePage = ({ match }) => {
  return (
    <div>
      <h1>Edit Horse</h1>
      <EditHorse match={match} />
    </div>
  );
};

export default EditHorsePage;
