import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Col, Container, Row, Spinner,
} from 'react-bootstrap';
import { Chart } from 'react-charts';
import { DdrLoadAll, DdrLoadRecent } from './DdrDataLoad';

const loadAllCallback = () => {
  window.location.replace(window.location.href);
};

const generatePlaycountTable = (profile) => {
  const data = React.useMemo(() => {
    const playCounts = new Map();

    profile.WorkoutData.forEach((wd) => {
      playCounts[wd.Date] = wd.Playcount;
    });
    const graphData = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today.getUTCDate() - 5);
      const dateString = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}`;
      graphData.push([dateString, playCounts[dateString]]);
    }
    return {
      label: 'Playcount',
      data: graphData,
    };
  }, []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    [],
  );

  return (
    <div
      style={{
        width: '400px',
        height: '300px',
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  );
};

const DdrProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLinked, setIsLinked] = useState(false);
  const [graph, setGraph] = useState(null)

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
      });
  }, []);

  useEffect(() => {
    if (profile != null) {
      setGraph(generatePlaycountTable(profile));
    }
  }, [profile]);

  if (!isLoaded) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (!isLinked) {
    return (
      <>
        <span>Your account has not yet been linked to a DDR profile.</span>
        <br />
        <span>To link your profile, click the button below to load your profile.</span>
        <br />
        <DdrLoadAll callback={loadAllCallback} failureText="Failed to load profile. Please try again." />
      </>
    );
  }

  return (
    <Container fluid="lg">
      <Row>
        <Col>
          {profile.Name}
          <br />
          {profile.Id}
        </Col>
      </Row>
      {graph}
      <Row>
        <Col>
          <span>Load all your recent plays! This should be used if you have played less than 50 songs since last loading data.</span>
          <DdrLoadRecent failureText="failed to load recent data" />
        </Col>
        <Col>
          <span>Load your whole history! This should be used if you have played more than 50 songs since last loading data.</span>
          <DdrLoadAll failureText="failed to load data" />
        </Col>
      </Row>
    </Container>
  );
};

export default DdrProfile;
