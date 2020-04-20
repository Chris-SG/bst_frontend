import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  Col, Container, Row, Spinner,
} from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { DdrLoadAll, DdrLoadRecent } from './DdrDataLoad';

const loadAllCallback = () => {
  window.location.replace(window.location.href);
};

const chartFromProfile = (profile) => {
  const chartWidth = 500;
  const chartType = 'bar';
  const chartSeries = [
    {
      data: [],
    },
  ];
  const chartOptions = {
    chart: {
      id: 'playcount',
      toolbar: {
        tools: {
          download: false,
        },
      },
    },
    xaxis: {
      categories: [],
    },
  };
  if (profile != null) {
    const playCounts = new Map();
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getUTCDate() - i);
      const dateString = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
      playCounts[dateString] = 0;
    }
    profile.WorkoutData.forEach((wd) => {
      console.log(wd);
      playCounts[wd.Date] = wd.Playcount;
    });
    const graphData = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getUTCDate() - i);
      const dateString = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
      chartSeries[0].data.push(playCounts[dateString]);
      chartOptions.xaxis.categories.push([dateString]);
    }
  }

  return {
    chartOptions,
    chartSeries,
    chartType,
    chartWidth,
  };
};

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
            {"Date":"2020-4-19","Playcount":5},
            {"Date":"2020-4-16","Playcount":23},
            {"Date":"2020-4-13","Playcount":1},
            {"Date":"2020-4-5","Playcount":66},
            {"Date":"2020-4-1","Playcount":23},
            {"Date":"2020-3-25","Playcount":15}
           ]
        }`));
        setIsLoaded(true);
        setIsLinked(true);
      });
  }, []);

  const {
    chartOptions, chartSeries, chartType, chartWidth
  } = chartFromProfile(profile);

  console.log(chartOptions);
  console.log(chartSeries);

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
      <div
        style={{
          width: '400px',
          height: '300px',
        }}
      >
        <div className="mixed-chart">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type={chartType}
            width={chartWidth}
          />
        </div>
      </div>
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
