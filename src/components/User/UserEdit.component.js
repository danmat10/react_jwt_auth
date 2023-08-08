import React from "react";
import { useFormik } from "formik";
import { Button, DialogActions } from "@mui/material";
import UserFormFields from "./UserFormFields.component";
import { validateUserEditForm } from "./UserValidations";
import { DialogTitle, DialogContentText, DialogContent } from "@mui/material";

const UserEdit = ({ user, onUpdate }) => {
  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      email: user.email || "",
      cpf: user.cpf || "",
      registration: user.registration || "",
      permissions: user.permissions || "",
    },
    validate: (values) => validateUserEditForm(values, user),
    onSubmit: (values) => {
      values.id = user.id;
      onUpdate(values);
    },
  });

  return (
    <>
      <DialogTitle
        style={{ backgroundColor: "#0d6efd", color: "white" }}
        paragraph
      >
        Editar Usuário
      </DialogTitle>
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