import React from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CircularProgress from '@material-ui/core/CircularProgress';
import { UserDropdown } from '../user/Dropdown';

const useStyles = makeStyles(theme => ({
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
}));

export const Header = ({ cookies, drawerControl, dimensions }) => {
  const [userLoaded, setUserLoaded] = React.useState(true);
  const [user, setUser] = React.useState('');
  const classes = useStyles({ dimensions });

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
          <span className={classes.title}>
            <Typography variant="h2" className={classes.titleTypo}>
              <strong>
                <a href="/">
                  BST
                </a>
              </strong>
            </Typography>
          </span>
          <span className={classes.right}>
            { userLoaded ? <UserDropdown user={user} cookies={cookies} /> : <CircularProgress /> }
          </span>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  cookies: PropTypes.instanceOf(Cookies),
  drawerControl: PropTypes.func.isRequired,
  dimensions: PropTypes.objectOf(PropTypes.any).isRequired,
};

Header.defaultProps = {
  cookies: null,
};
