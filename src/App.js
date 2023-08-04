import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import { useIsAuthenticated } from "react-auth-kit";
import "./App.css";
import refreshApi from "./contexts/refreshApi";
import User from "./pages/User";

const PrivateRoute = ({ Component }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  return auth ? <Component /> : <Navigate to="/login" />;
};

const LoginRoute = ({ Component }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  return auth ? <Navigate to="/" /> : <Component />;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  render() {
    return (
      <AuthProvider
        authType={"localstorage"}
        authName={"_auth"}
        refresh={refreshApi}
      >
        <Router>
          <Routes>
            <Route exact path="/" element={<PrivateRoute Component={Home} />} />
            <Route
              exact
              path="/users"
              element={<PrivateRoute Component={User} />}
            />
            <Route
              exact
              path="/login"
              element={<LoginRoute Component={Login} />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
