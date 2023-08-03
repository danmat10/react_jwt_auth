import React from "react";
import Alert from "@mui/material/Alert";

function FillAllFieldsError() {
  return (
    <Alert severity="info" variant="filled">
      Por favor, preencha todos os campos!
    </Alert>
  );
}

export default FillAllFieldsError;
