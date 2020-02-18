import React, { useRef, useEffect } from "react";
import "./App.css";
import * as d3 from "d3";
import * as d3Graphviz from "d3-graphviz";

const _ = d3Graphviz.graphviz; //Preload d3Graphiz so it register itself in d3 as a plugin

interface IProps {
  data?: number[];
}

const FSM = (props: IProps) => {
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
     passes. In this case it will hold our component's SVG DOM element. It's
     initialized null and React will assign it later (see the return statement) */
  const d3Container = useRef(null);

  /* The useEffect Hook is for running side effects outside of React,
     for instance inserting elements into the DOM using D3 */
  useEffect(
    () => {
      if (d3Container.current) {
        var dotSrc = `
        digraph {
            graph [label="MDS State Diagram - Dockless" labelloc="t", fontsize="20.0" tooltip=" "]
            node [style="filled"]
            inactive [id="inactive" label="inactive" fillcolor="#1f77b4" pos="0,0!"]
            removed [id="removed" label="removed" fillcolor="#d62728"]
            available [id="available" label="available" fillcolor="#2ca02c"]
            elsewhere [id="elsewhere" label="elsewhere" fillcolor="#ff7f0e"]
            trip [id="trip" label="trip" fillcolor="#ff7f0e"]
            reserved [id="reserved" label="reserved" fillcolor="#ff7f0e"]
            unavailable [id="unavailable" label="unavailable" fillcolor="#ff7f0e"]
            inactive -> removed [id="E1" label="register" fontsize="8.0"]
            removed -> inactive [id="E2" label="deregister" fontsize="8.0"]
            removed -> trip [id="E3" label="trip_enter" fontsize="8.0"]
            removed -> available [id="E4" label="provider_drop_off" fontsize="8.0"]
            available -> unavailable [id="E5" label="service_end" fontsize="8.0"]
            available -> inactive [id="E6" label="deregister" fontsize="8.0"]
            available -> reserved [id="E7" label="reserve" fontsize="8.0"]
            available -> trip [id="E8" label="trip_start" fontsize="8.0"]
            available -> removed [id="E9" label="provider_pick_up" fontsize="8.0"]
            elsewhere -> inactive [id="E10" label="deregister" fontsize="8.0"]
            elsewhere -> removed [id="E11" label="provider_pick_up" fontsize="8.0"]
            elsewhere -> trip [id="E12" label="trip_enter" fontsize="8.0"]
            trip -> elsewhere [id="E13" label="trip_leave" fontsize="8.0"]
            trip -> available [id="E14" label="trip_end" fontsize="8.0"]
            reserved -> available [id="E14" label="cancel_reservation" fontsize="8.0"]
            reserved -> trip [id="E14" label="trip_start" fontsize="8.0"]
            unavailable -> available [id="E14" label="service_start" fontsize="8.0"]
            unavailable -> removed [id="E14" label="provider_pick_up" fontsize="8.0"]
            unavailable -> inactive [id="E14" label="deregister" fontsize="8.0"]
        }
        `;

        const graphviz = d3.select("#graph").graphviz();
        console.log("rendering", graphviz);
        graphviz.fade(false).renderDot(dotSrc);
      }
    },

    /*
          useEffect has a dependency array (below). It's a list of dependency
          variables for this useEffect block. The block will run after mount
          and whenever any of these variables change. We still have to check
          if the variables are valid, but we do not have to compare old props
          to next props to decide whether to rerender.
      */
    [d3Container.current]
  );

  return <div id="graph" ref={d3Container} />;
};

function App() {
  return (
    <div className="App">
      <FSM />
    </div>
  );
}

export default App;
