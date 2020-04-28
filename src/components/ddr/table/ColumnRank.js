import { DdrStatsDropdownFilter } from '../DdrStatsDropdownFilter';
import { DefaultCellRenderer } from './DdrStatsTable';

export const rankSortingAlg = (a, b) => {
  if (a === b) {
    return 0;
  }
  const diffDict = {
    '': 0,
    '---': 1,
    'E': 2,
    'D': 3,
    'C-': 4,
    'C': 5,
    'C+': 6,
    'B-': 7,
    'B': 8,
    'B+': 9,
    'A-': 10,
    'A': 11,
    'A+': 12,
    'AA-': 13,
    'AA': 14,
    'AA+': 15,
    'AAA': 16,
  };
  return diffDict[a] > diffDict[b] ? -1 : 1;
};

export const rankSorting = (a, b) => {
  if (b.values === undefined) return 1;
  if (a.values === undefined) return -1;
  return rankSortingAlg(a.values.rank, b.values.rank);
};

export const rankColumnDetails = () => (
  {
    Header: 'Rank',
    accessor: 'rank',
    sortType: rankSorting,
    Filter: DdrStatsDropdownFilter,
    filterTitle: 'Rank',
    filterAlg: rankSortingAlg,
    filter: 'includes',
    Cell: DefaultCellRenderer,
  }
);
