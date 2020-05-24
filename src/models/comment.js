import {getEmojiUrlByName} from "../utils/utils";

export default class Comment {
  constructor(data) {
    this.emoji = getEmojiUrlByName(data[`emotion`]);
    this.author = data[`author`];
    this.date = data[`date`];
    this.message = data[`comment`];
    this.id = data[`id`];
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }
}
