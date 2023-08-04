import React, { useState, useEffect } from "react";
import { Container, Grid, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../components/Header.component";
import CreateUser from "../components/UserCreate.component";
import Dialog from "@mui/material/Dialog";
import ENDPOINTS from "../services/endpoints";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import UnauthorizedError from "../errors/services/UnauthorizedError.component";
import ServerUnavailableError from "../errors/services/ServerUnavailableError.component";
import { DialogContent } from "@mui/material";
import Loading from "../components/Loading.component";
import Alert from "@mui/material/Alert";
import UserList from "../components/UserList.component";
import UserEdit from "../components/UserEdit.component";
import EqualFieldsError from "../errors/components/EqualFieldsError.component";
import UserView from "../components/UserView.component";

const UserPage = () => {
  useEffect(() => {
    handleUpdateUserList();
  }, []);

  const [view, setView] = useState("list"); // Pode ser 'list', 'create', 'update', 'view'
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [errorType, setErrorType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [users, setUsers] = useState([]);
  const authHeader = useAuthHeader();

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setErrorType(null);
    setView("list");
  };

  const handleOpenViewForm = (user) => {
    setView("view");
    setOpen(true);
    setSelectedUser(user);
  };

  const handleOpenCreateForm = () => {
    setView("create");
    setErrorType(null);
    setIsLoading(false);
    setSucess(false);
    handleOpen();
  };

  const handleOpenEditForm = (user) => {
    setView("update");
    setSelectedUser(user);
    setErrorType(null);
    setIsLoading(false);
    setSucess(false);
    handleOpen();
  };

  const handleCreateUser = (user) => {
    setIsLoading(true);
    axios
      .post(
        ENDPOINTS.USER.POST,
        {
          email: user.email,
          name: user.name,
        },
        {
          headers: {
            Authorization: `${authHeader()}`,
          },
        }
      )
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

  const handleEditUser = (values) => {
    setIsLoading(true);
    axios
      .patch(
        ENDPOINTS.USER.PATCH + selectedUser.id,
        {
          email: values.email,
          name: values.name,
        },
        {
          headers: {
            Authorization: `${authHeader()}`,
          },
        }
      )
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
    // Chamar a API para excluir o usuário e, em seguida, atualizar a lista
  };

  return (
    <div>
      <Header />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UserList
              users={users}
              onEdit={handleOpenEditForm}
              onDelete={handleDelete}
              onView={handleOpenViewForm}
            />
          </Grid>
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
          {sucess && (
            <Alert severity="success" variant="filled">
              Solicitação feita com sucesso!
            </Alert>
          )}
          {isLoading && <Loading />}
          {errorType === "unauthorized" && <UnauthorizedError />}
          {errorType === "serverUnavailable" && <ServerUnavailableError />}
          {errorType === "equalFields" && <EqualFieldsError />}
        </DialogContent>
        {view === "create" && <CreateUser onCreate={handleCreateUser} />}
        {view === "update" && (
          <UserEdit
            user={selectedUser}
            onUpdate={handleEditUser}
            setErrorType={setErrorType}
          />
        )}
        {view === "view" && <UserView user={selectedUser} />}
      </Dialog>
    </div>
  );
};

export default UserPage;
