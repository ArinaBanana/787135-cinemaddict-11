import {getRandomArrayItem, getRandomNumber} from "../utils/utils";

const START_COMMENT_PERIOD_TIMESTAMP = 1580231110511;

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

const getEmojiUrlByName = (emoji) => `./images/emoji/${emoji}.png`;

const getRandomEmoji = () => {
  const emoji = getRandomArrayItem(Emoji);

  return getEmojiUrlByName(emoji);
};

const createComment = (emoji, author, date, message) => ({emoji, author, date, message});

const generateComment = (date) => {
  return createComment(getRandomEmoji(), getRandomArrayItem(Author), date, getRandomArrayItem(Messages));
};

const getNextDate = (prevDate) => {
  const minute = 1000 * 60;
  const multiplier = 20000;
  const delta = getRandomNumber(minute, multiplier * minute);

  const now = new Date().valueOf();
  let newDate = prevDate + delta;

  if (newDate > now) {
    newDate = now;
  }

  return newDate;
};

const generateComments = (count) => {
  let lastDate = START_COMMENT_PERIOD_TIMESTAMP;

  return new Array(count)
    .fill(null)
    .map(() => {
      lastDate = getNextDate(lastDate);
      return generateComment(lastDate);
    });
};

export {generateComments, createComment, getEmojiUrlByName};
