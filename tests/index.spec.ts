import test from "unit.js";
import { interpret } from "xstate";
import { MdsMachine, MdsMachineEvent, MdsInterpreter } from "../index";

import scooterGoodJSON from "../fixtures/scBasicTrip.json";
let scooterGood: MdsMachineEvent[] = <MdsMachineEvent[]>scooterGoodJSON;

import scooterBadJSON from "../fixtures/scBadTrip.json";
let scooterBad: MdsMachineEvent[] = <MdsMachineEvent[]>scooterBadJSON;

describe("Test scooter ride", () => {
  // it("Verifies bad event throws error", done => {
  //   const mdsService = new MdsInterpreter();
  //   test.assert.throws(() => mdsService.send({ type: "foo" }))
  //   done();
  // });

  it("Verifies start is inactive", done => {
    const mdsService = new MdsInterpreter();
    mdsService.send({ type: "register" });
    test.value(mdsService.state.value).is("removed");
    done();
  });

  it("Verifies registers to removed", done => {
    const mdsService = interpret(MdsMachine).start();
    mdsService.send("register");
    test.value(mdsService.state.value).is("removed");
    done();
  });

  it("Verifies basic scooter trip succeeds", done => {
    const mdsService = new MdsInterpreter();
    mdsService.batch(scooterGood)
    test.value(mdsService.state.value).is("available");
    done();
  });

  it("Verifies bad scooter trip fails", done => {
    const mdsService = new MdsInterpreter();    
    test.assert.throws(() => mdsService.batch(scooterBad))
    done();
  });
});
