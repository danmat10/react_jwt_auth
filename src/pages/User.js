import React, { useState, useEffect } from "react";
import { Container, Button, Grid, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../components/Header";
import CreateUser from "../components/CreateUser";
import Dialog from "@mui/material/Dialog";
import ENDPOINTS from "../services/endpoints";
import axios from "axios";
import { useAuthHeader } from 'react-auth-kit'
import UnauthorizedError from "../errors/services/UnauthorizedError";
import ServerUnavailableError from "../errors/services/ServerUnavailableError";
import { DialogContent } from "@mui/material";
import Loading from "../components/Loading";
import FillAllFieldsError from "../errors/components/FillAllFieldsError";
import Alert from "@mui/material/Alert";

const UserPage = () => {
  const [view, setView] = useState("list"); // Pode ser 'list', 'create', 'update'
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [errorType, setErrorType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [sucess, setSucess] = useState(false);

  const authHeader = useAuthHeader();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrorType(null); // Limpa o tipo de erro quando o diálogo é fechado
  };

  // Função para abrir o formulário de criação
  const handleOpenCreateForm = () => {
    setView("create");
    handleOpen();
  };

  // Função para manipular a criação de um novo usuário
  const handleCreate = (user) => {
    setFormError(false);
    setIsLoading(true);
    if (!user.name || !user.email) {
      setFormError(true);
      return;
    }
    axios
      .post(ENDPOINTS.USER.POST, {
        email: user.email,
        name: user.name,
      }, {
        headers: {
          'Authorization': `${authHeader()}`
        }
      })
      .then((response) => {
        setIsLoading(false);
        setSucess(true);
        console.log(response);
      })
      .catch((error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          setIsLoading(false);
          setErrorType("unauthorized")
        } else if (error.request) {
          setIsLoading(false);
          setErrorType("serverUnavailable");
        }
        setIsLoading(false);
        console.log(error);
      });
    setView("list");
  };

  // Função para manipular a atualização de um usuário existente
  const handleUpdate = (user) => {
    // Chamar a API para atualizar o usuário e, em seguida, atualizar a lista
    setView("list");
  };

  // Função para manipular a exclusão de um usuário
  const handleDelete = (user) => {
    // Chamar a API para excluir o usuário e, em seguida, atualizar a lista
  };

  return (
    <div>
      <Header />
      <span>Usuários</span>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}></Grid>
        </Grid>
        {/* <DeleteDialog onDelete={handleDelete} /> */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleOpenCreateForm}
          style={{ position: "fixed", bottom: 20, right: 20 }}
        >
          <AddIcon />
        </Fab>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogContent>
          {sucess && <Alert severity="success" variant="filled">
            Usuário criado com sucesso!
          </Alert>}
          {isLoading && <Loading />}
          {formError && <FillAllFieldsError />}
          {errorType === "unauthorized" && <UnauthorizedError />}
          {errorType === "serverUnavailable" && <ServerUnavailableError />}
        </DialogContent>
        <CreateUser onCreate={handleCreate} />
      </Dialog>
    </div>
  );
};

export default UserPage;
