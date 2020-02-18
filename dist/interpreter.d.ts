import { MdsMachineContext, MdsMachineSchema, MdsMachineEvent } from "./types";
import { State, StateMachine } from "xstate";
export declare class MdsInterpreter {
    private _state;
    machine: StateMachine<MdsMachineContext, MdsMachineSchema, MdsMachineEvent>;
    constructor();
    get state(): State<MdsMachineContext, MdsMachineEvent, MdsMachineSchema>;
    batch(events: MdsMachineEvent[]): void;
    send(event: MdsMachineEvent): void;
}
