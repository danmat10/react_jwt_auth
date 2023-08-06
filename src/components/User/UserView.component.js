import React from "react";
import { Typography, Grid, Paper } from "@mui/material";

const UserView = ({ user }) => {
  return (
    <Paper style={{ padding: 16 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Nome:</Typography>
          <Typography variant="body1">{user.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">E-mail:</Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserView;
