import { words, alphabet } from './WordBank.js';

export const getRandomWord = () => {
  const randomWord = randomizePosition(words);
  const randomWords = [...randomWord].sort(() => Math.random() - 0.5);
  const selectedShuffle = getRandomAlphabet(randomWords);
  const combiningArrs = [...randomWords, ...selectedShuffle];
  const finalArr = combiningArrs.sort(() => Math.random() - 0.5);
  return finalArr;
};

const getRandomAlphabet = (array) => {
  let finished = 0;
  let selectedShuffled = [];
  while (finished < 3) {
    const shuffleAlphabet = alphabet.sort(() => 0.5 - Math.random());
    const selectedShuffle = shuffleAlphabet[0];
    if (!array.includes(selectedShuffle)) {
      selectedShuffled.push(selectedShuffle);
      finished++;
    }
  }
  return selectedShuffled;
};

export const randomizePosition = (array) => {
  var randomArray = array[Math.floor(Math.random() * array.length)];
  return randomArray;
};
