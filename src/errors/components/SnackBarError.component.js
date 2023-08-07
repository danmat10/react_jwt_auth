import React from "react";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

const SnackBarError = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      sx={{ width: "50%" }}
      key={{ vertical: "bottom", horizontal: "center" }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="error">
        {message?.content || "Default Message"}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarError;
