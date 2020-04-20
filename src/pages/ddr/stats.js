import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import PageContainer from '../../containers/PageContainer';
import DdrStatsContainer from '../../containers/ddr/DdrStatsContainer';

ReactDOM.render(
  <PageContainer render={DdrStatsContainer}>
  </PageContainer>, document.getElementById('root'),
);
