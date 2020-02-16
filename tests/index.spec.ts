import test from "unit.js";
import { interpret } from "xstate";
import { MdsMachine, MachineEvent } from "../index";

import scooterGoodJSON from "../fixtures/scBasicTrip.json";
let scooterGood: MachineEvent[] = <MachineEvent[]>scooterGoodJSON;

import scooterBadJSON from "../fixtures/scBadTrip.json";
let scooterBad: MachineEvent[] = <MachineEvent[]>scooterBadJSON;

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

  it("Verifies basic scooter trip succeeds", done => {
    const mdsService = interpret(MdsMachine).start();
    mdsService.send(scooterGood);
    test.value(mdsService.state.value).is("available");
    done();
  });

  it("Verifies bad scooter trip fails", done => {
    const mdsService = interpret(MdsMachine).start();
    mdsService.send(scooterBad);
    test.value(mdsService.state.value).is("available");
    done();
  });
});
