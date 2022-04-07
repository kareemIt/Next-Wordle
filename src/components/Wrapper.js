import React, { useState } from 'react';
import { getRandomWord } from '../utils/word';

const Wrapper = ({}) => {
  const [word, setWord] = useState(getRandomWord());
  const [nextRound, setNextRound] = useState();
  return <div></div>;
};
export default Wrapper;
