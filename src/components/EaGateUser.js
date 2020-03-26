import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import EaGateLoginForm from './user/EaGateLoginForm';

export default class EaGateField extends Component {
  constructor(props) {
    super(props);
    this.state = { loginLoaded: false, user: '' };
  }

  componentDidMount() {
    axios
      .get('/external/bst_api/eagate_login', {})
      .then((response) => {
        console.log(response);
        if (response.status !== 200 || response.data.length === 0 || response.data[0].expired) {
          this.setState({
            loginLoaded: true,
            user: '',
          });
          return;
        }
        this.setState({
          loginLoaded: true,
          user: response.data[0].username,
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
        <div id="eagate">
          {
            user.length === 0 ? (
              <EaGateLoginForm />
            ) : <EaGateUserDisplay username={user} />
          }
        </div>
      );
    }

    return (<span>Please wait...</span>);
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
