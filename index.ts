import { interpret } from "xstate";
import { MmMachine } from "./types";

const mdsService = interpret(MmMachine).start();

mdsService.send("REGISTER");
console.log(mdsService.state.value);
mdsService.send("PROVIDER_DROP_OFF");
console.log(mdsService.state.value);
mdsService.send("TRIP_START");
console.log(mdsService.state.value);
mdsService.send("TRIP_END");
console.log(mdsService.state.value);
