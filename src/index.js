import React from 'react';
import ReactDOM from 'react-dom';

import { getRandomWord } from './utils/word';
import Wrapper from './components/Wrapper';

ReactDOM.render(
  <Wrapper word={getRandomWord()} />,
  document.getElementById('root')
);
