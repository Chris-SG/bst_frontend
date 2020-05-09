import React from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import { Title } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  cell: {
    whiteSpace: 'nowrap',
    width: '140px',
  },
}));

const MyStatsCellRenderer = (instance) => {
  const classes = useStyles();
  return (
    <td
      {...instance.cell.getCellProps()}
    >
      <Tooltip title={instance.row.original.mystats} arrow>
        <Box
          textOverflow="ellipsis"
          overflow="hidden"
          className={classes.cell}
        >
          {instance.row.original.mystats}
        </Box>
      </Tooltip>
    </td>
  );
};

export const myStatsColumnDetails = () => (
  {
    Header: 'Me',
    accessor: 'mystats',
    Cell: MyStatsCellRenderer,
  }
);
