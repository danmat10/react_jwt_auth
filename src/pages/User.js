import React, { useState, useEffect } from "react";
import { Container, Button, Grid, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../components/Header";
import CreateUser from "../components/CreateUser";

const UserPage = () => {
  // Utilize o estado para controlar a visualização dos componentes/formulários
  const [view, setView] = useState("list"); // Pode ser 'list', 'create', 'update'
  const [selectedUser, setSelectedUser] = useState(null);

  // Função para abrir o formulário de criação
  const handleOpenCreateForm = () => {
    setView("create");
  };

  // Função para manipular a criação de um novo usuário
  const handleCreate = (user) => {
    // Chamar a API para criar o usuário e, em seguida, atualizar a lista
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
      {view === "create" && <CreateUser onCreate={handleCreate} />}
    </div>
  );
};

export default UserPage;
