import React from 'react';
import clsx from 'clsx';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { StyledHeader } from '../componentstylers/container-styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: '#000000',
  },
  titleTypo: {
    '&:hover': {
      color: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#000000',
  },
  navbar: {
    backgroundColor: '#2b2b2b',
  },
  right: {
    marginRight: theme.spacing(2),
  },

  appBar: {
    height: 70,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const clearCookie = (cookies) => {
  cookies.remove('auth-session');
  window.location.replace('/logout');
};

export const Header = ({ cookies, drawerControl }) => {
  const [userLoaded, setUserLoaded] = React.useState(true);
  const [user, setUser] = React.useState('');
  const classes = useStyles();

  React.useEffect(() => {
    axios
      .get('/whoami', {})
      .then((response) => {
        setUserLoaded(true);
        setUser(response.data);
      });
  }, []);

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.navbar, classes.appBar)}
      >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => drawerControl()}>
            <MenuIcon />
          </IconButton>
          <a href="/" className={classes.title}>
            <Typography variant="h2" className={classes.titleTypo}>
              <strong>BST</strong>
            </Typography>
          </a>
          <span className={classes.right}>
            { userLoaded ? <UserDropdown user={user} /> : <CircularProgress /> }
          </span>
        </Toolbar>
      </AppBar>
    </div>
  );
/*
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
  );*/
};

Header.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};


const UserDropdown = ({user}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  if (user === '') {
    return <Button href="/login">Login</Button>;
  }

  return (
    <AccountCircle onClick={() => setDropdownOpen(!dropdownOpen)}>
      <UserMenu open={dropdownOpen} />
    </AccountCircle>
  );
};

UserDropdown.defaultProps = {
  user: '',
};

UserDropdown.propTypes = {
  user: PropTypes.string,
};
