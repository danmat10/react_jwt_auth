import React, { Component } from "react";
import { withSignOut } from "react-auth-kit";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { MenuButton, UserAvatar, UserMenu, Sidebar } from ".";

class Header extends Component {
  state = {
    anchorEl: null,
    isSidebarOpen: false,
  };

  toggleSidebar = () => {
    this.setState((prevState) => ({ isSidebarOpen: !prevState.isSidebarOpen }));
  };

  handleMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.props.signOut();
  };

  handleEditProfile = () => {
    // Implemente a navegação ou lógica de edição de perfil aqui
    this.handleMenuClose();
  };

  render() {
    const { anchorEl, isSidebarOpen } = this.state;

    return (
      <>
        <AppBar position="static" elevation={2}>
          <Toolbar>
            <MenuButton onClick={this.toggleSidebar} />
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              Nome da Aplicação
            </Typography>
            <UserAvatar initial="U" onClick={this.handleMenuOpen} />
            <UserMenu
              anchorEl={anchorEl}
              onClose={this.handleMenuClose}
              onEditProfile={this.handleEditProfile}
              onLogout={this.handleLogout}
            />
          </Toolbar>
        </AppBar>
        <Sidebar isOpen={isSidebarOpen} onClose={this.toggleSidebar} />
      </>
    );
  }
}

export default withSignOut(Header);
