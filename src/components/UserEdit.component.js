import React from "react";
import { useFormik } from "formik";
import {
  Button,
  TextField,
  Grid,
  Paper,
  DialogActions,
} from "@mui/material";

const validate = (values, user, setErrorType) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Obrigatório";
  }

  if (!values.email) {
    errors.email = "Obrigatório";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Endereço de e-mail inválido";
  }

  if (values.name === user.name && values.email === user.email) {
    errors._errors = "equalFields";
    setErrorType("equalFields");
  }

  return errors;
};

const UserEdit = ({ user, onUpdate, setErrorType }) => {
  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      email: user.email || "",
    },
    validate: (values) => validate(values, user, setErrorType),
    onSubmit: (values) => {
      onUpdate(values);
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
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
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
