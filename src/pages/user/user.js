import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from '../../containers/PageContainer';
import { UserPage } from '../../components/user/User';

ReactDOM.render(<PageContainer render={UserPage}></PageContainer>, document.getElementById('root'));
