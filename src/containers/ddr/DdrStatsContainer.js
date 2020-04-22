import React, { PureComponent } from 'react';
import axios from 'axios';
import {
  DdrStatsTable,
  DefaultCellRenderer, LevelCellRenderer,
} from '../../components/ddr/DdrStatsTable';
import { DdrStatsDropdownFilter } from '../../components/ddr/DdrStatsDropdownFilter';

const modeSortingAlg = (a, b) => {
  if (a === b) return 0;

  const modeDict = {
    'SINGLE': 0,
    'DOUBLE': 1,
  };
  return modeDict[a] < modeDict[b] ? -1 : 1;
}

const modeSorting = (a, b) => {
  if (b.values === undefined) return -1;
  if (a.values === undefined) return 1;
  return modeSortingAlg(a.values.mode, b.values.mode);
};

const difficultySortingAlg = (a, b) => {
  if (a === b) return 0;
  const diffDict = {
    BEGINNER: 0,
    BASIC: 1,
    DIFFICULT: 2,
    EXPERT: 3,
    CHALLENGE: 4,
  };
  return diffDict[a] < diffDict[b] ? -1 : 1;
}

const difficultySorting = (a, b) => {
  if (b.values === undefined) return 1;
  if (a.values === undefined) return -1;
  return difficultySortingAlg(a.values.difficulty, b.values.difficulty);
};

const rankSortingAlg = (a, b) => {
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

const rankSorting = (a, b) => {
  if (b.values === undefined) return 1;
  if (a.values === undefined) return -1;
  return rankSortingAlg(a.values.rank, b.values.rank);
}

export default class DdrStatsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      statsData: [],
    };
  }

  componentDidMount() {
    this.loadStats();
  }

  loadStats() {
    axios
      .get('/external/bst_api/ddr_stats', {})
      .then((response) => {
        console.log(response);
        this.setState(
          {
            statsData: response.data,
          },
        );
      })
      .catch((error) => {
        const d = JSON.parse(`[
    {
        "level": 1,
        "title": "only my railgun",
        "artist": "fripSide",
        "mode": "SINGLE",
        "difficulty": "BEGINNER",
        "lamp": "",
        "rank": "",
        "score": 0,
        "playcount": 0,
        "clearcount": 0,
        "maxcombo": 0
    },
    {
        "level": 2,
        "title": "oarfish",
        "artist": "kors k",
        "mode": "SINGLE",
        "difficulty": "BASIC",
        "lamp": "",
        "rank": "",
        "score": 0,
        "playcount": 0,
        "clearcount": 0,
        "maxcombo": 0
    },
    {
        "level": 3,
        "title": "Taking It To The Sky",
        "artist": "U1 feat. Tammy S. Hansen",
        "mode": "SINGLE",
        "difficulty": "DIFFICULT",
        "lamp": "",
        "rank": "",
        "score": 0,
        "playcount": 0,
        "clearcount": 0,
        "maxcombo": 0
    },
    {
        "level": 4,
        "title": "BABY BABY GIMME YOUR LOVE",
        "artist": "DIVAS",
        "mode": "SINGLE",
        "difficulty": "EXPERT",
        "lamp": "",
        "rank": "",
        "score": 0,
        "playcount": 0,
        "clearcount": 0,
        "maxcombo": 0
    },
    {
        "level": 5,
        "title": "DROP",
        "artist": "dj TAKA feat.Kanako Hoshino",
        "mode": "SINGLE",
        "difficulty": "CHALLENGE",
        "lamp": "",
        "rank": "",
        "score": 0,
        "playcount": 0,
        "clearcount": 0,
        "maxcombo": 0
    }]`);
        this.setState(
          {
            statsData: d,
          },
        );
        console.log(error);
      });
  }


  render() {
    const { statsData } = this.state;

    const columns = [
      {
        Header: '#',
        accessor: 'level',
        Filter: DdrStatsDropdownFilter,
        filterTitle: 'Level',
        filterAlg: ((a, b) => a < b),
        filter: 'includes',
        Cell: LevelCellRenderer,
      },
      {
        Header: 'Song Name',
        accessor: 'title',
        Cell: DefaultCellRenderer,
      },
      {
        Header: 'Artist',
        accessor: 'artist',
        Cell: DefaultCellRenderer,
      },
      {
        Header: 'Mode',
        accessor: 'mode',
        sortMethod: modeSorting,
        Filter: DdrStatsDropdownFilter,
        filterTitle: 'Mode',
        filterAlg: modeSortingAlg,
        filter: 'includes',
        Cell: DefaultCellRenderer,
      },
      {
        Header: 'Difficulty',
        accessor: 'difficulty',
        sortMethod: difficultySorting,
        Filter: DdrStatsDropdownFilter,
        filterTitle: 'Difficulty',
        filterAlg: difficultySortingAlg,
        filter: 'includes',
        Cell: DefaultCellRenderer,
      },
      {
        Header: 'Lamp',
        accessor: 'lamp',
        Cell: DefaultCellRenderer,
      },
      {
        Header: 'Rank',
        accessor: 'rank',
        sortType: rankSorting,
        Filter: DdrStatsDropdownFilter,
        filterTitle: 'Rank',
        filterAlg: rankSortingAlg,
        filter: 'includes',
        Cell: DefaultCellRenderer,
      },
      {
        Header: 'Score',
        accessor: 'score',
        Cell: DefaultCellRenderer,
      },
      {
        Header: 'Play Count',
        accessor: 'playcount',
        Cell: DefaultCellRenderer,
      },
      {
        Header: 'Clear Count',
        accessor: 'clearcount',
        Cell: DefaultCellRenderer,
      },
      {
        Header: 'Max Combo',
        accessor: 'maxcombo',
        Cell: DefaultCellRenderer,
      },
    ];

    const data = statsData;

    return (
      <DdrStatsTable
        columnSettings={columns}
        rowData={data}
      />
    );
  }
}
