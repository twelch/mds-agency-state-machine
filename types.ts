import { Machine } from "xstate";

// The hierarchical (recursive) schema for the states
export interface MachineSchema {
  states: {
    inactive: {};
    removed: {};
    available: {};
    elsewhere: {};
    trip: {};
    reserved: {};
    unavailable: {};
  };
}

// The events that the machine handles
export type MachineEvent =
  | { type: "register" }
  | { type: "deregister" }
  | { type: "provider_pick_up" }
  | { type: "provider_drop_off" }
  | { type: "service_start" }
  | { type: "service_end" }
  | { type: "reserve" }
  | { type: "cancel_reservation" }
  | { type: "trip_start" }
  | { type: "trip_end" }
  | { type: "trip_enter" }
  | { type: "trip_leave" };

// The context (extended state) of the machine
export interface MachineContext {
  elapsed: number;
}

// The full xState machine
export const MdsMachine = Machine<MachineContext, MachineSchema, MachineEvent>({
  id: "fetch",
  initial: "inactive",
  states: {
    inactive: {
      on: {
        register: "removed"
      }
    },
    removed: {
      on: {
        deregister: "inactive",
        trip_enter: "trip",
        provider_drop_off: "available"
      }
    },
    available: {
      on: {
        service_end: "unavailable",
        deregister: "inactive",
        reserve: "reserved",
        trip_start: "trip",
        provider_pick_up: "removed"
      }
    },
    elsewhere: {
      on: {
        deregister: "inactive",
        provider_pick_up: "removed",
        trip_enter: "trip"
      }
    },
    trip: {
      on: {
        trip_leave: "elsewhere",
        trip_end: "available"
      }
    },
    reserved: {
      on: {
        cancel_reservation: "available",
        trip_start: "trip"
      }
    },
    unavailable: {
      on: {
        service_start: "available",
        provider_pick_up: "removed",
        deregister: "inactive"
      }
    }
  }
});
