import axios from 'axios';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LoadButton } from '../common/LoadButton';

const loadButtonClicked = (url, callback, loadingState, successState) => {
  loadingState(true);

  axios({
    method: 'patch',
    url,
  })
    .then((response) => {
      if (response.status === 200) {
        loadingState(false);
        successState(true);
        callback(true, 'Successfully loaded data.');
      } else {
        loadingState(false);
        successState(false);
      }
    })
    .catch(() => {
      loadingState(false);
      successState(false);
    });
};

export const DrsLoadButton = ({
  buttonText,
  url,
  callback,
  failureText,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefreshSuccessful, setIsRefreshSuccessful] = React.useState(true);

  useEffect(() => {
  }, []);

  return (
    <>
      <LoadButton
        buttonText={buttonText}
        failureText={failureText}
        isLoading={isLoading}
        isRefreshSuccessful={isRefreshSuccessful}
        onButtonClick={() => {
          loadButtonClicked(url, callback, setIsLoading, setIsRefreshSuccessful);
        }}
      />
    </>
  );
};

DrsLoadButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  failureText: PropTypes.string.isRequired,
};
