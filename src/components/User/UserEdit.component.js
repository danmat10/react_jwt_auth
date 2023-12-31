import React from "react";
import { useFormik } from "formik";
import { Button, DialogActions } from "@mui/material";
import { DialogTitle, DialogContent } from "@mui/material";

import { UserFormFields, validateUserEditForm, styles } from ".";

const UserEdit = ({ user, onUpdate, onClose }) => {
  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      email: user.email || "",
      cpf: user.cpf || "",
      registration: user.registration || "",
      permissions: user.permissions || "",
      active: user.active || false,
    },
    validate: (values) => validateUserEditForm(values, user),
    onSubmit: (values) => {
      values.id = user.id;
      onUpdate(values);
    },
  });

  return (
    <>
      <DialogTitle className={styles.userEditTitle} paragraph>
        Editar Usuário
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <UserFormFields formik={formik} isEditing={true} />
          <DialogActions>
            <Button variant="outlined" color="error" onClick={() => onClose()}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              Editar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </>
  );
};

export default UserEdit;
