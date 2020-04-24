import {getRandomArrayItem} from "../utils/utils";

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

const generateComments = (count) => {
  return new Array(count)
    .fill(null)
    .map(generateComment);
};

export {generateComments};
