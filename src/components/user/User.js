import React, { useEffect } from 'react';
import axios from 'axios';
import { Loading } from '../common/Loading';
import { EaLoginForm } from '../common/EaLoginField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

const EaLoginStatus = (setLoginState, setName, setLoading) => {
  axios
    .get('/external/api/eagate/login', {})
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
  const [errorMessage, setErrorMessage] = React.useState("");

  useEffect(() => {
    EaLoginStatus(setLoginState, setName, setLoading);
  }, [reloadLoginStatus]);

  const EaLogout = () => {
    const jsonData = {
      username: name,
    };

    axios
      .post('/external/api/eagate/logout', JSON.stringify(jsonData), {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then(() => {
        setReloadLoginStatus(!reloadLoginStatus);
      });
  };

  const ResponseCallback = (response) => {
    console.log(response);
    if (response.data.Code === 0) {
      setReloadLoginStatus(reloadLoginStatus);
      return;
    }
    if (response.data.Code === 211) {
      setErrorMessage('Seems you\'ve entered an invalid username or password. Please try again.');
      return;
    }
    setErrorMessage('An unknown error has occurred. Please let me know when you made this request and I will look into it.');
  };

  if (loading) {
    return <Loading />;
  }

  if (!loginState) {
    return (
      <>
        {errorMessage.length > 0 && <Alert severity="error">errorMessage</Alert> }
        <EaLoginForm
          responseCallback={ResponseCallback}
          postRequest={() => setLoading(false)}
          preRequest={() => {
            setLoading(true);
            setErrorMessage('');
          }}
        />
      </>
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
