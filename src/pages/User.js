import React, { useState, useEffect } from "react";
import { Container, Grid, Fab } from "@mui/material";
import { useAuthHeader } from "react-auth-kit";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import LinearProgress from "@mui/material/LinearProgress";
import UserList from "../components/User/UserList.component";
import UserEdit from "../components/User/UserEdit.component";
import UserView from "../components/User/UserView.component";
import UserDelete from "../components/User/UserDelete.component";
import Header from "../components/Header.component";
import CreateUser from "../components/User/UserCreate.component";
import ENDPOINTS from "../services/endpoints";
import { apiCall, handleErrorResponse } from "../services/apiHelper";
import SnackBarError from "../errors/components/SnackBarError.component";
import SnackBarSuccess from "../errors/components/SnackBarSuccess.component";

const UserPage = () => {
  useEffect(() => {
    handleUpdateUserList();
  }, []);

  const [view, setView] = useState("list"); // Pode ser 'list', 'create', 'update', 'view', delete
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [openSnackBarError, setOpenSnackBarError] = useState(false);
  const [openSnackBarSuccess, setOpenSnackBarSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    content: "",
  });

  const authHeader = useAuthHeader();
  const headers = {
    Authorization: `${authHeader()}`,
  };

  const handleOpen = () => setOpen(true);

  const handleCloseSnackbarError = () => {
    setOpenSnackBarError(false);
  };

  const handleOpenSnackBarError = () => {
    setOpenSnackBarError(true);
  };

  const handleCloseSnackbarSuccess = () => {
    setOpenSnackBarSuccess(false);
  };

  const handleOpenSnackBarSuccess = () => {
    setOpenSnackBarSuccess(true);
  };

  const handleClose = () => {
    setOpen(false);
    setView("list");
  };

  const handleOpenDeleteForm = (user) => {
    setView("delete");
    setOpen(true);
    setSelectedUser(user);
  };

  const handleOpenViewForm = (user) => {
    setView("view");
    setOpen(true);
    setSelectedUser(user);
  };

  const handleOpenCreateForm = () => {
    setView("create");
    handleOpen();
  };

  const handleOpenEditForm = (user) => {
    setView("update");
    setSelectedUser(user);
    handleOpen();
  };

  const handleApiCall = async (
    method,
    endpoint,
    data,
    headers,
    onSucess,
    successMessage
  ) => {
    try {
      setIsLoading(true);
      const response = await apiCall(method, endpoint, data, headers);
      if (onSucess) {
        onSucess(response);
      }
      if (successMessage) {
        setMessage({ type: "success", content: successMessage });
        handleOpenSnackBarSuccess();
      }
    } catch (error) {
      handleErrorResponse(error, handleOpenSnackBarError, setMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = (user) => {
    handleApiCall(
      "post",
      ENDPOINTS.USER.POST,
      user,
      headers,
      "",
      "Usuário criado com sucesso!"
    );
    handleUpdateUserList();
  };

  const handleUpdateUserList = () => {
    handleApiCall("get", ENDPOINTS.USER.GET, null, headers, setUsers);
  };

  const handleEditUser = (user) => {
    handleApiCall(
      "patch",
      ENDPOINTS.USER.PATCH + selectedUser.id,
      user,
      headers,
      "",
      "Usuário atualizado com sucesso!"
    );
    handleUpdateUserList();
  };

  const handleDelete = (user) => {
    handleApiCall(
      "delete",
      ENDPOINTS.USER.DELETE + selectedUser.id,
      {},
      headers,
      "",
      "Usuário deletado com sucesso!"
    );
    handleClose();
    handleUpdateUserList();
  };

  return (
    <div>
      <Header />
      <Container>
        <Grid container>
          <UserList
            users={users}
            onEdit={handleOpenEditForm}
            onDelete={handleOpenDeleteForm}
            onView={handleOpenViewForm}
          />
        </Grid>
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleOpenCreateForm}
          style={{ position: "fixed", bottom: 20, right: 20 }}
          title="Adicionar usuário"
        >
          <AddIcon />
        </Fab>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {view === "create" && <CreateUser onCreate={handleCreateUser} />}
        {view === "update" && (
          <UserEdit user={selectedUser} onUpdate={handleEditUser} />
        )}
        {view === "delete" && (
          <UserDelete
            user={selectedUser}
            handleDelete={handleDelete}
            handleClose={handleClose}
          />
        )}
        {isLoading === true && <LinearProgress />}
        {view === "view" && <UserView user={selectedUser} />}
      </Dialog>
      <SnackBarError
        open={openSnackBarError}
        onClose={handleCloseSnackbarError}
        message={message}
      />
      <SnackBarSuccess
        open={openSnackBarSuccess}
        onClose={handleCloseSnackbarSuccess}
        message={message}
      />
    </div>
  );
};

export default UserPage;
