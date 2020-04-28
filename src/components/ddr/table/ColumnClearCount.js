import { DefaultCellRenderer } from './DdrStatsTable';

export const clearCountColumnDetails = () => (
  {
    Header: 'Clear Count',
    accessor: 'clearcount',
    Cell: DefaultCellRenderer,
  }
);
