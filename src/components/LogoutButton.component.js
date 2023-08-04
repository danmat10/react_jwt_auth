import React from "react";
import { useSignOut } from "react-auth-kit";
import Button from "@mui/material/Button";

const LogoutButton = () => {
  const signOut = useSignOut();

  return (
    <Button color="inherit" onClick={() => signOut()}>
      Sair
    </Button>
  );
};

export default LogoutButton;
