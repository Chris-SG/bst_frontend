import React, { useEffect } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Loading } from './Loading';

const EaLoginStatus = (setLoginState, setName, setLoading) => {
  axios
    .get('/external/bst_api/eagate_login', {})
    .then((response) => {
      console.log(response);
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

const EaLogin = (loginRequestData) => {
  const submission = loginRequestData();
  console.log(submission);

  ReactDOM.render(<Loading />, document.getElementById('eagate'));

  axios
    .post('/external/bst_api/eagate_login', submission, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    .then((response) => {
      if (response.data.status === 'bad') {
        ReactDOM.render(<EaLoginField />, document.getElementById('eagate'));
      } else if (response.data.status === 'ok') {
        ReactDOM.render(<EaLoginField />, document.getElementById('eagate'));
      }
    }).catch(() => {
      ReactDOM.render(<EaLoginField />, document.getElementById('eagate'));
    });
};

const EaLogout = (username) => {
  const jsonData = {
    username,
  };

  axios
    .post('/external/bst_api/eagate_logout', JSON.stringify(jsonData), {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    .then(() => {
      ReactDOM.render(<EaLoginField />, document.getElementById('eagate'));
    });
};

export const EaLoginField = () => {
  const [loginState, setLoginState] = React.useState(false);
  const [name, setName] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    EaLoginStatus(setLoginState, setName, setLoading);
  }, []);

  if (loading) {
    return <div id="eagate"><Loading /></div>;
  }

  if (!loginState) {
    return <div id="eagate"><EaLoginForm submitCallback={EaLogin} loginName={name !== null ? name : ''} /></div>;
  }

  return (
    <div id="eagate">
      <Form>
        <Form.Row>
          <Form.Text>
            Logged in as
            {' '}
            {name}
          </Form.Text>
        </Form.Row>
        <Form.Row>
          <Button onClick={() => EaLogout(name)}>Unlink</Button>
        </Form.Row>
      </Form>
    </div>
  );
};

const EaLoginForm = ({ submitCallback, loginName }) => {
  const [username, setUsername] = React.useState(loginName);
  const [password, setPassword] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [helper, setHelper] = React.useState(false);

  const loginRequestData = () => {
    let submission = {
      username,
      password,
    };

    if (otp && otp.length !== 0) {
      submission = {
        submission,
        otp,
      };
    }

    if (helper) {
      submission = {
        submission,
        helper,
      };
    }
    return submission;
  };

  return (
    <Form>
      <EaFormGroup
        controlId="eagateLoginUsername"
        text="EaGate Username"
        type="text"
        placeholder="EaGate"
        value={username}
        changeCallback={setUsername}
      />
      <EaFormGroup
        controlId="eagateLoginPassword"
        text="EaGate Password"
        type="password"
        placeholder="******"
        value={password}
        changeCallback={setPassword}
      />
      <EaFormGroup
        controlId="eagateOneTimePassword"
        text="EaGate One-Time Password"
        type="numerical"
        placeholder="123456"
        value={otp}
        changeCallback={setOtp}
      />
      <Form.Group as={Form.Row} controlId="eagateHelper">
        <Col sm={{ span: 10, offset: 2 }}>
          <Form.Check label="Helper (?)" overlay="Abc" value={helper} onChange={e => setHelper(e.target.value)} />
        </Col>
      </Form.Group>
      <Form.Group as={Form.Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button onClick={() => submitCallback(loginRequestData)}>Login</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

EaLoginForm.defaultProps = {
  loginName: '',
};

EaLoginForm.propTypes = {
  submitCallback: PropTypes.func.isRequired,
  loginName: PropTypes.string,
};

const EaFormGroup = ({
  controlId, text, type, placeholder, value, changeCallback,
}) => (
  <Form.Group as={Form.Row} controlId={controlId}>
    <Form.Label column sm={2}>
      {text}
    </Form.Label>
    <Col sm={10}>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => changeCallback(e.target.value)}
      />
    </Col>
  </Form.Group>
);

EaFormGroup.defaultProps = {
  placeholder: '',
};

EaFormGroup.propTypes = {
  controlId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any.isRequired,
  changeCallback: PropTypes.func.isRequired,
};
