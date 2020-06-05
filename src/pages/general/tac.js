import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from '../../containers/PageContainer';
import { Tac } from '../../components/common/Tac';

ReactDOM.render(<PageContainer render={Tac}></PageContainer>, document.getElementById('root'));
