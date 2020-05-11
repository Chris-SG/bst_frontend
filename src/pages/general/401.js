import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from '../../containers/PageContainer';
import { PageUnauthorized } from '../../components/common/4xx';

ReactDOM.render(<PageContainer render={PageUnauthorized}></PageContainer>, document.getElementById('root'));
