import axios from 'axios';
import React, { Component } from 'react';
import LoadButton from '../common/LoadButton';

export default class DdrDataLoad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadRecentButton: {
        failureText: '',
        isLoading: false,
        isRefreshSuccessful: false,
      },
      loadAllButton: {
        failureText: '',
        isLoading: false,
        isRefreshSuccessful: false,
      },
    };
  }

  loadRecentOnButtonClick() {
    this.setState(state => ({
      loadRecentButton: {
        ...state.loadRecentButton,
        isLoading: true,
      },
    }));

    axios({
      method: 'patch',
      url: '/external/bst_api/ddr_update',
    })
      .then(() => {
        this.setState(state => ({
          loadRecentButton: {
            ...state.loadRecentButton,
            isLoading: false,
            isRefreshSuccessful: true,
          },
        }));
      })
      .catch(() => {
        this.setState(state => ({
          loadRecentButton: {
            ...state.loadRecentButton,
            failureText: 'Could not reach API.',
            isLoading: false,
          },
        }));
      });
  }

  loadAllOnButtonClick() {
    this.setState(state => ({
      loadAllButton: {
        ...state.loadAllButton,
        isLoading: true,
      },
    }));

    axios({
      method: 'patch',
      url: '/external/bst_api/ddr_refresh',
    })
      .then(() => {
        this.setState(state => ({
          loadAllButton: {
            ...state.loadAllButton,
            isLoading: false,
            isRefreshSuccessful: true,
          },
        }));
      })
      .catch(() => {
        this.setState(state => ({
          loadAllButton: {
            ...state.loadAllButton,
            failureText: 'Could not reach API.',
            isLoading: false,
          },
        }));
      });
  }

  render() {
    const { loadAllButton, loadRecentButton } = this.state;
    return (
      <>
        <LoadButton
          buttonText="Load Recent Scores"
          failureText={loadRecentButton.failureText}
          isLoading={loadRecentButton.isLoading}
          onButtonClick={() => {
            this.loadRecentOnButtonClick();
          }}
        />
        <LoadButton
          buttonText="Load All Scores"
          failureText={loadAllButton.failureText}
          isLoading={loadAllButton.isLoading}
          onButtonClick={() => {
            this.loadAllOnButtonClick();
          }}
        />
      </>
    );
  }
}
