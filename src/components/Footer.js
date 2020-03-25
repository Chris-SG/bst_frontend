import React, { Component } from 'react';
import axios from 'axios';
import Badge from 'react-bootstrap/Badge';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { apiStatus: 'unknown' };
  }

  componentDidMount() {
    axios
      .get('/external/bst_api/status', {})
      .then((response) => {
        console.log(response);
        this.setState({
          apiStatus: response.data.api,
        });
        if (response.status === 404) {
          this.setState({
            apiStatus: 'not loaded',
          });
        }
      })
      .catch(() => {
        this.setState({
          apiStatus: 'not loaded',
        });
      });
  }

  render() {
    const { apiStatus } = this.state;
    return (
      <footer id="footer" className="container-fluid">
        <span className={`bst-api-status-${apiStatus}`}>
          <Badge className="ml-2" pill variant="secondary">BST API STATUS: {apiStatus}</Badge>
        </span>
      </footer>
    );
  }
}
