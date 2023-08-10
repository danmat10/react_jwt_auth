import React from "react";
import { useFormik } from "formik";
import { Button, DialogActions } from "@mui/material";
import { DialogTitle, DialogContent, DialogContentText } from "@mui/material";

import { UserFormFields, validateUserCreateForm } from ".";

const CreateUser = ({ onCreate, onClose }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      registration: "",
      cpf: "",
      email: "",
      permissions: "",
      active: true,
    },
    validate: (values) => validateUserCreateForm(values),
    onSubmit: (values) => {
      onCreate(values);
      formik.resetForm();
    },
  });

  return (
    <>
      <DialogTitle
        style={{ backgroundColor: "#0d6efd", color: "white" }}
        paragraph
      >
        Criar Usuário
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <UserFormFields formik={formik} />
          <DialogActions>
            <Button variant="outlined" color="error" onClick={() => onClose()}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              Criar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </>
  );
};

export default CreateUser;
