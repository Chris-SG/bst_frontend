import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Footer from 'components/Footer';
import Header from 'components/Header';
import CookiesProvider from 'react-cookie/cjs/CookiesProvider';

const PageContainer = (props) => {
  const { render: View } = props;
  return (
    <>
      <CookiesProvider>
        <Header />
      </CookiesProvider>
      <Container fluid>
        <View />
      </Container>
      <Footer />
    </>
  );
};

export default PageContainer;
