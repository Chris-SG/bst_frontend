import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  song: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  songTitle: {
    fontSize: '12px',
  },
  songArtist: {
    fontSize: '8px',
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const Scorecard = ({ songName, songArtist, score }) => {
  const classes = useStyles();
  console.log(score);
  return (
    <Card className={classes.root}>
      <CardContent className={classes.song}>
        <Typography className={classes.songTitle} variant="h5">
          {songName}
        </Typography>
        <Typography className={classes.songArtist} variant="subtitle1" color="textSecondary">
          {songArtist}
        </Typography>
      </CardContent>
      <CardContent className={classes.detail}>
        Score:
        {' '}
        {score.Score}
        <br />
        Played:
        {' '}
        {score.TimePlayed}
      </CardContent>
    </Card>
  );
};

Scorecard.propTypes = {
  songName: PropTypes.string.isRequired,
  songArtist: PropTypes.string.isRequired,
  score: PropTypes.objectOf(PropTypes.any).isRequired,
};
