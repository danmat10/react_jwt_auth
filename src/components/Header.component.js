import React, { Component } from "react";
import LogoutButton from "./LogoutButton.component";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
          <Button color="inherit" component={Link} to="/users">User</Button>
          <LogoutButton />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
