import React from "react";
import { TextField } from "@mui/material";

const UserFormFields = ({ formik }) => (
  <>
      <TextField
        fullWidth
        label="Nome"
        name="name"
        type="text"
        margin="dense"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        fullWidth
        label="E-mail"
        name="email"
        type="email"
        margin="dense"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
  </>
);

export default UserFormFields;
