import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import { Cookies, withCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const clearCookie = (cookies) => {
  cookies.remove('auth-session');
  window.location.replace('/logout');
};

const StyledHeader = styled.header`
      padding-bottom: 8px;
`;

export const Header = ({ cookies }) => {
  const [userLoaded, setUserLoaded] = React.useState(false);
  const [user, setUser] = React.useState('');

  React.useEffect(() => {
    axios
      .get('/whoami', {})
      .then((response) => {
        setUserLoaded(true);
        setUser(response.data);
      });
  }, []);

  return (
    <StyledHeader id="header">
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="/"><strong>BST</strong></Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown href="/ddr" title="DDR">
            <NavDropdown.Item href="/ddr">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/ddr/stats">Stats</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {
            userLoaded
              ? (
                <NavDropdown id="user-dropdown" title={user || 'Not logged in.'}>
                  {
                    user
                      ? (
                        <>
                          <NavDropdown.Item href="/user">Profile</NavDropdown.Item>
                          <NavDropdown.Item onClick={() => clearCookie(cookies)}>
                            Logout
                          </NavDropdown.Item>
                        </>
                      )
                      : <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  }
                </NavDropdown>
              )
              : <NavDropdown id="user-dropdown" title="Please wait..." />
          }
        </Nav>
      </Navbar>
    </StyledHeader>
  );
};

Header.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};
