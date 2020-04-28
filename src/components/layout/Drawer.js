import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: props => props.dimensions.drawerOpenedSize,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    marginTop: props => props.dimensions.headerSize + 2,
    width: props => props.dimensions.drawerOpenedSize,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    marginTop: props => props.dimensions.headerSize + 2,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: props => props.dimensions.drawerClosedSize,
  },
  drawerIcon: {
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerLink: {

  },
  hiddenDrawerLink: {
    lineHeight: 0,
    height: 0,
  },
}));

export const NavDrawer = ({ open, dimensions }) => {
  const classes = useStyles({ dimensions });

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClosed]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <a href="/ddr">
              <OpenWithIcon />
            </a>
          </ListItemIcon>
          <a href="/ddr">
            <ListItemText primary="DDR" />
          </a>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ListItem>
            <ListItemIcon />
            <a href="/ddr/stats">
              <ListItemText primary="Stats" />
            </a>
          </ListItem>
        </Collapse>
        <ListItem>
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="abc" />
        </ListItem>
        <ListItem>
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="abc" />
        </ListItem>
        <ListItem>
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="abc" />
        </ListItem>
      </List>
    </Drawer>
  );
};

NavDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  dimensions: PropTypes.objectOf(PropTypes.any).isRequired,
};
