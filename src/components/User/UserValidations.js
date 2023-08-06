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

  return errors;
};

const validateUserEditForm = (values, user, setErrorType) => {
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

export { validateUserCreateForm, validateUserEditForm };
