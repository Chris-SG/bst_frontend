import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button, Col, Form } from 'react-bootstrap';
import axios from 'axios';

export default class EaGateField extends Component {
  constructor(props) {
    super(props);
    this.state = { loginLoaded: false, user: '' };
  }

  componentDidMount() {
    axios
      .get('/external/bst_api/eagate_login', {})
      .then((response) => {
        if (response.status !== 200) {
          this.setState({
            loginLoaded: true,
            user: '',
          });
        }
        this.setState({
          loginLoaded: true,
          user: 'abc',
        });
      })
      .catch(() => {
        this.setState({
          loginLoaded: true,
          user: '',
        });
      });
  }

  render() {
    const { loginLoaded, user } = this.state;
    if (loginLoaded) {
      return (
        <>
          {
            user.length === 0 ? (
              <EaGateLoginForm />
            ) : <EaGateUserDisplay username={user} />
          }
        </>
      );
    }

    return (<span>Please wait...</span>);
  }
}

export class EaGateLoginForm extends Component {
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
    this.setState({
      eagateUsername: event.target.eagateUsername,
      eagatePassword: event.target.eagatePassword,
      eagateOTP: event.target.eagateOTP,
      eagateHelper: event.target.eagateHelper,
    });
  }

  handleSubmit() {
    const {
      eagateUsername, eagatePassword, eagateOTP, eagateHelper,
    } = this.state;

    let submission = {
      username: eagateUsername,
      password: eagatePassword,
      helper: eagateHelper,
    };

    if (eagateOTP.length !== 0) {
      submission = {
        submission,
        otp: eagateOTP,
      };
    }

    ReactDOM.render(<span>Please wait...</span>, document.getElementById('eagate'));

    axios
      .post('/external/bst_api/eagate_login', JSON.stringify(submission), {
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
            <Form.Control type="text" placeholder="EaGate" value={eagateUsername} onChange={this.handleChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="eagateLoginPassword">
          <Form.Label column sm={2}>
            EaGate Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" placeholder="******" value={eagatePassword} onChange={this.handleChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="eagateOneTimePassword">
          <Form.Label column sm={2}>
            EaGate One-Time Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="numerical" placeholder="123456" value={eagateOTP} onChange={this.handleChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="eagateHelper">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Helper (?)" overlay="Abc" value={eagateHelper} onChange={this.handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Form.Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Login</Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}

export class EaGateUserDisplay extends Component {
  handleSubmit() {
    const { user } = this.props;
    const jsonData = {
      username: user,
    };

    axios
      .post('/external/bst_api/eagate_logout', JSON.stringify(jsonData), {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then(() => {
        ReactDOM.render(<EaGateLoginForm />, document.getElementById('eagate'));
      });
  }

  render() {
    const { user } = this.props;
    return (
      <Form>
        <Form.Row>
          <Form.Text>
            Logged in as
            {user}
          </Form.Text>
        </Form.Row>
        <Form.Row>
          <Button type="submit">Unlink</Button>
        </Form.Row>
      </Form>
    );
  }
}

EaGateUserDisplay.defaultProps = {
  user: '',
};

EaGateUserDisplay.propTypes = {
  user: PropTypes.string,
};
