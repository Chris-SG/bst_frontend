import React, { PureComponent } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Footer from 'components/Footer';
import Header from 'components/Header';
import CookiesProvider from 'react-cookie/cjs/CookiesProvider';

export default class PageContainer extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <>
        <CookiesProvider>
          <Header />
        </CookiesProvider>
        <Container fluid>
          { children }
        </Container>
        <Footer />
      </>
    );
  }
}

PageContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
