import React, { Component } from "react";
import { withSignIn } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import axios from "axios";
import ENDPOINTS from "../services/endpoints";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isSigned: false,
    };
  }

  handleHtmlControlChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    console.log(this.state);
    event.preventDefault();
    axios
      .post(ENDPOINTS.AUTH.LOGIN, this.state)
      .then((response) => {
        if (
          this.props.signIn({
            expiresIn: 5,
            token: response.data.access_token,
            tokenType: "Bearer",
            refreshToken: response.data.refresh_token,
            refreshTokenExpireIn: 1500,
            authState: true,
          })
        ) {
          this.setState({ isSigned: true });
          console.log(response.data.access_token);
        } else {
          console.log("error signin");
          // Throw error
        }
        this.setState({ message: "User logged successfully." });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.isSigned) {
      return <Navigate to="/" />;
    }

    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <div
          style={{
            width: "400px",
            padding: "1rem",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Login</h2>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Email"
              fullWidth
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleHtmlControlChange}
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              label="Senha"
              fullWidth
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleHtmlControlChange}
              style={{ marginBottom: "1rem" }}
            />
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withSignIn(Login);
