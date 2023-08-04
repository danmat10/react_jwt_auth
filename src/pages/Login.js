import React, { Component } from "react";
import { withSignIn } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import axios from "axios";
import ENDPOINTS from "../services/endpoints";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UnauthorizedError from "../errors/services/UnauthorizedError.component";
import ServerUnavailableError from "../errors/services/ServerUnavailableError.component";
import FillAllFieldsError from "../errors/components/FillAllFieldsError.component";
import Loading from "../components/Loading.component";
import {
  AUTH_TOKEN_EXPIRES_AT,
  REFRESH_TOKEN_EXPIRES_AT,
} from "../config/constants";

class Login extends Component {
  constructor(props) {
    super(props);
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    this.state = {
      email: "",
      password: "",
      errorType: null,
      formError: false,
      isLoading: false,
      isSigned: false,
    };
    if (access_token !== null && refresh_token !== null) {
      this.props.signIn({
        expiresIn: AUTH_TOKEN_EXPIRES_AT,
        token: access_token,
        tokenType: "Bearer",
        refreshToken: refresh_token,
        refreshTokenExpireIn: REFRESH_TOKEN_EXPIRES_AT,
      });
      this.setState({ isSigned: true, isLoading: false });
    } else {
      this.setState({ isSigned: false });
    }
    console.log(this.state)
  }

  handleHtmlControlChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ formError: false, isLoading: true });
    if (!this.state.email || !this.state.password) {
      this.setState({ formError: true, isLoading: false });
      return;
    }
    axios
      .post(ENDPOINTS.AUTH.LOGIN, {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        this.props.signIn({
          expiresIn: AUTH_TOKEN_EXPIRES_AT,
          token: response.data.access_token,
          tokenType: "Bearer",
          refreshToken: response.data.refresh_token,
          refreshTokenExpireIn: REFRESH_TOKEN_EXPIRES_AT,
        });
        this.setState({ isSigned: true, isLoading: false });
      })
      .catch((error) => {
        let errorType = null;
        if (error.response && error.response.status === 401) {
          errorType = "unauthorized";
        } else if (error.request) {
          errorType = "serverUnavailable";
        }
        this.setState({ errorType, isLoading: false }); //implementar erro genérico
        console.log(error);
      });
  };

  render() {
    if (this.state.isSigned) {
      return <Navigate to={"/"} replace />;
    }

    return (
      <ThemeProvider theme={createTheme()}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {this.state.isLoading && <Loading />}
            {this.state.errorType === "unauthorized" && <UnauthorizedError />}
            {this.state.errorType === "serverUnavailable" && (
              <ServerUnavailableError />
            )}
            {this.state.formError && <FillAllFieldsError />}
          </Box>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Realizar Login
            </Typography>
            <Box
              component="form"
              onSubmit={this.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Digite o e-mail"
                name="email"
                value={this.state.email}
                onChange={this.handleHtmlControlChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Digite a senha"
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleHtmlControlChange}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Fazer Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Esqueceu sua senha?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default withSignIn(Login);
