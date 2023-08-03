import React from 'react';
import Alert from '@mui/material/Alert';

function UnauthorizedError() {
  return (
    <Alert severity="error" variant="filled">
      Você não está autorizado. Por favor, faça login.
    </Alert>
  );
}

export default UnauthorizedError;
