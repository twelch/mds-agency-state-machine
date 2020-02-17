import {
  MdsMachine,
  MdsMachineContext,
  MdsMachineSchema,
  MdsMachineEvent
} from "./types";
import { State, StateMachine, Interpreter, interpret } from "xstate";

export class MdsInterpreter {
  // Use custom types
  private _state: State<
    MdsMachineContext,
    MdsMachineEvent,
    MdsMachineSchema
  >;
  machine: StateMachine<MdsMachineContext, MdsMachineSchema, MdsMachineEvent>;
  constructor() {
    this.machine = MdsMachine;
    this._state = this.machine.initialState;
  }

  get state(): State<
    MdsMachineContext,
    MdsMachineEvent,
    MdsMachineSchema
  > {
    return this._state;
  }

  batch(events: MdsMachineEvent[]) {
    events.forEach(e => this.send(e))
  }

  send(event: MdsMachineEvent) {
    this._state = this.machine.transition(this._state, event);
    if (! this._state.changed) throw new Error(`Invalid transition: ${this._state.value}`)
  }
}
