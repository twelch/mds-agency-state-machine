"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class MdsInterpreter {
    constructor() {
        this.machine = types_1.MdsMachine;
        this._state = this.machine.initialState;
    }
    get state() {
        return this._state;
    }
    batch(events) {
        events.forEach(e => this.send(e));
    }
    send(event) {
        this._state = this.machine.transition(this._state, event);
        if (!this._state.changed)
            throw new Error(`Invalid transition: ${this._state.value}`);
    }
}
exports.MdsInterpreter = MdsInterpreter;
//# sourceMappingURL=interpreter.js.map