import React from "react";
import { useFormik } from "formik";
import { Button, DialogActions } from "@mui/material";
import UserFormFields from "./UserFormFields.component";
import { validateUserCreateForm } from "./UserValidations";
import { DialogTitle, DialogContent, DialogContentText } from "@mui/material";

const CreateUser = ({ onCreate }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      registration: "",
      cpf: "",
      email: "",
      permissions: "",
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
        <DialogContentText>
          Você está na janela de criação de novo usuário. Preencha os campos com
          as informações do novo usuário e clique em 'Criar' para adicionar à
          lista de usuários.
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <UserFormFields formik={formik} />
          <DialogActions>
            <Button type="submit" color="primary">
              Criar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </>
  );
};

export default CreateUser;
