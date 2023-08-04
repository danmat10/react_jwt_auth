import React from "react";
import Alert from "@mui/material/Alert";

function EqualFieldsError() {
  return (
    <Alert severity="info" variant="filled">
      Por favor, os campos não podem ser os mesmos!
    </Alert>
  );
}

export default EqualFieldsError;
