import React from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import { DefaultCellRenderer } from './DrsDataTable';

export const scoreColumnDetails = () => (
  {
    Header: 'Score',
    accessor: 'score',
    Cell: DefaultCellRenderer,
  }
);
