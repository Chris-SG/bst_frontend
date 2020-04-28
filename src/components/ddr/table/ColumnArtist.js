import { DefaultCellRenderer } from './DdrStatsTable';

export const artistColumnDetails = () => (
  {
    Header: 'Artist',
    accessor: 'artist',
    Cell: DefaultCellRenderer,
  }
);
