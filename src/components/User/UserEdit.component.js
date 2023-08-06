import React from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper, DialogActions } from "@mui/material";
import UserFormFields from "./UserFormFields.component";
import {validateUserEditForm} from "./UserValidations";

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
    <Paper style={{ padding: 16 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <UserFormFields formik={formik} />
          <Grid item xs={12}>
            <DialogActions>
              <Button type="submit" color="primary">
                Atualizar
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UserEdit;
