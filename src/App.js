// App.js

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import { Container, Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import CustomerDashboard from "./Customer/CustomerDashboard";
import AccountDetails from "./Account/AccountDetails";
import AccountDashboard from "./Account/AccountDashboard";
import Home from "./Home/Home";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (status) => {
    // Perform login logic here

    if (status) {
      toast.success("Log In Successful");
      setLoggedIn(true);
    } else {
      toast.error("User Credentials Incorrect");
    }
  };

  const handleRegistration = () => {
    toast.success("Registration successful");
  };

  return (
    <Router>
      <ToastContainer />
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Spring Vault Bank</NavbarBrand>
        <Nav className="ml-auto" navbar>
          {loggedIn ? (
            <>
              <NavItem>
                <NavLink
                  to="/"
                  className="nav-link"
                  onClick={() => setLoggedIn(false)}
                >
                  Logout
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/registration" className="nav-link">
                  Registration
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/login"
            exact
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/customer-dashboard/:customerId"
            exact
            element={<CustomerDashboard />}
          />
          <Route
            path="/registration"
            element={<Registration onRegister={handleRegistration} />}
          />
          <Route
            path="/create-account/:customerId"
            element={<AccountDetails />}
          />
          <Route
            path="/account/:customerId/:accountId"
            element={<AccountDashboard />}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
