import React, { useState, useEffect, useRef } from "react";


export default function Counter(props) {
    const {setTime} = props
  const [count, setCount] = useState(0);

  useInterval(() => {
    // Your custom logic here
    //setTime((count+1).split(""))
    
    setCount(count + 1);
  }, 1000);

  return <h1>{count}</h1>;
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
