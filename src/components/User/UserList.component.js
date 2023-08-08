import React, { useState } from "react";
import { Grid, TextField, Select, MenuItem, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DataGrid } from "@mui/x-data-grid";
import ViewIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UserList = ({ users, openDialog }) => {
  const [search, setSearch] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("name");

  const filteredUsers = users.filter((user) =>
    user[selectedColumn]?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "name", headerName: "Nome", flex: 2 },
    { field: "email", headerName: "E-mail", flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      flex: 1,
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
    <>
      <Grid item xs={6} md={4} lg={4}>
        <TextField
          fullWidth
          variant="outlined"
          label="Pesquisar usuário"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Grid>
      <Grid item xs={4} md={4} lg={4}>
        <Select
          fullWidth
          variant="outlined"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
        >
          <MenuItem value="name">Nome</MenuItem>
          <MenuItem value="email">E-mail</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={2} md={2} lg={2}>
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <DataGrid
          sx={{ height: 500 }}
          rows={filteredUsers}
          columns={columns}
          autoPageSize
          pageSizeOptions={[10]}
          checkboxSelection={false}
          disableSelectionOnClick
        />
      </Grid>
    </>
  );
};

export default UserList;
