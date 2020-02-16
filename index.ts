import { Machine, interpret, assign } from "xstate";

// The hierarchical (recursive) schema for the states
interface MDSStateSchema {
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
type MDSEvent =
  | { type: "REGISTER" }
  | { type: "DEREGISTER" }
  | { type: "PROVIDER_PICK_UP" }
  | { type: "PROVIDER_DROP_OFF" }
  | { type: "SERVICE_START" }
  | { type: "SERVICE_END" }
  | { type: "RESERVE" }
  | { type: "CANCEL_RESERVATION" }
  | { type: "TRIP_START" }
  | { type: "TRIP_END" }
  | { type: "TRIP_ENTER" }
  | { type: "TRIP_LEAVE" };

// The context (extended state) of the machine
interface MDSContext {
  elapsed: number;
}

const mdsMachine = Machine<MDSContext, MDSStateSchema, MDSEvent>({
  id: "fetch",
  initial: "inactive",
  states: {
    inactive: {
      on: {
        REGISTER: "removed"
      }
    },
    removed: {
      on: {
        DEREGISTER: "inactive",
        TRIP_ENTER: "trip",
        PROVIDER_DROP_OFF: "available"
      }
    },
    available: {
      on: {
        SERVICE_END: "unavailable",
        DEREGISTER: "inactive",
        RESERVE: "reserved",
        TRIP_START: "trip",
        PROVIDER_PICK_UP: "removed"
      }
    },
    elsewhere: {
      on: {
        DEREGISTER: "inactive",
        PROVIDER_PICK_UP: "removed",
        TRIP_ENTER: "trip"
      }
    },
    trip: {
      on: {
        TRIP_LEAVE: "elsewhere",
        TRIP_END: "available"
      }
    },
    reserved: {
      on: {
        CANCEL_RESERVATION: "available",
        TRIP_START: "trip"
      }
    },
    unavailable: {
      on: {
        SERVICE_START: "available",
        PROVIDER_PICK_UP: "removed",
        DEREGISTER: "inactive"
      }
    }
  }
});

const mdsService = interpret(mdsMachine).start();

mdsService.send("REGISTER");
console.log(mdsService.state.value);
mdsService.send("PROVIDER_DROP_OFF");
console.log(mdsService.state.value);
mdsService.send("TRIP_START");
console.log(mdsService.state.value);
mdsService.send("TRIP_END");
console.log(mdsService.state.value);
