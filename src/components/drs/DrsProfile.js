import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
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
  const [isLinked, setIsLinked] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get('/external/bst_api/ddr_profile', {})
      .then((response) => {
        if (response.status === 200) {
          setProfile(response.data);
          setIsLoaded(true);
          setIsLinked(true);
        } else {
          setIsLoaded(true);
          setIsLinked(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setProfile(JSON.parse(`{
          "Name": "BAUXE",
          "Id": 41316566,
          "WorkoutData": [
            {"Date":"2020-3-25","Playcount":15},
            {"Date":"2020-4-1","Playcount":23},
            {"Date":"2020-4-5","Playcount":66},
            {"Date":"2020-4-13","Playcount":1},
            {"Date":"2020-4-16","Playcount":23},
            {"Date":"2020-4-19","Playcount":5}
           ]
        }`));
        setIsLoaded(true);
        setIsLinked(true);
      });
  }, []);

  if (!isLoaded) {
    return (
      <CircularProgress />
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
          url="/external/bst_api/ddr_refresh"
          callback={loadAllCallback}
          failureText="Failed to load all data."
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
            url="/external/bst_api/ddr_update"
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
            url="/external/bst_api/ddr_refresh"
            callback={loadAllCallback}
            failureText="Failed to load all data."
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DdrProfile;
