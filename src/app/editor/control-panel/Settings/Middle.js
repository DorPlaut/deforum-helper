import { useFramesStore } from '@/store/framesStore';
import React, { useEffect } from 'react';
import { BiTime } from 'react-icons/bi';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

const Middle = () => {
  // global state
  const {
    maxValue,
    setMaxValue,
    near,
    setNear,
    far,
    setFar,
    fov,
    setFov,
    strength,
    setStrength,
    channels,
    addChannel,
    removeChannel,
    fov_schedule,
    setFov_schedule,
    strength_schedule,
    setStrength_schedule,
    near_schedule,
    setNear_schedule,
    far_schedule,
    setFar_schedule,
  } = useFramesStore((state) => state);
  // handle adding/removing channels
  const handleChannels = (channelName) => {
    if (channelName === 'fov_schedule') setFov_schedule([[0, fov, true]]);
    if (channelName === 'strength_schedule')
      setStrength_schedule([[0, strength, true]]);
    if (channelName === 'near_schedule') setNear_schedule([[0, near, true]]);
    if (channelName === 'far_schedule') setFar_schedule([[0, far, true]]);
    if (channels.includes(channelName)) removeChannel(channelName);
    else addChannel(channelName);
  };

  // handle Change
  const handlValuChange = (e, value, max, min) => {
    if (value < min || value > max) {
      alert(`Value must be between ${min} and ${max}`);
    } else {
      setNear(e.target.value);
      setNear_schedule([[0, e.target.value, true]]);
    }
  };

  // useEffect(() => {}, [channels]);
  return (
    <div className="settings-buttons">
      {/* FOV */}
      <div className="fps-input">
        <button
          title="Fov is the field of view of the camera. Create a timeline channel to animate this value"
          style={{
            background: channels.includes('fov_schedule') && 'black',
          }}
          className="add-channel-btn btn"
          onClick={() => {
            handleChannels('fov_schedule');
          }}
        >
          FOV
        </button>
        <input
          max={1000}
          min={1}
          readOnly={channels.includes('fov_schedule')}
          type={'number'}
          value={channels.includes('fov_schedule') ? fov_schedule[0][1] : fov}
          onChange={(e) => {
            handlValuChange(e, e.target.value, 1000, 1);
          }}
          className={channels.includes('fov_schedule') && 'read-only-input'}
        />
      </div>
      {/* strength */}
      <div className="fps-input">
        <button
          title="Strength is the amount of presence of previous frame to influence next frame. Create a timeline channel to animate this value"
          style={{
            background: channels.includes('strength_schedule') && 'black',
          }}
          className="add-channel-btn btn"
          onClick={() => {
            handleChannels('strength_schedule');
          }}
        >
          Strength
        </button>
        <input
          max={1}
          min={0}
          readOnly={channels.includes('strength_schedule')}
          type={'number'}
          value={
            channels.includes('strength_schedule')
              ? strength_schedule[0][1]
              : strength
          }
          className={
            channels.includes('strength_schedule') && 'read-only-input'
          }
          onChange={(e) => {
            handlValuChange(e, e.target.value, 1, 0);
          }}
        />
      </div>
      {/* near*/}
      <div className="fps-input">
        <button
          title="Near value is the closest distance from the camera. Create a timeline channel to animate this value"
          style={{ background: channels.includes('near_schedule') && 'black' }}
          className="add-channel-btn btn"
          onClick={() => {
            handleChannels('near_schedule');
          }}
        >
          Near
        </button>
        <input
          max={99999}
          min={1}
          readOnly={channels.includes('near_schedule')}
          type={'number'}
          value={
            channels.includes('near_schedule') ? near_schedule[0][1] : near
          }
          className={channels.includes('near_schedule') && 'read-only-input'}
          onChange={(e) => {
            handlValuChange(e, e.target.value, 99999, 1);
          }}
        />
      </div>
      {/* far*/}
      <div className="fps-input">
        <button
          title="Far value is the farthest distance from the camera. Create a timeline channel to animate this value"
          style={{ background: channels.includes('far_schedule') && 'black' }}
          className="add-channel-btn btn"
          onClick={() => {
            handleChannels('far_schedule');
          }}
        >
          Far
        </button>

        <input
          max={99999}
          min={1}
          readOnly={channels.includes('far_schedule')}
          type={'number'}
          value={channels.includes('far_schedule') ? far_schedule[0][1] : far}
          className={channels.includes('far_schedule') && 'read-only-input'}
          onChange={(e) => {
            handlValuChange(e, e.target.value, 99999, 1);
          }}
        />
      </div>
      <div className="add-channel-icon">
        <span title="Click on a parameter to add add a channel">
          <HiOutlineArrowNarrowLeft />
          <BiTime />
        </span>
      </div>
      {/* update max value */}
      <div className="fps-input">
        <label className="add-channel-btn btn unclickable" htmlFor="fps">
          Max value
        </label>
        <input
          max={40}
          min={1}
          type="number"
          value={maxValue}
          onChange={(e) => setMaxValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Middle;
