import React, { useState, useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Container, Grid, Fab } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import LinearProgress from "@mui/material/LinearProgress";
import AddIcon from "@mui/icons-material/Add";
import {
  UserList,
  UserEdit,
  UserView,
  UserDelete,
  UserCreate,
} from "../components/User";
import Header from "../components/Header.component";
import SnackBarError from "../errors/components/SnackBarError.component";
import SnackBarSuccess from "../errors/components/SnackBarSuccess.component";
import ENDPOINTS from "../services/endpoints";
import { apiCall, handleErrorResponse } from "../services/apiHelper";

const UserPage = () => {
  useEffect(() => handleUpdateUserList(), []);
  const authHeader = useAuthHeader();

  const [state, setState] = useState({
    view: "",
    selectedUser: null,
    openDialog: false,
    users: [],
    openSnackBarError: false,
    openSnackBarSuccess: false,
    isLoading: false,
    message: { type: "", content: "" },
  });

  const toggleSnackBar = (type, open) => {
    setState((prev) => ({ ...prev, [type]: open }));
  };

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

  const handleApiCall = async (config, successMessage = "") => {
    const { method, endpoint, data } = config;

    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const response = await apiCall(method, endpoint, data, {
        Authorization: authHeader(),
      });

      if (successMessage) {
        setState((prev) => ({
          ...prev,
          message: { type: "success", content: successMessage },
        }));
        toggleSnackBar("openSnackBarSuccess", true);
      }
      return response;
    } catch (error) {
      handleErrorResponse(
        error,
        () => toggleSnackBar("openSnackBarError", true),
        (message) => setState((prev) => ({ ...prev, message }))
      );
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleCreateUser = async (user) => {
    await handleApiCall(
      { method: "post", endpoint: ENDPOINTS.USER.POST, data: user },
      "Usuário criado com sucesso!"
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
      "Usuário atualizado com sucesso!"
    );
    handleUpdateUserList();
  };

  const handleUpdateUserList = async () => {
    let users = await handleApiCall({
      method: "get",
      endpoint: ENDPOINTS.USER.GET,
    });
    if (!users) users = [];
    setState((prev) => ({ ...prev, users }));
  };

  const handleDeleteUser = async (user) => {
    await handleApiCall(
      { method: "delete", endpoint: ENDPOINTS.USER.DELETE + user.id },
      "Usuário excluído com sucesso!"
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
        <Grid container>{views.list}</Grid>
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
        {state.isLoading && <LinearProgress />}
      </Dialog>
      <SnackBarError
        open={state.openSnackBarError}
        onClose={() => toggleSnackBar("openSnackBarError", false)}
        message={state.message}
      />
      <SnackBarSuccess
        open={state.openSnackBarSuccess}
        onClose={() => toggleSnackBar("openSnackBarSuccess", false)}
        message={state.message}
      />
    </div>
  );
};

export default UserPage;
