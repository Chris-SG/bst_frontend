import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from '../../containers/PageContainer';
import { Help } from '../../components/common/Help';

ReactDOM.render(<PageContainer render={Help}></PageContainer>, document.getElementById('root'));
