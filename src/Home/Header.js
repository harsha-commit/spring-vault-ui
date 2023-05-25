// Header.js

import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import { Link } from "react-router-dom";

const Header = ({ loggedIn, onLogout }) => {
  return (
    <Navbar color="success" expand="md">
      <NavbarBrand tag={Link} to="/">
        Bank App
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        {loggedIn && (
          <>
            <NavItem>
              <Button color="link" onClick={onLogout}>
                Logout
              </Button>
            </NavItem>
          </>
        )}
        {!loggedIn && (
          <>
            <NavItem>
              <NavLink tag={Link} to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/registration">
                Registration
              </NavLink>
            </NavItem>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
