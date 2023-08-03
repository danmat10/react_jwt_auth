import React, { Component } from "react";
import LogoutButton from "./LogoutButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

class Header extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
