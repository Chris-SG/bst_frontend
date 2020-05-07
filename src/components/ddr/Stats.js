import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loading } from '../common/Loading';
import { levelColumnDetails } from './table/ColumnLevel';
import { titleColumnDetails } from './table/ColumnTitle';
import { artistColumnDetails } from './table/ColumnArtist';
import { modeColumnDetails } from './table/ColumnMode';
import { difficultyColumnDetails } from './table/ColumnDifficulty';
import { lampColumnDetails } from './table/ColumnLamp';
import { rankColumnDetails } from './table/ColumnRank';
import { scoreColumnDetails } from './table/ColumnScore';
import { playCountColumnDetails } from './table/ColumnPlayCount';
import { clearCountColumnDetails } from './table/ColumnClearCount';
import { maxComboColumnDetails } from './table/ColumnMaxCombo';
import { DdrStatsTable } from './table/DdrStatsTable';

const loadStats = (setData, setLoading) => {
  axios
    .get('/external/bst_api/ddr_stats', {})
    .then((response) => {
      setData(response.data);
      setLoading(false);
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
        "maxcombo": 0,
        "id": "abc"
    },
    {
        "level": 2,
        "title": "oarfish",
        "artist": "kors k",
        "mode": "SINGLE",
        "difficulty": "BASIC",
        "lamp": "グレートフルコンボ",
        "rank": "",
        "score": 0,
        "playcount": 0,
        "clearcount": 0,
        "maxcombo": 0,
        "id": "def"
    },
    {
        "level": 3,
        "title": "Taking It To The Sky",
        "artist": "U1 feat. Tammy S. Hansen",
        "mode": "SINGLE",
        "difficulty": "DIFFICULT",
        "lamp": "グッドフルコンボ",
        "rank": "",
        "score": 0,
        "playcount": 0,
        "clearcount": 0,
        "maxcombo": 0,
        "id": "123"
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
        "maxcombo": 0,
        "id": "456"
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
        "maxcombo": 0,
        "id": "abc123"
    }]`);
      setData(d);
      console.log(error);
      setLoading(false);
    });
};

export const Stats = () => {
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats(setStatsData, setLoading);
  }, []);

  const columns = [
    levelColumnDetails(),
    titleColumnDetails(),
    artistColumnDetails(),
    modeColumnDetails(),
    difficultyColumnDetails(),
    lampColumnDetails(),
    rankColumnDetails(),
    scoreColumnDetails(),
    playCountColumnDetails(),
    clearCountColumnDetails(),
    maxComboColumnDetails(),
  ];

  if (loading) {
    return <Loading />;
  }

  return <DdrStatsTable inputColumns={columns} inputRows={statsData} />
};
