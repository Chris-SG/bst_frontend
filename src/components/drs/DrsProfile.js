import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { PlaycountGraphMemo } from '../common/PlaycountGraph';
import { DrsLoadButton } from './DrsDataLoad';

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
      .get('/external/api/drs/details', {})
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
        setIsLoaded(true);
        setIsLinked(false);
      });
  }, []);
  console.log(profile);

  if (!isLoaded) {
    return (
      <CircularProgress />
    );
  }

  if (!isLinked) {
    return (
      <>
        <span>Your account has not yet been linked to a DRS profile.</span>
        <br />
        <span>To link your profile, click the button below to load your profile.</span>
        <br />
        <DrsLoadButton
          buttonText="Load All Scores"
          url="/external/api/drs/profile"
          callback={loadAllCallback}
          failureText="Failed to load all data."
        />
      </>
    );
  }

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
            {profile.name}
          </span>
          <br />
          {profile.code}
        </Grid>
        <Grid item xs={12}>
          <span>
            Click below to update your play data!.
          </span>
          <br />
          <DrsLoadButton
            buttonText="Load Recent Scores"
            url="/external/api/drs/profile"
            callback={loadRecentCallback}
            failureText="Failed to load recent data."
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DdrProfile;
