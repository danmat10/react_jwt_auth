import React from "react";
import { useFormik } from "formik";
import { Button, TextField, Grid, Paper, DialogActions } from "@mui/material";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Obrigatório";
  }

  if (!values.email) {
    errors.email = "Obrigatório";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Endereço de e-mail inválido";
  }

  return errors;
};

const CreateUser = ({ onCreate }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validate,
    onSubmit: (values) => {
      onCreate(values);
      formik.resetForm();
    },
  });

  return (
    <Paper style={{ padding: 16 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
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
