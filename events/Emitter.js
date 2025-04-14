
class EventEmitter extends Phaser.Events.EventEmitter {
    constructor() {
        super();
    }
}

window.EventEmitter = new EventEmitter();