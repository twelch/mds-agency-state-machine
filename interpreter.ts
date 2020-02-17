import {
  MdsMachine,
  MdsMachineContext,
  MdsMachineSchema,
  MdsMachineEvent
} from "./types";
import { State, StateMachine, Interpreter, interpret } from "xstate";

export class MdsInterpreter {
  // Use custom types
  private _currentState: State<
    MdsMachineContext,
    MdsMachineEvent,
    MdsMachineSchema
  >;
  machine: StateMachine<MdsMachineContext, MdsMachineSchema, MdsMachineEvent>;
  constructor() {
    this.machine = MdsMachine;
    this._currentState = this.machine.initialState;
  }

  get currentState(): State<
    MdsMachineContext,
    MdsMachineEvent,
    MdsMachineSchema
  > {
    return this._currentState;
  }

  batch(events: MdsMachineEvent[]) {
    console.log(events);
  }

  send(event: MdsMachineEvent) {
    // Remember: machine.transition() is a pure function
    this._currentState = this.machine.transition(this._currentState, event);
  }
}
