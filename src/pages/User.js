import React, { useState, useEffect } from "react";
import { Container, Grid, Fab } from "@mui/material";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import UserList from "../components/User/UserList.component";
import UserEdit from "../components/User/UserEdit.component";
import EqualFieldsError from "../errors/components/EqualFieldsError.component";
import UserView from "../components/User/UserView.component";
import UserDelete from "../components/User/UserDelete.component";
import Header from "../components/Header.component";
import CreateUser from "../components/User/UserCreate.component";
import ENDPOINTS from "../services/endpoints";
import UnauthorizedError from "../errors/services/UnauthorizedError.component";
import ServerUnavailableError from "../errors/services/ServerUnavailableError.component";
import Loading from "../components/Loading.component";
import { apiCall, handleErrorResponse } from "../services/apiHelper";
import MessageDialog from "../errors/components/MessageDialog.component";

const UserPage = () => {
  useEffect(() => {
    handleUpdateUserList();
  }, []);

  const [view, setView] = useState("list"); // Pode ser 'list', 'create', 'update', 'view', delete
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [errorType, setErrorType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState({
    type: null,
    content: null,
  });

  const authHeader = useAuthHeader();
  const headers = {
    Authorization: `${authHeader()}`,
  };

  const handleMessages = () => {
    setErrorType(null);
    setSucess(false);
    setIsLoading(false);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    handleMessages();
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
    setErrorType(null);
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
      setMessage({ type: "loading", content: "Carregando..." });
      const response = await apiCall(method, endpoint, data, headers);
      if (onSucess) {
        onSucess(response);
      }
      if (successMessage) {
        setMessage({ type: "success", content: successMessage });
      } else {
        setMessage(null);
      }
    } catch (error) {
      handleErrorResponse(error, (type, errorMessage) => {
        setMessage({ type: type, content: errorMessage });
      });
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
  };

  const handleDelete = (user) => {
    handleApiCall(
      "delete",
      ENDPOINTS.USER.DELETE + selectedUser.id,
      {},
      headers
    );
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
        {sucess && (
          <Alert severity="success" variant="filled">
            Solicitação feita com sucesso!
          </Alert>
        )}
        {isLoading && <Loading />}
        {errorType === "unauthorized" && <UnauthorizedError />}
        {errorType === "serverUnavailable" && <ServerUnavailableError />}
        {errorType === "equalFields" && <EqualFieldsError />}
        {view === "create" && <CreateUser onCreate={handleCreateUser} />}
        {view === "update" && (
          <UserEdit
            user={selectedUser}
            onUpdate={handleEditUser}
            setErrorType={setErrorType}
          />
        )}
        {view === "delete" && (
          <UserDelete
            user={selectedUser}
            handleDelete={handleDelete}
            handleClose={handleClose}
          />
        )}
        {view === "view" && <UserView user={selectedUser} />}
      </Dialog>
    </div>
  );
};

export default UserPage;
