import React, { useEffect, useState } from 'react';
import axios from 'axios';
import
{
  Col, Container, Row, Spinner,
} from 'react-bootstrap';
import styled from 'styled-components';
import { DdrLoadButton } from './DdrDataLoad';
import { PlaycountGraphMemo } from '../common/PlaycountGraph';

const loadAllCallback = () => {
  window.location.replace(window.location.href);
};

const loadRecentCallback = () => {
  window.location.replace(window.location.href);
};

const StyledContainer = styled(Container)`
    border-style: solid;
    border-radius: 8px;
    padding-top: 8px;
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 8px;
    text-align: center;
    float: center;
    background-color: #444444;
    max-width: 50%;
    @media (max-width: 800px) {
      max-width: 400px;
    }
 `;

const DdrProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLinked, setIsLinked] = useState(false);

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
    <StyledContainer
      fluid="sm"
    >
      <Row>
        <Col>
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
        </Col>
      </Row>
      <Row>
        <div className="mixed-chart" style={{ margin: 'auto' }}>
          <PlaycountGraphMemo
            data={profile.WorkoutData}
            startingDate={`${start.getUTCFullYear()}-${start.getUTCMonth() + 1}-${start.getUTCDate()}`}
            endingDate={`${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`}
          />
        </div>
      </Row>
      <Row>
        <Col>
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
        </Col>
        <Col>
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
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default DdrProfile;
