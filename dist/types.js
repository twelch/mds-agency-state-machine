"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstate_1 = require("xstate");
// The full xState machine
exports.MdsMachine = xstate_1.Machine({
    id: "mds",
    initial: "inactive",
    strict: true,
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
//# sourceMappingURL=types.js.map