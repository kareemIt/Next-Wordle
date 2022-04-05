import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { getRandomWord } from './utils/word';

ReactDOM.render(
  <App word={getRandomWord()} />,
  document.getElementById('root')
);
