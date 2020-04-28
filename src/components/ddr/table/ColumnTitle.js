import { DefaultCellRenderer } from './DdrStatsTable';

export const titleColumnDetails = () => (
  {
    Header: 'Song Name',
    accessor: 'title',
    Cell: DefaultCellRenderer,
  }
);
