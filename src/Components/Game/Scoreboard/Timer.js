import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { Button } from "@material-ui/core";

export default function Timer(props) {
  const [isTimeoutClockDisplayed, toggleTimeoutClock] = useState(false);
  const [count, setCount] = useState(0);
  const [timeout, setTimeout] = useState(120);
  const [isPaused, togglePaused] = useState(true);

  useInterval(
    () => {
      // Your custom logic here
      //setTime((count+1).split(""))

      setCount(count + 1);
    },
    isPaused ? null : 1000
  );
  const handleStartStop = () => {
    togglePaused(!isPaused);
  };
  const timeoutReset = () => {
    toggleTimeoutClock(false);
    setTimeout(120);
  };
  useInterval(
    () => {
      // Your custom logic here
      //setTime((count+1).split(""))
      if (timeout === 1) {
        return timeoutReset();
      }

      setTimeout(timeout - 1);
    },
    isTimeoutClockDisplayed ? 1000 : null
  );
  // const handleStartStop = () => {
  //   togglePaused(!isPaused);
  //};
  function handleReset() {
    togglePaused(true);
    setCount(0);
    setTimeout(120);
    toggleTimeoutClock(false);
  }

  return (
    <div
      style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}
    >
      <Button
        variant="contained"
        style={{
          borderRadius: "8px",
          width: "100px",
          visibility: isTimeoutClockDisplayed ? "hidden" : "visible"
        }}
        onClick={handleStartStop}
      >
        {isPaused ? "Start" : "Stop"}
      </Button>

      {isTimeoutClockDisplayed ? (
        <div style={{ flex: 1, textAlign: "center" }}>
          <h6
            style={{
              marginTop: ".5em",
              position: "relative",
              top: 0,
              color: timeout < 30 && timeout % 2 === 1 ? "red" : null
            }}
          >
            Timeout
          </h6>
          <h1
            style={{
              paddingY: "1em",
              color: timeout < 30 && timeout % 2 === 1 ? "red" : null
            }}
          >
            {moment()
              .minute(0)
              .second(timeout)
              .format("mm:ss")}
          </h1>
        </div>
      ) : (
        <h1 style={{ flex: 1, textAlign: "center", paddingY: "1em" }}>
          {moment()
            .minute(0)
            .second(count)
            .format("mm:ss")}
        </h1>
      )}
      <Button
        variant="contained"
        style={{ borderRadius: "8px", width: "100px" }}
        onClick={() =>
          isPaused
            ? handleReset()
            : isTimeoutClockDisplayed
            ? timeoutReset()
            : toggleTimeoutClock(!isTimeoutClockDisplayed)
        }
      >
        {isPaused
          ? "Reset"
          : isTimeoutClockDisplayed
          ? "Finish early"
          : "2min timeout"}
      </Button>
    </div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
