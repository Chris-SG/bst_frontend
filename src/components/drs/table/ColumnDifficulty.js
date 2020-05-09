import React from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import { Title } from '@material-ui/icons';
import { DefaultCellRenderer } from './DrsDataTable';

export const difficultyColumnDetails = () => (
  {
    Header: 'Difficulty',
    accessor: 'difficulty',
    Cell: DefaultCellRenderer,
  }
);
