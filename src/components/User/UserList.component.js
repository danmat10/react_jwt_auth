import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ViewIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UserList = ({ users, openDialog }) => {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "name", headerName: "Nome", width: 150 },
    { field: "email", headerName: "E-mail", width: 200 },
    {
      field: "actions",
      headerName: "Ações",
      width: 150,
      renderCell: (params) => (
        <>
          <ViewIcon
            color="primary"
            onClick={() => openDialog("view", params.row)}
            style={{ cursor: "pointer" }}
            titleAccess="Visualizar"
          />
          <EditIcon
            color="primary"
            onClick={() => openDialog("update", params.row)}
            style={{ cursor: "pointer" }}
            titleAccess="Editar"
          />
          <DeleteIcon
            color="secondary"
            onClick={() => openDialog("delete", params.row)}
            style={{ cursor: "pointer" }}
            titleAccess="Excluir"
          />
        </>
      ),
    },
  ];

  return (
    <Box>
      <Box marginTop={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Pesquisar usuário"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          autoPageSize
          pageSizeOptions={[10]}
          checkboxSelection={false}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default UserList;
