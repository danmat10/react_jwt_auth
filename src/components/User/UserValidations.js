const validateCPF = (cpf) => {
  if (cpf.length !== 11 && cpf.length !== 14) {
    return "CPF inválido";
  }
  if (cpf.length === 14 && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
    return "Formato de CPF inválido";
  }
  if (/\D/.test(cpf) && cpf.length !== 14) {
    return "CPF inválido";
  }
  return "";
};

const validateUserCreateForm = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Obrigatório";
  }
  if (!values.email) {
    errors.email = "Obrigatório";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Endereço de e-mail inválido";
  }

  if (!values.registration) {
    errors.registration = "Obrigatório";
  }

  if (!values.permissions) {
    errors.permissions = "Obrigatório";
  }

  const cpfError = validateCPF(values.cpf);
  if (cpfError) {
    errors.cpf = cpfError;
  }

  return errors;
};

const validateUserEditForm = (values, user, setErrorType) => {
  const errors = validateUserCreateForm(values); // Reaproveitando a validação anterior

  if (
    values.name === user.name &&
    values.email === user.email &&
    values.cpf === user.cpf &&
    values.registration === user.registration &&
    values.permissions === user.permissions
  ) {
    errors._errors = "equalFields";
    setErrorType("equalFields");
  }

  return errors;
};

export { validateUserCreateForm, validateUserEditForm };
