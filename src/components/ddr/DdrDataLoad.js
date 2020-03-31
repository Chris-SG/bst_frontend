import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadButton from '../common/LoadButton';

export class DdrLoadRecent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isRefreshSuccessful: true,
    };
  }

  loadRecentOnButtonClick() {
    this.setState({
      isLoading: true,
    });

    axios({
      method: 'patch',
      url: '/external/bst_api/ddr_update',
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoading: false,
            isRefreshSuccessful: true,
          });
        } else {
          this.setState({
            isLoading: false,
            isRefreshSuccessful: false,
          });
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isRefreshSuccessful: true,
        });
      });
  }

  render() {
    const { isLoading, isRefreshSuccessful } = this.state;
    const { failureText } = this.props;
    return (
      <>
        <LoadButton
          buttonText="Load Recent Scores"
          failureText={failureText}
          isLoading={isLoading}
          isRefreshSuccessful={isRefreshSuccessful}
          onButtonClick={() => {
            this.loadRecentOnButtonClick();
          }}
        />
      </>
    );
  }
}

DdrLoadRecent.propTypes = {
  failureText: PropTypes.string.isRequired,
};

export class DdrLoadAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isRefreshSuccessful: true,
    };
  }

  loadAllOnButtonClick() {
    this.setState({
      isLoading: true,
    });

    axios({
      method: 'patch',
      url: '/external/bst_api/ddr_refresh',
    })
      .then((response) => {
        if (response.status === 200) {
          const { callback } = this.props;
          this.setState({
            isLoading: false,
            isRefreshSuccessful: true,
          });
          callback();
        } else {
          this.setState({
            isLoading: false,
            isRefreshSuccessful: false,
          });
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isRefreshSuccessful: true,
        });
      });
  }

  render() {
    const { isLoading, isRefreshSuccessful } = this.state;
    const { failureText } = this.props;
    return (
      <>
        <LoadButton
          buttonText="Load Recent Scores"
          failureText={failureText}
          isLoading={isLoading}
          isRefreshSuccessful={isRefreshSuccessful}
          onButtonClick={() => {
            this.loadAllOnButtonClick();
          }}
        />
      </>
    );
  }
}

DdrLoadAll.propTypes = {
  callback: PropTypes.func.isRequired,
  failureText: PropTypes.string.isRequired,
};
