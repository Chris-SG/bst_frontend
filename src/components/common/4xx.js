import React from 'react';
import Typography from '@material-ui/core/Typography';

export const PageNotFound = () => (
  <div>
    <Typography>
      This page does not exist, sorry! :(
    </Typography>
    <br />
    <Typography>
      Think it should? Let us know! :)
    </Typography>
  </div>
);

export const PageUnauthorized = () => {
  return (
    <div>
      <Typography>
        It seems you can&#39;t access this page. Check that you are logged in!
      </Typography>
      <br />
      <Typography>
        If you are logged in, check that you are signed into EaGate by checking your profile.
      </Typography>
    </div>
  );
};
