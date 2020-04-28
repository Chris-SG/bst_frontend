import { DdrStatsDropdownFilter } from '../DdrStatsDropdownFilter';
import { DefaultCellRenderer } from './DdrStatsTable';

export const difficultySortingAlg = (a, b) => {
  if (a === b) return 0;
  const diffDict = {
    BEGINNER: 0,
    BASIC: 1,
    DIFFICULT: 2,
    EXPERT: 3,
    CHALLENGE: 4,
  };
  return diffDict[a] < diffDict[b] ? -1 : 1;
};

export const difficultySorting = (a, b) => {
  if (b.values === undefined) return 1;
  if (a.values === undefined) return -1;
  return difficultySortingAlg(a.values.difficulty, b.values.difficulty);
};

export const difficultyColumnDetails = () => (
  {
    Header: 'Difficulty',
    accessor: 'difficulty',
    sortMethod: difficultySorting,
    Filter: DdrStatsDropdownFilter,
    filterTitle: 'Difficulty',
    filterAlg: difficultySortingAlg,
    filter: 'includes',
    Cell: DefaultCellRenderer,
  }
);
