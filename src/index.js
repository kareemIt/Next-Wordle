import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { getRandomWord } from './utils/word';
import Wrapper from './components/Wrapper';

ReactDOM.render(
  // <Wrapper>
    <App word={getRandomWord()} />, document.getElementById('root')
);
