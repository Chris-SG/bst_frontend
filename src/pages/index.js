import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from '../containers/PageContainer';
import { Cookies, withCookies } from 'react-cookie';
import PropTypes from 'prop-types';

const Index = ({ cookies }) => {
  const c = cookies.get('auth-session');
  if (c !== undefined && c.length > 0) {
    console.log(c);
    const decoded = atob(c);
    const splitDecoded = decoded.split('|', 2);
    if (splitDecoded[0] < 1591660800) {
      console.log(`removing ${decoded}`);
      cookies.remove('auth-session');
    }
  }
  return (
    <span>I have migrated the tenant for this website. This means that you will be logged out and your credentials will have expired. Anyone who has registered will need to reset their password by clicking &apos;Forgot Password&apos;, while anyone who logged in with Google will just need to connect again.</span>
  );
};

Index.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
}

const IndexWithCookies = withCookies(Index);

ReactDOM.render(<PageContainer
  render={IndexWithCookies}
/>, document.getElementById('root'));
