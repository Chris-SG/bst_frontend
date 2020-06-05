import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from '../../containers/PageContainer';
import { Privacy } from '../../components/common/Privacy';

ReactDOM.render(<PageContainer render={Privacy}></PageContainer>, document.getElementById('root'));
