import { DefaultCellRenderer } from './DdrStatsTable';

export const lampColumnDetails = () => (
  {
    Header: 'Lamp',
    accessor: 'lamp',
    Cell: DefaultCellRenderer,
  }
);
