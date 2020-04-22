import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes, { func } from 'prop-types';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import CookiesProvider from 'react-cookie/cjs/CookiesProvider';
import { BodySpan } from '../componentstylers/container-styles'

const PageContainer = (props) => {
  const { render: View } = props;
  return (
    <>
      <BodySpan>
        <CookiesProvider>
          <Header />
        </CookiesProvider>
        <Container fluid>
          <View />
        </Container>
        <Footer />
      </BodySpan>
    </>
  );
};

PageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default PageContainer;
