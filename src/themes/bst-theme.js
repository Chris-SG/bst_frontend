import { createMuiTheme } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { makeStyles } from '@material-ui/core/styles';

const bstTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3e3347',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  overrides: {
    MuiListItem: {
      root: {
        '& a': {
          color: '#cccccc',
          '&:hover': {
            color: '#555555',
          },
          transition: '0.2s',
        },
      },
    },
    MuiAppBar: {
      root: {
        '& a': {
          color: '#cccccc',
          '&:hover': {
            color: '#555555',
          },
          transition: '0.2s',
        },
      },
    },
  },
});

export const getTheme = () => bstTheme;
