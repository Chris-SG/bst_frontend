import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from '../containers/PageContainer';

ReactDOM.render(<PageContainer
  render={() => 'I have migrated the tenant for this website. This means that you will '
    + 'be logged out and your credentials will have expired. Anyone who has registered '
    + 'will need to reset their password by clicking \'Forgot Password\', while anyone '
    + 'who logged in with Google will just need to connect again.'}
/>, document.getElementById('root'));
