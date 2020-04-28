import { DefaultCellRenderer } from './DdrStatsTable';

export const maxComboColumnDetails = () => (
  {
    Header: 'Max Combo',
    accessor: 'maxcombo',
    Cell: DefaultCellRenderer,
  }
);
