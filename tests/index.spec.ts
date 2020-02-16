import test from "unit.js";
import { interpret } from "xstate";
import { MdsMachine } from "../index";

describe("Test scooter ride", () => {
  it("Verifies starts inactive", done => {
    const mdsService = interpret(MdsMachine).start();
    // mdsService.send("register")
    // console.log(mdsService.state.value)
    test.value(mdsService.state.value).is("inactive");
    done();
  });
  it("Verifies registers to removed", done => {
    const mdsService = interpret(MdsMachine).start();
    mdsService.send("register");
    test.value(mdsService.state.value).is("removed");
    done();
  });
});
