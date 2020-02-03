export default class CommentModel {
  constructor(comment) {
    this.id = comment[`id`];
    this.author = comment[`author`];
    this.comment = comment[`comment`];
    this.date = comment[`date`];
    this.emotion = comment[`emotion`];
  }

  toRAW() {
    return {
      'id': this.id,
      'author': this.author,
      'comment': this.comment,
      'date': this.date,
      'emotion': this.emotion
    };
  }
}
