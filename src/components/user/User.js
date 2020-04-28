import React, { useEffect } from 'react';
import axios from 'axios';
import { Loading } from '../common/Loading';
import { EaLoginForm } from '../common/EaLoginField';
import Button from '@material-ui/core/Button';

const EaLoginStatus = (setLoginState, setName, setLoading) => {
  axios
    .get('/external/bst_api/eagate_login', {})
    .then((response) => {
      setLoading(false);
      if (response.status !== 200 || response.data[0].length === 0) {
        setLoginState(false);
        setName(null);
        return;
      }
      if (response.data[0].Expired === true) {
        setLoginState(false);
        setName(response.data[0].username);
        return;
      }
      setLoginState(true);
      setName(response.data[0].username);
    })
    .catch(() => {
      setLoginState(false);
      setLoading(false);
      setName(null);
    });
};

export const UserPage = () => {
  const [loginState, setLoginState] = React.useState(false);
  const [name, setName] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [reloadLoginStatus, setReloadLoginStatus] = React.useState(false);

  useEffect(() => {
    EaLoginStatus(setLoginState, setName, setLoading);
  }, [reloadLoginStatus]);

  const EaLogout = () => {
    const jsonData = {
      name,
    };

    axios
      .post('/external/bst_api/eagate_logout', JSON.stringify(jsonData), {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then(() => {
        setReloadLoginStatus(!reloadLoginStatus);
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (!loginState) {
    return (
      <EaLoginForm
        postRequest={() => setLoading(true)}
        preRequest={() => setReloadLoginStatus(!reloadLoginStatus)}
      />
    );
  }

  return (
    <div id="eagate">
      <span>
        Logged in as
        {' '}
        {name}
      </span>
      <br />
      <Button onClick={() => EaLogout(name)}>Unlink</Button>
    </div>
  );
};
