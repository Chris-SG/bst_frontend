import { DefaultCellRenderer } from './DdrStatsTable';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AlbumIcon from '@material-ui/icons/Album';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  cell: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
    width: '70px',
    color: '#555555',
    '&.gfc': {
      color: '#00cc00',
    },
    '&.fc': {
      color: '#00cccc',
    },
    '&.clear': {
      color: '#ffff00',
    },
  },
}));

const LampType = (lampName) => {
  const lamps = {
    グレートフルコンボ: 'gfc',
    グッドフルコンボ: 'fc',
    '---': 'clear',
  };
  return lamps[lampName];
};

const LampCellRenderer = (instance) => {
  const classes = useStyles();

  return (
    <td
      {...instance.cell.getCellProps()}
    >
      <Tooltip title={instance.cell.value} arrow>
        <Box
          className={clsx(LampType(instance.cell.value), classes.cell)}
        >
          <AlbumIcon />
        </Box>
      </Tooltip>
    </td>
  );
};

export const lampColumnDetails = () => (
  {
    Header: 'Lamp',
    accessor: 'lamp',
    Cell: LampCellRenderer,
  }
);
