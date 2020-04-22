
import styled, { createGlobalStyle } from 'styled-components';
import { Container } from 'react-bootstrap';

export const GlobalStyle = createGlobalStyle`
  body {
    color: #eeeeee;
    background-color: #222222;
  }
  
  table.table {
    color: #eeeeee;
  }
`;

export const StyledHeader = styled.header`
  background-color: #222222;
  padding-bottom: 8px;
`;

export const StyledBody = styled(Container)`
  background-color: #222222;
`;

export const StyledFooter = styled.footer`
  background-color: #222222;
`;
