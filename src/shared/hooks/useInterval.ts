import { useEffect, useRef } from 'react';

function isFunction(obj: any) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

export default function useInterval(callback, delay: number) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (isFunction(savedCallback.current)) {
        //@ts-ignore
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
