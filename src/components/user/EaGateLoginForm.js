import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button, Col, Form } from 'react-bootstrap';
import EaGateField from '../EaGateUser';

export default class EaGateLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eagateUsername: '',
      eagatePassword: '',
      eagateOTP: '',
      eagateHelper: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event);
    this.setState({
      eagateUsername: event.target.eagateUsername,
      eagatePassword: event.target.eagatePassword,
      eagateOTP: event.target.eagateOTP,
      eagateHelper: event.target.eagateHelper,
    });
  }

  onUsernameChange(value) {
    this.setState({
      eagateUsername: value,
    });
  }

  onPasswordChange(value) {
    this.setState({
      eagatePassword: value,
    });
  }

  onOTPChange(value) {
    this.setState({
      eagateOTP: value,
    });
  }

  onHelperChange(value) {
    this.setState({
      eagateHelper: value,
    });
  }

  handleSubmit() {
    const {
      eagateUsername, eagatePassword, eagateOTP, eagateHelper,
    } = this.state;

    let submission = {
      username: eagateUsername,
      password: eagatePassword,
    };

    if (eagateOTP && eagateOTP.length !== 0) {
      submission = {
        submission,
        otp: eagateOTP,
      };
    }

    if (eagateHelper) {
      submission = {
        submission,
        helper: eagateHelper,
      };
    }

    console.log(submission);
    console.log(JSON.stringify(submission));

    ReactDOM.render(<span>Please wait...</span>, document.getElementById('eagate'));

    axios
      .post('/external/bst_api/eagate_login', submission, {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then((response) => {
        if (response.data.status === 'bad') {
          ReactDOM.render(<EaGateLoginForm />, document.getElementById('eagate'));
        } else if (response.data.status === 'ok') {
          ReactDOM.render(<EaGateField />, document.getElementById('eagate'));
        }
      });
  }

  render() {
    const {
      eagateUsername, eagatePassword, eagateOTP, eagateHelper,
    } = this.state;
    return (
      <Form>
        <Form.Group as={Form.Row} controlId="eagateLoginUsername">
          <Form.Label column sm={2}>
            EaGate Username
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="EaGate" value={eagateUsername} onChange={e => this.onUsernameChange(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="eagateLoginPassword">
          <Form.Label column sm={2}>
            EaGate Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" placeholder="******" value={eagatePassword} onChange={e => this.onPasswordChange(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="eagateOneTimePassword">
          <Form.Label column sm={2}>
            EaGate One-Time Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="numerical" placeholder="123456" value={eagateOTP} onChange={e => this.onOTPChange(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="eagateHelper">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Helper (?)" overlay="Abc" value={eagateHelper} onChange={e => this.onHelperChange(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Form.Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button onClick={() => this.handleSubmit()}>Login</Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}
