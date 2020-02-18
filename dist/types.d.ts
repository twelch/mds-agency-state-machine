export interface MdsMachineSchema {
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
export declare type MdsMachineEvent = {
    type: "register";
} | {
    type: "deregister";
} | {
    type: "provider_pick_up";
} | {
    type: "provider_drop_off";
} | {
    type: "service_start";
} | {
    type: "service_end";
} | {
    type: "reserve";
} | {
    type: "cancel_reservation";
} | {
    type: "trip_start";
} | {
    type: "trip_end";
} | {
    type: "trip_enter";
} | {
    type: "trip_leave";
};
export interface MdsMachineContext {
}
export declare const MdsMachine: import("xstate").StateMachine<MdsMachineContext, MdsMachineSchema, MdsMachineEvent, any>;
