import React from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  cell: {
    whiteSpace: 'nowrap',
    width: '140px',
  },
}));

const ArtistCellRenderer = (instance) => {
  const classes = useStyles();
  return (
    <td
      {...instance.cell.getCellProps()}
    >
      <Tooltip title={instance.cell.value} arrow>
        <Box
          textOverflow="ellipsis"
          overflow="hidden"
          className={classes.cell}
        >
          {instance.cell.value}
        </Box>
      </Tooltip>
    </td>
  );
};

export const artistColumnDetails = () => (
  {
    Header: 'Artist',
    accessor: 'artist',
    Cell: ArtistCellRenderer,
  }
);
