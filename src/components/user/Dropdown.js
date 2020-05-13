import React from 'react';
import Menu from '@material-ui/core/Menu';
import { withCookies, Cookies } from 'react-cookie';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Loading } from '../common/Loading';

const useStyles = makeStyles(theme => ({
  setNickname: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(3),
      width: theme.spacing(32),
      height: theme.spacing(24),
    },
  },
}));

export const UserDropdown = ({ user, setUser, loggedIn }) => {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const [nicknameBox, setNicknameBox] = React.useState('');
  const [nicknameChanging, setNicknameChanging] = React.useState(false);
  const dropdownOpen = Boolean(anchorMenu);
  const classes = useStyles();

  if (!loggedIn) {
    return <Button href="/login">Login</Button>;
  }

  const SetNickname = () => {
    setNicknameChanging(true);
    const submission = {
      nickname: nicknameBox,
    };

    axios
      .put('/external/api/bstuser', submission, {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then((response) => {
        setUser(response.nickname);
      }).catch(() => {
        console.log('bstuser error');
      });
    return false;
  };

  if (user === '') {
    return (
      <Backdrop open>
        <Paper elevation={3} className={classes.setNickname}>
          { nicknameChanging ? <Loading />
            : (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography>
                    Hey, seems you don&apos;t have a nickname yet!
                    That&apos;s alright, what do you want to be known as?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <form
                    autoComplete="off"
                    noValidate
                    onSubmit={
                  (e) => {
                    /**
                     * Prevent submit from reloading the page
                     */
                    e.preventDefault();
                    e.stopPropagation();
                    SetNickname();
                  }}
                  >
                    <TextField id="nickname" label="standard" value={nicknameBox} onChange={e => setNicknameBox(e.target.value)} />
                  </form>
                </Grid>
              </Grid>
            )
          }
        </Paper>
      </Backdrop>
    );
  }

  const handleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  return (
    <div>
      <IconButton onClick={handleMenu}>
        <AccountCircle />
      </IconButton>
      <UserMenuWithCookies
        anchor={anchorMenu}
        setAnchor={setAnchorMenu}
        menuOpen={dropdownOpen}
        user={user}
      />
    </div>
  );
};

UserDropdown.propTypes = {
  user: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const UserMenu = ({
  anchor,
  setAnchor,
  menuOpen,
  user,
  cookies,
}) => {
  const clearCookie = () => {
    cookies.remove('auth-session');
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
        <MenuItem onClick={() => clearCookie()}>Logout</MenuItem>
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
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

UserMenu.defaultProps = {
  anchor: null,
};

const UserMenuWithCookies = withCookies(UserMenu);
