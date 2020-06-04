import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { DdrLoadButton } from './DdrDataLoad';
import { PlaycountGraphMemo } from '../common/PlaycountGraph';

const loadAllCallback = () => {
  window.location.replace(window.location.href);
};

const loadRecentCallback = () => {
  window.location.replace(window.location.href);
};

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    borderStyle: 'solid',
    borderRadius: 8,
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    textAlign: 'center',
    float: 'center',
    backgroundColor: '#444444',
    maxWidth: '50%',
    '@media (max-width: 800px)': {
      maxWidth: 400,
    },
  },
  graph: {
    margin: 'auto',
    float: 'none',
    '& div': {
      display: 'inline',
    },
  },
}));

const DdrProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLinked, setIsLinked] = useState(true);
  const [isServerError, setIsServerError] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get('/external/api/ddr/profile', {})
      .then((response) => {
        if (response.status === 200) {
          setProfile(response.data);
          setIsLoaded(true);
          setIsLinked(true);
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data.Code === 365) {
          setIsLinked(false);
        } else {
          setIsServerError(true);
        }
        setIsLoaded(true);
      });
  }, []);

  if (!isLoaded) {
    return (
      <CircularProgress />
    );
  }

  if (isServerError) {
    return (
      <>
        <span>Seems there is something going wrong with our servers...</span>
        <br />
        <span>Please reload the page and try again. If issues persist, please contact us.</span>
      </>
    );
  }

  if (!isLinked) {
    return (
      <>
        <span>Your account has not yet been linked to a DDR profile.</span>
        <br />
        <span>To link your profile, click the button below to load your profile.</span>
        <br />
        <DdrLoadButton
          buttonText="Load All Scores"
          url="/external/api/ddr/profile/refresh"
          callback={loadAllCallback}
          failureText="Failed to load all data. Have you played DDR before?"
        />
      </>
    );
  }

  const today = new Date();
  const start = new Date();
  start.setUTCDate(today.getUTCDate() - 29);

  return (
    <Container
      fluid="sm"
      className={classes.profileContainer}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '2em',
            }}
          >
            {profile.Name}
          </span>
          <br />
          {profile.Id}
        </Grid>
        <Grid item xs={12}>
          <div className={clsx('mixed-chart', classes.graph)}>
            <PlaycountGraphMemo
              data={profile.WorkoutData}
              startingDate={`${start.getUTCFullYear()}-${start.getUTCMonth() + 1}-${start.getUTCDate()}`}
              endingDate={`${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <span>
            Load all your recent plays! This should be used if you have played less than 50 songs since last loading data.
          </span>
          <br />
          <DdrLoadButton
            buttonText="Load Recent Scores"
            url="/external/api/ddr/profile/update"
            callback={loadRecentCallback}
            failureText="Failed to load recent data."
          />
        </Grid>
        <Grid item xs={6}>
          <span>
            Load your whole history! This should be used if you have played more than 50 songs since last loading data.
          </span>
          <br />
          <DdrLoadButton
            buttonText="Load All Scores"
            url="/external/api/ddr/profile/refresh"
            callback={loadAllCallback}
            failureText="Failed to load all data."
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DdrProfile;
