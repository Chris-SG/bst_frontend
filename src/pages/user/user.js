import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from '../../containers/PageContainer';
import EaGateField from '../../components/EaGateUser';

ReactDOM.render(<PageContainer render={EaGateField}></PageContainer>, document.getElementById('root'));
