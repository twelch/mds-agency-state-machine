import { interpret } from "xstate";
import { MdsMachine } from "./types";

const mdsService = interpret(MdsMachine).start();

mdsService.send("register");
console.log(mdsService.state.value);
mdsService.send("provider_drop_off");
console.log(mdsService.state.value);
mdsService.send("trip_start");
console.log(mdsService.state.value);
mdsService.send("trip_end");
console.log(mdsService.state.value);
