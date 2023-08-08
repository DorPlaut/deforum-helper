import { useFramesStore } from '@/store/framesStore';
import React, { useEffect, useState } from 'react';
import { BiTime } from 'react-icons/bi';
import {
  BsFillFastForwardFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillRewindFill,
  BsFillStopFill,
  BsLayers,
  BsSkipEndFill,
  BsSkipStartFill,
} from 'react-icons/bs';

const LiveMenu = ({
  timeLine,
  setTimeLine,
  isRunning,
  setIsRunning,
  animationSettings,
}) => {
  // global state data
  const { fps, frameCount } = useFramesStore((state) => state);
  // find current frame
  const findFrame = () => {
    let currentFrame;
    animationSettings.translationX.map((timeStemp, index) => {
      if (timeStemp[0] === timeLine) currentFrame = timeStemp[2];
    });
    if (currentFrame) return currentFrame;
    else return frameCount - 1;
  };
  const [frame, setFrame] = useState(0);
  // update current frame
  useEffect(() => {
    setFrame(findFrame());
  }, [timeLine]);

  // format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    // const tenths = Math.floor((seconds - Math.floor(seconds)) * 10);

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  //   move forward/backward buttons
  //   timer
  const [timer, setTimer] = useState();

  const animationLengthInSec =
    animationSettings.translationX[
      animationSettings.translationX.length - 1
    ][0] + 0.1;
  // move forward in timeline
  const startIncrease = () => {
    setTimeLine((prevTimeLine) => {
      if (prevTimeLine + 1 < animationLengthInSec) return prevTimeLine + 1;
      else return animationLengthInSec;
    });
    setTimer(
      setInterval(() => {
        setTimeLine((prevTimeLine) => {
          if (prevTimeLine + 1 < animationLengthInSec) return prevTimeLine + 1;
          else return animationLengthInSec;
        });
      }, 150)
    );
  };
  // move backword in timeline
  const startDecrease = () => {
    setTimer(
      setInterval(() => {
        setTimeLine((prevTimeLine) => {
          if (prevTimeLine - 1 > 0) return prevTimeLine - 1;
          else return 0;
        });
      }, 150)
    );
  };
  // relese button handle
  const handleReleseBtn = () => {
    clearInterval(timer);
  };

  return (
    <div className="live-menu-container">
      <div className="live-menu">
        <div className="live-time-display">
          <BiTime /> <span> {formatTime(timeLine)}</span>
        </div>
        <div className="live-time-display">
          <BsLayers />
          <span>{frame}</span>
        </div>
        {/* buttons */}

        {/* to start button */}
        <button
          className="btn live-btn block-btn"
          onClick={() => {
            setTimeLine(0);
          }}
        >
          <BsSkipStartFill />
        </button>

        {/* move backward button */}
        <button
          className="btn live-btn block-btn"
          onMouseDown={startDecrease}
          onMouseUp={handleReleseBtn}
        >
          <BsFillRewindFill />
        </button>

        {/* play/pause button */}
        {isRunning ? (
          <button
            className="btn live-btn block-btn pause-btn"
            onClick={() => {
              setIsRunning(false);
            }}
          >
            <BsFillPauseFill />
          </button>
        ) : (
          <button
            className="btn live-btn block-btn play-btn"
            onClick={() => {
              setIsRunning(true);
            }}
          >
            <BsFillPlayFill />
          </button>
        )}

        {/* move forward button*/}
        <button
          className="btn live-btn block-btn"
          onMouseDown={startIncrease}
          onMouseUp={handleReleseBtn}
        >
          <BsFillFastForwardFill />
        </button>

        {/* to end button */}
        <button
          className="btn live-btn block-btn"
          onClick={() => {
            setTimeLine(animationLengthInSec);
          }}
        >
          <BsSkipEndFill />
        </button>

        {/* stop button */}
        <button
          className="btn live-btn block-btn"
          onClick={() => {
            setIsRunning(false);
            setTimeLine(0);
            setTimeout(() => {
              setFrame(0);
            }, 100);
          }}
        >
          <BsFillStopFill />
        </button>
      </div>
    </div>
  );
};

export default LiveMenu;
