import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from '../../containers/PageContainer';
import { PageNotFound } from '../../components/common/4xx';

ReactDOM.render(<PageContainer render={PageNotFound}></PageContainer>, document.getElementById('root'));
