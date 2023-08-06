import React from "react";
import { useFormik } from "formik";
import { Button, DialogActions } from "@mui/material";
import UserFormFields from "./UserFormFields.component";
import { validateUserEditForm } from "./UserValidations";
import { DialogTitle, DialogContentText, DialogContent } from "@mui/material";

const UserEdit = ({ user, onUpdate, setErrorType }) => {
  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      email: user.email || "",
    },
    validate: (values) => validateUserEditForm(values, user, setErrorType),
    onSubmit: (values) => {
      onUpdate(values);
    },
  });

  return (
    <>
      <DialogTitle>Editar Usuário</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Você está na janela de edição de usuário. Por favor, atualize as
          informações necessárias e clique em 'Salvar' para confirmar as
          alterações.
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <UserFormFields formik={formik} />
          <DialogActions>
            <Button type="submit" color="primary">
              Editar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </>
  );
};

export default UserEdit;
