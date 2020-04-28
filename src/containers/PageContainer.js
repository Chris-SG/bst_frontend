import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CookiesProvider from 'react-cookie/cjs/CookiesProvider';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { getTheme } from '../themes/bst-theme';
import { NavDrawer } from '../components/layout/Drawer';

const pageDimensions = {
  headerSize: 70,
  drawerClosedSize: 55,
  drawerOpenedSize: 240,
};

const useStyles = makeStyles(theme => ({
  body: props => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: props.dimensions.drawerClosedSize,
    width: `calc(100% - ${props.dimensions.drawerClosedSize}px)`,
    marginTop: props.dimensions.headerSize + 10,
  }),
  bodyShift: props => ({
    marginLeft: props.dimensions.drawerOpenedSize,
    marginTop: props.dimensions.headerSize + 10,
    width: `calc(100% - ${props.dimensions.drawerOpenedSize}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

useStyles.propTypes = {
  dimensions: PropTypes.shape({
    key: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.arrayOf(PropTypes.any),
  }),
};

const PageContainer = (props) => {
  const { render: View } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dimensions = pageDimensions;
  const classes = useStyles({ dimensions });

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ThemeProvider theme={getTheme()}>
      <CookiesProvider>
        <Header drawerControl={toggleDrawer} dimensions={dimensions} />
      </CookiesProvider>
      <NavDrawer open={drawerOpen} dimensions={dimensions} />
      <Container
        className={clsx(classes.root, {
          [classes.bodyShift]: drawerOpen,
          [classes.body]: !drawerOpen,
        })}
      >
        <View />
        <Footer />
      </Container>
      <CssBaseline />
    </ThemeProvider>
  );
};

PageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default PageContainer;
