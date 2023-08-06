import React from "react";
import {
  Typography,
  Grid,
  Paper,
  Box,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const UserView = ({ user }) => {
  return (
    <>
      <DialogTitle>Visualizar Usuário</DialogTitle>

      <DialogContent>
        <DialogContentText marginBottom={2}>
          Você está visualizando os detalhes do usuário. Aqui estão todas as
          informações associadas a esse usuário.
        </DialogContentText>
        <Typography variant="subtitle1" align="center">
          Nome
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          paragraph
        >
          {user.name}
        </Typography>
        <Typography variant="subtitle1" align="center">
          E-mail
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center">
          {user.email}
        </Typography>
      </DialogContent>
    </>
  );
};

export default UserView;
