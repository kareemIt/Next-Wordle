import { words, alphabet } from './WordBank.js';

export const getRandomWord = () => {
  const randomWord = randomizePosition(words);
  const randomWords = [...randomWord].sort(() => Math.random() - 0.5);
  const shuffleAlphabet = alphabet.sort(() => 0.5 - Math.random());
  const selectedShuffle = shuffleAlphabet.slice(0, 3);
  const combiningArrs = [...randomWords, ...selectedShuffle];
  const finalArr = combiningArrs.sort(() => Math.random() - 0.5);
  return finalArr;
};

export const randomizePosition = (array) => {
  var randomArray = array[Math.floor(Math.random() * array.length)];
  return randomArray;
};
