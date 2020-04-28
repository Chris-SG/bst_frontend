import React from 'react';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';

const styles = makeStyles((theme) => ({
  footer: {
    marginTop: '40px',
    paddingBottom: '8px',
  },
  apiStatus: {
    backgroundColor: '#777777',
    '&.bst-api-status-ok': {
      backgroundColor: '#00FF00',
    },
    '&.bst-api-status-bad': {
      backgroundColor: '#FF0000',
    },
  },
}));

export const Footer = () => {
  const [apiStatus, setApiStatus] = React.useState('unknown');
  const classes = styles();

  React.useEffect(() => {
    axios
      .get('/external/bst_api/status', {})
      .then((response) => {
        setApiStatus(response.data.api);
        if (response.status === 404) {
          setApiStatus('bad');
        }
      })
      .catch(() => {
        setApiStatus('bad');
      });
  });

  return (
    <footer id="footer" className={clsx(classes.footer, 'container-fluid')}>
      <span>
        <Chip
          label={`BST API STATUS: ${apiStatus}`}
          className={clsx(classes.apiStatus, `bst-api-status-${apiStatus}`, 'ml-2')}
          size="small"
        />
      </span>
    </footer>
  );
};
