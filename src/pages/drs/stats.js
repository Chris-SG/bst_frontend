import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from '../../containers/PageContainer';
import { Stats } from '../../components/drs/Stats';

ReactDOM.render(
  <PageContainer render={Stats}>
  </PageContainer>, document.getElementById('root'),
);
