import React from 'react';
import Alert from '@mui/material/Alert';

function ServerUnavailableError() {
  return (
    <Alert severity="warning" variant="filled">
      O servidor está indisponível. Tente novamente mais tarde.
    </Alert>
  );
}

export default ServerUnavailableError;
