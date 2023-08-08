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

const ConditionalRoute = ({ Component, redirectTo, inverse = false }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  if (inverse ? !auth : auth) {
    return <Component />;
  } else {
    return <Navigate to={redirectTo} />;
  }
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
            <Route
              exact
              path="/"
              element={
                <ConditionalRoute Component={Home} redirectTo="/login" />
              }
            />
            <Route
              exact
              path="/users"
              element={
                <ConditionalRoute Component={User} redirectTo="/login" />
              }
            />
            <Route
              exact
              path="/login"
              element={
                <ConditionalRoute
                  Component={Login}
                  redirectTo="/"
                  inverse={true}
                />
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
