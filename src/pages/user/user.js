import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from '../../containers/PageContainer';
import { EaLoginField } from '../../components/common/EaLoginField';

ReactDOM.render(<PageContainer render={EaLoginField}></PageContainer>, document.getElementById('root'));
