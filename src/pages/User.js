import React, { useState, useEffect } from "react";
import { Container, Grid, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../components/Header.component";
import CreateUser from "../components/User/UserCreate.component";
import Dialog from "@mui/material/Dialog";
import ENDPOINTS from "../services/endpoints";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import UnauthorizedError from "../errors/services/UnauthorizedError.component";
import ServerUnavailableError from "../errors/services/ServerUnavailableError.component";
import Loading from "../components/Loading.component";
import Alert from "@mui/material/Alert";
import UserList from "../components/User/UserList.component";
import UserEdit from "../components/User/UserEdit.component";
import EqualFieldsError from "../errors/components/EqualFieldsError.component";
import UserView from "../components/User/UserView.component";
import UserDelete from "../components/User/UserDelete.component";

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
  const authHeader = useAuthHeader();

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

  const handleCreateUser = (user) => {
    handleMessages();
    setIsLoading(true);
    axios
      .post(ENDPOINTS.USER.POST, user, {
        headers: {
          Authorization: `${authHeader()}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setSucess(true);
        handleUpdateUserList();
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          setIsLoading(false);
          setErrorType("unauthorized");
        } else if (error.request) {
          setIsLoading(false);
          setErrorType("serverUnavailable");
        }
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleUpdateUserList = () => {
    axios
      .get(ENDPOINTS.USER.GET, {
        headers: {
          Authorization: `${authHeader()}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          setErrorType("unauthorized");
        } else if (error.request) {
          setErrorType("serverUnavailable");
        }
        console.log(error);
      });
  };

  const handleEditUser = (user) => {
    handleMessages();
    setIsLoading(true);
    axios
      .patch(ENDPOINTS.USER.PATCH + selectedUser.id, user, {
        headers: {
          Authorization: `${authHeader()}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setSucess(true);
        handleUpdateUserList();
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          setIsLoading(false);
          setErrorType("unauthorized");
        } else if (error.request) {
          setIsLoading(false);
          setErrorType("serverUnavailable");
        }
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleDelete = (user) => {
    handleMessages();
    setIsLoading(true);
    axios
      .delete(ENDPOINTS.USER.PATCH + selectedUser.id, {
        headers: {
          Authorization: `${authHeader()}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setSucess(true);
        setView("list");
        handleUpdateUserList();
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          setIsLoading(false);
          setErrorType("unauthorized");
        } else if (error.request) {
          setIsLoading(false);
          setErrorType("serverUnavailable");
        }
        setIsLoading(false);
        console.log(error);
      });
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
