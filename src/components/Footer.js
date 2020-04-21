import React, { Component } from 'react';
import axios from 'axios';
import Badge from 'react-bootstrap/Badge';

export const Footer = () => {
  const [apiStatus, setApiStatus] = React.useState('unknown');

  React.useEffect(() => {
    axios
      .get('/external/bst_api/status', {})
      .then((response) => {
        setApiStatus(response.data.api);
        if (response.status === 404) {
          setApiStatus('not loaded');
        }
      })
      .catch(() => {
        setApiStatus('not loadaed');
      });
  });

  return (
    <footer id="footer" className="container-fluid">
        <span className={`bst-api-status-${apiStatus}`}>
          <Badge className="ml-2" pill variant="secondary">BST API STATUS: {apiStatus}</Badge>
        </span>
    </footer>
  );
};
