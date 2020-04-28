import { DdrStatsDropdownFilter } from '../DdrStatsDropdownFilter';
import { DefaultCellRenderer } from './DdrStatsTable';

export const modeSortingAlg = (a, b) => {
  if (a === b) return 0;

  const modeDict = {
    'SINGLE': 0,
    'DOUBLE': 1,
  };
  return modeDict[a] < modeDict[b] ? -1 : 1;
};

export const modeSorting = (a, b) => {
  if (b.values === undefined) return -1;
  if (a.values === undefined) return 1;
  return modeSortingAlg(a.values.mode, b.values.mode);
};

export const modeColumnDetails = () => (
  {
    Header: 'Mode',
    accessor: 'mode',
    sortMethod: modeSorting,
    Filter: DdrStatsDropdownFilter,
    filterTitle: 'Mode',
    filterAlg: modeSortingAlg,
    filter: 'includes',
    Cell: DefaultCellRenderer,
  }
);
