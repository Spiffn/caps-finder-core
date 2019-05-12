export default class History {
  constructor() {
    this.events = [];
  }

  log(event) {
    this.events.push({
      time: new Date(),
      event,
    });
  }
}
