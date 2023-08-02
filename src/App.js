import React, { component } from "react";
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

const Private = ({ Component }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated(); //your logic
  return auth ? <Component /> : <Navigate to="/login" />;
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
              <Route exact path="/" element={<Private Component={Home} />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </Router>
        </AuthProvider>
    );
  }
}

export default App;
