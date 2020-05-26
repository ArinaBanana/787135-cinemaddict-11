import {getEmojiUrlByName} from "../utils/utils";

export default class CommentAdapter {
  constructor(data) {
    this.emoji = getEmojiUrlByName(data[`emotion`]);
    this.author = data[`author`];
    this.date = data[`date`];
    this.message = data[`comment`];
    this.id = data[`id`];
  }

  static parseComment(data) {
    return new CommentAdapter(data);
  }

  static parseComments(data) {
    return data.map(CommentAdapter.parseComment);
  }
}
