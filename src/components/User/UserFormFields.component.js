import React from "react";
import { TextField, Grid } from "@mui/material";

const UserFormFields = ({ formik }) => (
  <>
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
  </>
);

export default UserFormFields;
