import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from '../../containers/PageContainer';
import DdrProfile from '../../components/ddr/DdrProfile';

ReactDOM.render(<PageContainer render={DdrProfile} />, document.getElementById('root'));
