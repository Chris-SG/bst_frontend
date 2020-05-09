import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loading } from '../common/Loading';
import { titleColumnDetails } from './table/ColumnTitle';
import { artistColumnDetails } from './table/ColumnArtist';
import { modeColumnDetails } from './table/ColumnMode';
import { difficultyColumnDetails } from './table/ColumnDifficulty';
import { scoreColumnDetails } from './table/ColumnScore';
import { DrsDataTable } from './table/DrsDataTable';
import { levelColumnDetails } from './table/ColumnLevel';
import { myStatsColumnDetails } from './table/ColumnMyStats';
import { friendStatsColumnDetails } from './table/ColumnFriendStats';

const loadStats = (setData, setLoading) => {
  axios
    .get('/external/api/drs/tabledata', {})
    .then((response) => {
      setData(response.data);
      setLoading(false);
    })
    .catch((error) => {
      const d = JSON.parse(`[
    {
        "title": "ランニングマンレッスン",
        "artist": "オリジナル",
        "mode": "Single",
        "difficulty": "Easy",
        "level": 2,
        "score": 97524,
        "playcount": 1,
        "bestscoretime": "2018-11-17T02:11:54.456Z",
        "p1code": 80487,
        "p1perfects": 94,
        "p1greats": 5,
        "p1goods": 0,
        "p1bads": 2,
        "p2code": 0,
        "p2perfects": 0,
        "p2greats": 0,
        "p2goods": 0,
        "p2bads": 0,
        "id": "e80635d823c282ac46ace0c212da9f75",
        "code": 80487,
        "param": 9
    },
    {
        "title": "Playa",
        "artist": "SlayZ",
        "mode": "Single",
        "difficulty": "Easy",
        "level": 3,
        "score": 0,
        "playcount": 0,
        "bestscoretime": "0001-01-01T00:00:00Z",
        "p1code": 0,
        "p1perfects": 0,
        "p1greats": 0,
        "p1goods": 0,
        "p1bads": 0,
        "p2code": 0,
        "p2perfects": 0,
        "p2greats": 0,
        "p2goods": 0,
        "p2bads": 0,
        "id": "59fab2aa41def837702c00a4ef80d147",
        "code": 0,
        "param": 0
    },
    {
        "title": "Tステップレッスン",
        "artist": "オリジナル",
        "mode": "Single",
        "difficulty": "Easy",
        "level": 1,
        "score": 96185,
        "playcount": 1,
        "bestscoretime": "2018-11-20T10:43:38.716Z",
        "p1code": 80487,
        "p1perfects": 91,
        "p1greats": 2,
        "p1goods": 1,
        "p1bads": 3,
        "p2code": 0,
        "p2perfects": 0,
        "p2greats": 0,
        "p2goods": 0,
        "p2bads": 0,
        "id": "a365375db54c4c697e3d1c006de7f775",
        "code": 80487,
        "param": 9
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
  console.log(statsData);

  useEffect(() => {
    if (!loading) {
      setStatsData(statsData.map((el) => {
        if (el.mode === 'Single') {
          return ({
            ...el,
            mystats: `${el.p1perfects} / ${el.p1greats} / ${el.p1goods} / ${el.p1bads}`,
          });
        }
        const p1stats = `${el.p1perfects} / ${el.p1greats} / ${el.p1goods} / ${el.p1bads}`;
        const p2stats = `${el.p2perfects} / ${el.p2greats} / ${el.p2goods} / ${el.p2bads}`;
        if (el.code === el.p1code) {
          return ({
            ...el,
            mystats: p1stats,
            friendstats: p2stats,
          });
        }
        return ({
          ...el,
          mystats: p2stats,
          friendstats: p1stats,
        });
      }));
    }
  }, [loading]);

  const columns = [
    levelColumnDetails(),
    titleColumnDetails(),
    artistColumnDetails(),
    modeColumnDetails(),
    difficultyColumnDetails(),
    scoreColumnDetails(),
    myStatsColumnDetails(),
    friendStatsColumnDetails(),
  ];

  if (loading) {
    return <Loading />;
  }

  return <DrsDataTable inputColumns={columns} inputRows={statsData} />;
};
