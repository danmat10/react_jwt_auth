import React, { useState, useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Container, Fab, Typography, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import {
  UserList,
  UserEdit,
  UserView,
  UserDelete,
  UserCreate,
} from "../components/User";
import { Header } from "../components/Header";
import { apiCall, ENDPOINTS } from "../services";
import { MESSAGES } from "../config";

const UserPage = () => {
  useEffect(() => handleUpdateUserList(), []);
  const authHeader = useAuthHeader();

  const [state, setState] = useState({
    view: "",
    selectedUser: null,
    openDialog: false,
    users: [],
    message: { type: "", content: "" },
  });

  const openDialog = (view, user = null) => {
    setState((prev) => ({
      ...prev,
      view,
      openDialog: true,
      selectedUser: user,
    }));
  };

  const closeDialog = () => {
    setState((prev) => ({ ...prev, view: "", openDialog: false }));
  };

  const handleApiCall = async (config, toastObject) => {
    const { method, endpoint, data } = config;
    const response = await apiCall(
      method,
      endpoint,
      data,
      {
        Authorization: authHeader(),
      },
      toastObject
    );
    return response;
  };

  const handleCreateUser = async (user) => {
    await handleApiCall(
      { method: "post", endpoint: ENDPOINTS.USER.POST, data: user },
      MESSAGES.USER.POST
    );
    handleUpdateUserList();
  };

  const handleEditUser = async (user) => {
    await handleApiCall(
      {
        method: "patch",
        endpoint: ENDPOINTS.USER.PATCH + user.id,
        data: user,
      },
      MESSAGES.USER.PATCH
    );
    handleUpdateUserList();
  };

  const handleUpdateUserList = async () => {
    let users = await handleApiCall(
      {
        method: "get",
        endpoint: ENDPOINTS.USER.GET,
      },
      MESSAGES.USER.GET
    );
    if (!users) users = [];
    setState((prev) => ({ ...prev, users }));
  };

  const handleDeleteUser = async (user) => {
    await handleApiCall(
      { method: "delete", endpoint: ENDPOINTS.USER.DELETE + user.id },
      MESSAGES.USER.DELETE
    );
    closeDialog();
    handleUpdateUserList();
  };

  const views = {
    list: <UserList users={state.users} openDialog={openDialog} />,
    create: <UserCreate onCreate={handleCreateUser} />,
    update: <UserEdit user={state.selectedUser} onUpdate={handleEditUser} />,
    view: <UserView user={state.selectedUser} />,
    delete: (
      <UserDelete
        user={state.selectedUser}
        onDelete={handleDeleteUser}
        onClose={closeDialog}
      />
    ),
  };

  return (
    <div>
      <Header />
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <Typography variant="h4">User Management</Typography>
          </Grid>
          {views.list}
        </Grid>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => openDialog("create")}
          style={{ position: "fixed", bottom: 20, right: 20 }}
          title="Adicionar usuário"
        >
          <AddIcon />
        </Fab>
      </Container>
      <Dialog open={state.openDialog} onClose={closeDialog}>
        {views[state.view]}
      </Dialog>
    </div>
  );
};

export default UserPage;
