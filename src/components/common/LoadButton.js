import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function LoadButton(props) {
  const {
    buttonText, failureText, isLoading, onButtonClick,
  } = props;
  return (
    <>
      {
        failureText
          ? <Alert variant="danger">{failureText}</Alert>
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
}

LoadButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  failureText: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
