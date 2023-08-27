import { useAudioStore } from '@/store/audioStore';
import { useFramesStore } from '@/store/framesStore';
import React, { useEffect, useRef, useState } from 'react';
import { BiCube, BiTime } from 'react-icons/bi';
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
  setIsAnchorOn,
  isAnchorOn,
  audioRef,
}) => {
  // global state data
  const { fps, frameCount } = useFramesStore((state) => state);
  // Global state
  const {
    isPlaying,
    setIsPlaying,
    playAudio,
    pauseAudio,
    selectedAudio,
    setSelectedAudio,
    audioLength,
    setAudioLength,
  } = useAudioStore((state) => state);
  // find current frame
  const findFrame = () => {
    const tolerance = 0.001; // You can adjust this tolerance value as needed
    let currentFrame;
    animationSettings.translationX.forEach((timeStemp, index) => {
      if (Math.abs(timeStemp[0] - timeLine) < tolerance) {
        currentFrame = timeStemp[2];
      }
    });
    if (currentFrame !== undefined) {
      return currentFrame;
    } else {
      return frameCount - 1;
    }
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
  const step = 0.5;

  const animationLengthInSec =
    animationSettings.translationX[
      animationSettings.translationX.length - 1
    ][0] + 0.1;
  // move forward in timeline
  const startIncrease = () => {
    setTimeLine((prevTimeLine) => {
      if (prevTimeLine + step < animationLengthInSec)
        return prevTimeLine + step;
      else return animationLengthInSec;
    });
    setTimer(
      setInterval(() => {
        setTimeLine((prevTimeLine) => {
          if (prevTimeLine + step < animationLengthInSec)
            return prevTimeLine + step;
          else return animationLengthInSec;
        });
      }, 150)
    );
  };
  // move backword in timeline
  const startDecrease = () => {
    setTimeLine((prevTimeLine) => {
      if (prevTimeLine - step > 0) return prevTimeLine - step;
      else return 0;
    });
    setTimer(
      setInterval(() => {
        setTimeLine((prevTimeLine) => {
          if (prevTimeLine - step > 0) return prevTimeLine - step;
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
    <>
      <div className="live-menu-container">
        <div className="live-menu">
          {/* anchor btn */}
          <button
            style={{ background: isAnchorOn && 'white' }}
            title="anchor box"
            className="btn live-btn block-btn"
            onClick={() => {
              setIsAnchorOn(!isAnchorOn);
            }}
          >
            <BiCube />
          </button>
          {/* dispalys */}
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
            onTouchStart={startDecrease}
            onMouseUp={handleReleseBtn}
            onMouseLeave={handleReleseBtn}
            onTouchEnd={handleReleseBtn}
            onTouchMove={handleReleseBtn}
          >
            <BsFillRewindFill />
          </button>

          {/* play/pause button */}
          {isRunning ? (
            <button
              className="btn live-btn block-btn pause-btn"
              onClick={() => {
                setIsRunning(false);
                if (audioRef.current) {
                  audioRef.current.pause();
                }
              }}
            >
              <BsFillPauseFill />
            </button>
          ) : (
            <button
              className="btn live-btn block-btn play-btn"
              onClick={() => {
                setIsRunning(true);
                if (audioRef.current) {
                  audioRef.current.play();
                }
              }}
            >
              <BsFillPlayFill />
            </button>
          )}

          {/* move forward button*/}
          <button
            className="btn live-btn block-btn"
            onMouseDown={startIncrease}
            onTouchStart={startIncrease}
            onMouseUp={handleReleseBtn}
            onMouseLeave={handleReleseBtn}
            onTouchEnd={handleReleseBtn}
            onTouchMove={handleReleseBtn}
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
    </>
  );
};

export default LiveMenu;
