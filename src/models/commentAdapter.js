export default class CommentAdapter {
  constructor(data) {
    this.emoji = data[`emotion`];
    this.author = data[`author`];
    this.date = data[`date`];
    this.message = data[`comment`];
    this.id = data[`id`];
  }

  toRaw() {
    return {
      "id": this.id,
      "author": this.author,
      "comment": this.message,
      "date": this.date,
      "emotion": this.emoji,
    };
  }

  static parseComment(data) {
    return new CommentAdapter(data);
  }

  static parseComments(data) {
    return data.map(CommentAdapter.parseComment);
  }

  static clone(data) {
    return new CommentAdapter(data.toRaw());
  }
}
