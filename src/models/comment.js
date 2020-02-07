export default class Comment {
  constructor(comment) {
    this.id = comment[`id`];
    this.author = comment[`author`];
    this.comment = comment[`comment`];
    this.date = comment[`date`];
    this.emotion = comment[`emotion`];
  }
}
