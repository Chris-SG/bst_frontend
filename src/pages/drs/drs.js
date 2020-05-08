import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from '../../containers/PageContainer';
import DrsProfile from '../../components/drs/DrsProfile';

ReactDOM.render(<PageContainer render={DrsProfile} />, document.getElementById('root'));
