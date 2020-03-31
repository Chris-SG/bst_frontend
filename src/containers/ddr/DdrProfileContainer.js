import React, { Component } from 'react';
import {
  Col,
  Container,
  Spinner,
  Row,
} from 'react-bootstrap';
import axios from 'axios';
import { Chart } from 'react-charts';
import { DdrLoadAll, DdrLoadRecent } from '../../components/ddr/DdrDataLoad';


export default class DdrProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      profileLoaded: false,
      profileLinked: false,
    };
  }

  componentDidMount() {
    this.loadProfile();
  }

  loadProfile() {
    axios
      .get('/external/bst_api/ddr_profile', {})
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState(
            {
              profile: response.data,
              profileLoaded: true,
              profileLinked: true,
            },
          );
        } else {
          this.setState(
            {
              profileLoaded: true,
              profileLinked: false,
            },
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadAllCallback() {
    window.location.replace(window.location.href);
  }

  generatePlaycountTable() {
    const { profile } = this.state;

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
  }

  render() {
    const { profile, profileLoaded, profileLinked } = this.state;
    return (
      <>
        {
          profileLoaded ? (() => {
            if (profileLinked) {
              return (
                <Container fluid="lg">
                  <Row>
                    <Col>
                      {profile.Name}
                      <br />
                      {profile.Id}
                    </Col>
                  </Row>
                  <Row>
                    {
                      this.generatePlaycountTable()
                    }
                  </Row>
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
            }
            return (
              <>
                <span>Your account has not yet been linked to a DDR profile.</span>
                <br />
                <span>To link your profile, click the button below to load your profile.</span>
                <br />
                <DdrLoadAll callback={this.loadAllCallback} failureText="Failed to load profile. Please try again." />
              </>
            );
          })
            : (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )
        }
      </>
    );
  }
}
