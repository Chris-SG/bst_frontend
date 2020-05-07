import clsx from 'clsx';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Collapse from '@material-ui/core/Collapse';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Loading } from '../../common/Loading';
import { Scorecard } from '../Scorecard';

const useStyles = makeStyles((theme) => ({
  row: {
    '&.BEGINNER': {
      backgroundColor: 'rgba(0, 255, 255, 0.2)',
      ':hover': {
        backgroundColor: 'rgba(0, 255, 255, 0.4)',
      },
    },
    '&.BASIC': {
      backgroundColor: 'rgba(255, 165, 0, 0.2)',
      ':hover': {
        backgroundColor: 'rgba(255, 165, 0, 0.4)',
      },
    },
    '&.DIFFICULT': {
      backgroundColor: 'rgba(125, 7, 5, 0.2)',
      ':hover': {
        backgroundColor: 'rgba(125, 7, 5, 0.6)',
      },
    },
    '&.EXPERT': {
      backgroundColor: 'rgba(124, 251, 1, 0.2)',
      ':hover': {
        backgroundColor: 'rgba(124, 251, 1, 0.4)',
      },
    },
    '&.CHALLENGE': {
      backgroundColor: 'rgba(128, 0, 128, 0.2)',
      ':hover': {
        backgroundColor: 'rgba(128, 0, 128, 0.4)',
      },
    },
  },
  collapser: {
    width: 'inherit',
    float: 'center',
    margin: 'auto',
    textAlign: 'center',
  },
}));

const loadScores = (callback, setLoadingState, setSuccessState, songId, mode, diff) => {
  const url = '/external/api/ddr/song/scores';
  axios({
    method: 'get',
    url,
    params: {
      id: songId,
      mode,
      diff,
      ordering: 'time_played desc',
    },
  })
    .then((response) => {
      if (response.status === 200) {
        setLoadingState(false);
        setSuccessState(true);
        callback(response.data);
      } else {
        setLoadingState(false);
        setSuccessState(false);
      }
    })
    .catch(() => {
      setLoadingState(false);
      setSuccessState(true);
      const d = JSON.parse('[{"Score":807840,"ClearStatus":true,"TimePlayed":"2020-02-27T10:49:31Z","SongId":"8QbqP80q9PI8bbi0qOoiibOQD08OPdli","Mode":"SINGLE","Difficulty":"CHALLENGE","PlayerCode":41316566},{"Score":39140,"ClearStatus":false,"TimePlayed":"2020-02-27T10:47:28Z","SongId":"8QbqP80q9PI8bbi0qOoiibOQD08OPdli","Mode":"SINGLE","Difficulty":"CHALLENGE","PlayerCode":41316566},{"Score":585080,"ClearStatus":false,"TimePlayed":"2020-02-26T10:40:48Z","SongId":"8QbqP80q9PI8bbi0qOoiibOQD08OPdli","Mode":"SINGLE","Difficulty":"CHALLENGE","PlayerCode":41316566},{"Score":767530,"ClearStatus":false,"TimePlayed":"2020-02-26T10:11:02Z","SongId":"8QbqP80q9PI8bbi0qOoiibOQD08OPdli","Mode":"SINGLE","Difficulty":"CHALLENGE","PlayerCode":41316566},{"Score":578890,"ClearStatus":false,"TimePlayed":"2020-02-25T10:08:08Z","SongId":"8QbqP80q9PI8bbi0qOoiibOQD08OPdli","Mode":"SINGLE","Difficulty":"CHALLENGE","PlayerCode":41316566},{"Score":758430,"ClearStatus":false,"TimePlayed":"2020-02-25T10:05:37Z","SongId":"8QbqP80q9PI8bbi0qOoiibOQD08OPdli","Mode":"SINGLE","Difficulty":"CHALLENGE","PlayerCode":41316566},{"Score":731250,"ClearStatus":false,"TimePlayed":"2020-02-25T10:02:05Z","SongId":"8QbqP80q9PI8bbi0qOoiibOQD08OPdli","Mode":"SINGLE","Difficulty":"CHALLENGE","PlayerCode":41316566},{"Score":662560,"ClearStatus":false,"TimePlayed":"2020-02-25T09:59:30Z","SongId":"8QbqP80q9PI8bbi0qOoiibOQD08OPdli","Mode":"SINGLE","Difficulty":"CHALLENGE","PlayerCode":41316566},{"Score":270170,"ClearStatus":false,"TimePlayed":"2020-02-25T09:57:45Z","SongId":"8QbqP80q9PI8bbi0qOoiibOQD08OPdli","Mode":"SINGLE","Difficulty":"CHALLENGE","PlayerCode":41316566}]');
      callback(d);
    });
};

export const DdrTableRow = ({ row }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [scores, setScores] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [scoresLoaded, setScoresLoaded] = useState(false);
  const [successState, setSuccessState] = useState(false);

  const openCollapse = () => {
    if (!scoresLoaded) {
      console.log(row);
      setScoresLoaded(true);
      setLoadingState(true);
      loadScores(
        setScores,
        setLoadingState,
        setSuccessState,
        row.original.id,
        row.values.mode,
        row.values.difficulty,
      );
    }
    setOpen(!open);
  };

  return (
    <>
      <tr
        {...row.getRowProps()}
        className={clsx(row.values.difficulty, classes.row)}
        onClick={() => openCollapse()}
      >
        {row.cells.map(cell => (cell.render('Cell')))}
      </tr>
      <tr>
        <td colSpan={row.cells.length}>
          <Collapse in={open} timeout="auto" mountOnEnter unmountOnExit>
            <div className={classes.collapser}>
              <ScoreListing
                loadingState={loadingState}
                successState={successState}
                songName={row.values.title}
                songArtist={row.values.artist}
                scores={scores}
              />
            </div>
          </Collapse>
        </td>
      </tr>
    </>
  );
};

DdrTableRow.propTypes = {
  row: PropTypes.objectOf(PropTypes.any).isRequired,
};

const ScoreListing = ({ loadingState, successState, songName, songArtist, scores }) => {
  if (loadingState) {
    return <Loading />;
  }
  if (!successState) {
    return 'Failed to load scores :(';
  }
  if (scores.length === 0) {
    return 'No scores available for this song :(';
  }
  return (
    <Grid spacing={3} container>
      {
        scores.map(score => (
          <Grid item xs={4}>
            <Scorecard songName={songName} songArtist={songArtist} score={score} />
          </Grid>
        ))
      }
    </Grid>
  );
};

ScoreListing.propTypes = {
  loadingState: PropTypes.func.isRequired,
  successState: PropTypes.func.isRequired,
  songName: PropTypes.string.isRequired,
  songArtist: PropTypes.string.isRequired,
  scores: PropTypes.objectOf(PropTypes.any).isRequired,
};
