import {getRandomNumber, getRandomArrayItem} from "../utils/utils";

const COMMENTS_COUNT = getRandomNumber(0, 5);

const Emoji = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
];

const Messages = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const Author = [
  `Tim Macoveev`,
  `John Doe`,
  `J. J. Abrams`,
];

const getRandomEmoji = () => {
  const emoji = getRandomArrayItem(Emoji);

  return `./images/emoji/${emoji}.png`;
};

const generateComment = () => {
  return {
    emoji: getRandomEmoji(), // должно быть только название angry
    author: getRandomArrayItem(Author),
    date: `2019/12/31 23:59`,
    message: getRandomArrayItem(Messages),
  };
};

const generateComments = () => {
  return new Array(COMMENTS_COUNT)
    .fill(null)
    .map(generateComment);
};

export {generateComments};
