import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import { DdrStatsDropdownFilter } from '../DdrStatsDropdownFilter';

const useStyles = makeStyles((theme) => ({
  cell: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
    width: '30px',
  },
  level: {
    '&.BEGINNER': {
      color: 'aqua',
    },
    '&.BASIC': {
      color: 'orange',
    },
    '&.DIFFICULT': {
      color: 'darkred',
    },
    '&.EXPERT': {
      color: 'lawngreen',
    },
    '&.CHALLENGE': {
      color: 'purple',
    },
  },
}));

export const LevelCellRenderer = (instance) => {
  const classes = useStyles();
  console.log(instance.cell.getCellProps());
  return (
    <td
      {...instance.cell.getCellProps()}
      className={clsx(classes.cell, classes.level, instance.cell.row.values.difficulty)}
    >
      {instance.cell.value}
    </td>
  );
};

export const levelColumnDetails = () => (
  {
    Header: '#',
    accessor: 'level',
    Filter: DdrStatsDropdownFilter,
    filterTitle: 'Level',
    filterAlg: ((a, b) => a < b),
    filter: 'includes',
    Cell: LevelCellRenderer,
  }
);
