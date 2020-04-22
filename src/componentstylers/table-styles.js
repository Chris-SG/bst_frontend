import styled from 'styled-components';

export const StyledDdrTableRow = styled.tr`
  &.BEGINNER {
    background-color: rgba(0, 255, 255, 0.2);
    :hover {
      background-color: rgba(0, 255, 255, 0.4);
    }
  }
  &.BASIC {
    background-color: rgba(255, 165, 0, 0.2);
    :hover {
      background-color: rgba(255, 165, 0, 0.4);
    }
  }
  &.DIFFICULT {
    background-color: rgba(125, 7, 5, 0.2);
    :hover {
      background-color: rgba(125, 7, 5, 0.6);
    }
  }
  &.EXPERT {
    background-color: rgba(124, 251, 1, 0.2);
    :hover {
      background-color: rgba(124, 251, 1, 0.4);
    }
  }
  &.CHALLENGE {
    background-color: rgba(128, 0, 128, 0.2);
    :hover {
      background-color: rgba(128, 0, 128, 0.4);
    }
  }
  td {
    color: #FFFFFF;
  }
`;
