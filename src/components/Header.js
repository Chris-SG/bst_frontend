import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import axios from 'axios';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoaded: false,
      user: '',
    };
  }

  componentDidMount() {
    axios
      .get('/whoami', {})
      .then((response) => {
        this.setState({
          userLoaded: true,
          user: response.data,
        });
      });
  }

  render() {
    const { userLoaded, user } = this.state;
    return (
      <header id="header">
        <Navbar bg="dark" variant="dark" sticky="top">
          <Navbar.Brand href="/"><strong>BST</strong></Navbar.Brand>
          <Nav className="mr-auto">
            <NavDropdown href="/ddr" title="DDR">
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
                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
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
      </header>
    );
  }
}
