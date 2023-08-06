import { useState } from "react";
import { useSignIn } from "react-auth-kit";
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

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorType, setErrorType] = useState(null);
  const [formError, setFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const signIn = useSignIn();

  const handleHtmlControlChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(false);
    setIsLoading(true);
    if (!email || !password) {
      setFormError(true);
      setIsLoading(false);
      return;
    }
    await axios
      .post(ENDPOINTS.AUTH.LOGIN, { email, password })
      .then((response) => {
        signIn({
          expiresIn: AUTH_TOKEN_EXPIRES_AT,
          token: response.data.access_token,
          tokenType: "Bearer",
          refreshToken: response.data.refresh_token,
          refreshTokenExpireIn: REFRESH_TOKEN_EXPIRES_AT,
          authState: response.data.access_token,
        });
      })
      .catch((error) => {
        let newErrorType = null;
        if (error.response && error.response.status === 401) {
          newErrorType = "unauthorized";
        } else if (error.request) {
          newErrorType = "serverUnavailable";
        }
        setErrorType(newErrorType);
        setIsLoading(false);
        console.log(error);
      });
  };

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
          {isLoading && <Loading />}
          {errorType === "unauthorized" && <UnauthorizedError />}
          {errorType === "serverUnavailable" && <ServerUnavailableError />}
          {formError && <FillAllFieldsError />}
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
            onSubmit={handleSubmit}
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
              value={email}
              onChange={handleHtmlControlChange}
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
              value={password}
              onChange={handleHtmlControlChange}
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
};

export default Login;
