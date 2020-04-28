import React from 'react';
import Menu from '@material-ui/core/Menu';
import { Cookies } from 'react-cookie';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

export const UserDropdown = ({ user, cookies }) => {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const dropdownOpen = Boolean(anchorMenu);

  if (user === '') {
    return <Button href="/login">Login</Button>;
  }

  const handleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  return (
    <div>
      <IconButton onClick={handleMenu}>
        <AccountCircle />
      </IconButton>
      <UserMenu
        anchor={anchorMenu}
        setAnchor={setAnchorMenu}
        menuOpen={dropdownOpen}
        user={user}
        cookies={cookies}
      />
    </div>
  );
};

UserDropdown.defaultProps = {
  user: '',
  cookies: null,
};

UserDropdown.propTypes = {
  user: PropTypes.string,
  cookies: PropTypes.instanceOf(Cookies),
};

const UserMenu = ({
  anchor,
  setAnchor,
  menuOpen,
  user,
  cookies,
}) => {
  const clearCookie = (c) => {
    c.remove('auth-session');
    window.location.replace('/logout');
  };

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchor}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={menuOpen}
      onClose={() => setAnchor(null)}
    >
      <MenuItem disabled>
        Hello,
        {' '}
        {user}
        .
      </MenuItem>
      <a href="/user">
        <MenuItem>Profile</MenuItem>
      </a>
      <Divider variant="middle" />
      <a href="/logout">
        <MenuItem onClick={() => clearCookie(cookies)}>Logout</MenuItem>
      </a>
    </Menu>
  );
};

UserMenu.propTypes = {
  anchor: PropTypes.oneOfType([
    PropTypes.object,
  ]),
  setAnchor: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
  cookies: PropTypes.instanceOf(Cookies),
};

UserMenu.defaultProps = {
  anchor: null,
  cookies: null,
};
