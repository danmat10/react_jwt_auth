import React from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
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
      label="Matricula"
      name="registration"
      type="text"
      margin="dense"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.registration}
      error={formik.touched.registration && Boolean(formik.errors.registration)}
      helperText={formik.touched.registration && formik.errors.registration}
    />
    <TextField
      fullWidth
      label="Cpf"
      name="cpf"
      type="text"
      margin="dense"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.cpf}
      error={formik.touched.cpf && Boolean(formik.errors.cpf)}
      helperText={formik.touched.cpf && formik.errors.cpf}
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
    <FormControl component="fieldset" margin="dense">
      <FormLabel component="legend">Permissões</FormLabel>
      <RadioGroup
        row
        aria-label="permissions"
        name="permissions"
        value={formik.values.permissions}
        onChange={formik.handleChange}
      >
        <FormControlLabel value="gestor" control={<Radio />} label="Gestor" />
        <FormControlLabel
          value="requisitante"
          control={<Radio />}
          label="Requisitante"
        />
      </RadioGroup>
    </FormControl>
  </>
);

export default UserFormFields;
