import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from '../containers/PageContainer';

ReactDOM.render(<PageContainer render={() => 'Hello'} />, document.getElementById('root'));
