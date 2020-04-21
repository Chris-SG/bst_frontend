import React from 'react';
import { Spinner } from 'react-bootstrap';
import Styled from 'styled-components';

const StyledSpinner = Styled(Spinner)`
  color: #990099;
  
`;

export const Loading = () => (
  <StyledSpinner animation="grow" />
);
