import React from 'react';
import axios from 'axios';
import Badge from 'react-bootstrap/Badge';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';

const styles = makeStyles((theme) => ({
  footer: {
    marginTop: '40px',
    borderTopStyle: 'solid',
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
        <Badge className={clsx(classes.apiStatus, `bst-api-status-${apiStatus}`, 'ml-2')} pill variant="secondary">
          BST API STATUS:
          {apiStatus}
        </Badge>
      </span>
    </footer>
  );
};
