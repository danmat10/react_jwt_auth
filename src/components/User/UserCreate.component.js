import React from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper, DialogActions } from "@mui/material";
import UserFormFields from "./UserFormFields.component";
import {validateUserCreateForm} from "./UserValidations";

const CreateUser = ({ onCreate }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validateUserCreateForm,
    onSubmit: (values) => {
      onCreate(values);
      formik.resetForm();
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
                Criar
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CreateUser;
