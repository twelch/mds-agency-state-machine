import test from "unit.js";
import { interpret } from "xstate";
import { MdsMachine, MdsMachineEvent, MdsInterpreter } from "../index";

import scooterGoodJSON from "../fixtures/scBasicTrip.json";
let scooterGood: MdsMachineEvent[] = <MdsMachineEvent[]>scooterGoodJSON;

import scooterBadJSON from "../fixtures/scBadTrip.json";
let scooterBad: MdsMachineEvent[] = <MdsMachineEvent[]>scooterBadJSON;

describe("Test scooter ride", () => {
  it("Verifies start is inactive", done => {
    const mdsService = new MdsInterpreter(); //interpret(MdsMachine).start();
    mdsService.send({ type: "register" });
    test.value(mdsService.currentState.value).is("removed");
    done();
  });

  it("Verifies registers to removed", done => {
    const mdsService = interpret(MdsMachine).start();
    mdsService.send("register");

    // Iterate through steps
    // Check if transition succeeds, if good then send event

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
    test.value(mdsService.state.value).is("reserved");
    done();
  });
});
