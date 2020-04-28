import { DefaultCellRenderer } from './DdrStatsTable';

export const scoreColumnDetails = () => (
  {
    Header: 'Score',
    accessor: 'score',
    Cell: DefaultCellRenderer,
  }
);
