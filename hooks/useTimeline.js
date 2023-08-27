import { useEffect } from 'react';

const useTimeline = (isRunning, setTimeLine) => {
  useEffect(() => {
    let timer = null;
    if (!isRunning) {
      clearInterval(timer);
      // setTimeLine(-0.5);
    } else {
      timer = setInterval(() => {
        if (isRunning) {
          setTimeLine((prevTime) => +(prevTime + 0.1).toFixed(1));
        }
      }, 100);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isRunning, setTimeLine]);
};

export default useTimeline;
