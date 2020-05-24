import React from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import axios from 'axios';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25%',
    },
  },
}));

export const EaLoginForm = ({ preRequest, postRequest, responseCallback, loginName }) => {
  const [username, setUsername] = React.useState(loginName);
  const [password, setPassword] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [helper, setHelper] = React.useState(false);
  const classes = useStyles();

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

  const EaLogin = () => {
    preRequest();
    const submission = loginRequestData();

    axios
      .post('/external/api/eagate/login', submission, {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then((response) => {
        postRequest();
        responseCallback(response);
      }).catch((error) => {
        postRequest();
        responseCallback(error.response);
      });
    return false;
  };

  return (
    <form
      noValidate
      autoComplete="off"
      className={classes.root}
      onSubmit={
      (e) => {
        /**
         * Prevent submit from reloading the page
         */
        e.preventDefault();
        e.stopPropagation();
        EaLogin();
      }}
    >
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
      <FormControlLabel
        control={(
          <Checkbox
            checked={helper}
            onChange={e => setHelper(e.target.checked)}
            name="eagateHelper"
            color="secondary"
          />
        )}
        label="Helper"
      />
      <Button type="submit">Login</Button>
    </form>
  );
};

EaLoginForm.defaultProps = {
  loginName: '',
};

EaLoginForm.propTypes = {
  preRequest: PropTypes.func.isRequired,
  postRequest: PropTypes.func.isRequired,
  responseCallback: PropTypes.func.isRequired,
  loginName: PropTypes.string,
};

const EaFormGroup = ({
  controlId, text, type, placeholder, value, changeCallback,
}) => (
  <FormControl>
    <InputLabel htmlFor={controlId}>
      {text}
    </InputLabel>
    <Input
      id={controlId}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => changeCallback(e.target.value)}
    />
  </FormControl>
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
