import React from 'react';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

export const LoadButton = (
  {
    buttonText,
    failureText,
    isLoading,
    onButtonClick,
    isRefreshSuccessful,
  },
) => (
  <>
    {
      !isRefreshSuccessful
        ? <Alert severity="error">{failureText}</Alert>
        : ''
    }
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={onButtonClick}
    >
      {isLoading ? 'Loading...' : buttonText}
    </Button>
  </>
);

LoadButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  failureText: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  isRefreshSuccessful: PropTypes.bool.isRequired,
};
