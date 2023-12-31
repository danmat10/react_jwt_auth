import React, { useState, useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Container, Typography, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";

import {
  UserList,
  UserEdit,
  UserView,
  UserDelete,
  UserCreate,
  UserBreadcrumb,
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
    create: (
      <UserCreate
        onCreate={handleCreateUser}
        openDialog={openDialog}
        onClose={closeDialog}
      />
    ),
    update: (
      <UserEdit
        user={state.selectedUser}
        onUpdate={handleEditUser}
        onClose={closeDialog}
      />
    ),
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
    <>
      <Header />
      <Container maxWidth="xl">
        <Container maxWidth="xl">
          <Grid item lg={12} paddingY={5}>
            <UserBreadcrumb />
            <Typography variant="h4" marginTop={2}>
              Usuários
            </Typography>
          </Grid>
        </Container>
        <Container maxWidth="xl">{views.list}</Container>
      </Container>

      <Dialog
        open={state.openDialog}
        onClose={closeDialog}
        PaperProps={{ sx: { borderRadius: "28px" } }}
      >
        {views[state.view]}
      </Dialog>
    </>
  );
};

export default UserPage;
