export default class Comment {
  constructor(comment) {
    this.id = comment[`id`];
    this.author = comment[`author`];
    this.text = comment[`comment`];
    this.date = comment[`date`];
    this.emotion = comment[`emotion`];
  }

  toRAW() {
    return {
      'id': this.id,
      'author': this.author,
      'comment': this.text,
      'date': this.date,
      'emotion': this.emotion
    };
  }
}
