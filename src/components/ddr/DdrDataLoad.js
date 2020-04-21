import axios from 'axios';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LoadButton } from '../common/LoadButton';

const loadButtonClicked = (url, callback, loadingState, successState) => {
  loadingState(true);

  axios({
    method: 'patch',
    url: '/external/bst_api/ddr_update',
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
}

export const DdrLoadButton = ({
  buttonText,
  url,
  callback,
  failureText,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefreshSuccessful, setIsRefreshSuccessful] = React.useState(true);

  console.log(callback);
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

DdrLoadButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  failureText: PropTypes.string.isRequired,
};
