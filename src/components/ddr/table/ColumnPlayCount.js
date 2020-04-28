import { DefaultCellRenderer } from './DdrStatsTable';

export const playCountColumnDetails = () => (
  {
    Header: 'Play Count',
    accessor: 'playcount',
    Cell: DefaultCellRenderer,
  }
);
