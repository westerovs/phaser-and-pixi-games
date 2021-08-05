import { getRandomNumber } from './utils.js';

const generateTask = () => {
  const generateRandomBoolean = () => !!getRandomNumber(0, 1);

  return {
    boolean: generateRandomBoolean(),
  };
};

export {
  generateTask
};
