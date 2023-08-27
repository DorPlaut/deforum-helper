import { useFramesStore } from '@/store/framesStore';
import React, { useState } from 'react';
import { BiBarChart } from 'react-icons/bi';
import { HiMiniChevronDoubleRight } from 'react-icons/hi2';

const ValueIndicators = ({
  strength,
  fov,
  near,
  far,
  positionX,
  positionY,
  positionZ,
  rotationX,
  rotationY,
  rotationZ,
}) => {
  // global state
  const { maxValue, channels } = useFramesStore((state) => state);
  const channelsArr = [
    positionX,
    positionY,
    positionZ,
    rotationX,
    rotationY,
    rotationZ,
  ];

  // local state for ui
  const [isOpen, setIsOpen] = useState(true);
  // toggle ui
  const toggleUI = () => {
    setIsOpen(!isOpen);
  };

  // calculate value for bar height
  const calculateVisualValue = (currentValue) => {
    const minValue = -maxValue;
    if (currentValue < 0) currentValue = -currentValue;
    const percentage = (Math.abs(currentValue) / maxValue) * 100;
    // Return the calculated percentage with the original sign
    return Math.sign(currentValue) * percentage;
  };

  return (
    <div
      className="value-indicators-container"
      style={{
        transform: isOpen ? 'translateX(0)' : 'translateX(calc(100% - 3rem))',
      }}
    >
      <button
        className="btn live-btn block-btn indicators-btn"
        onClick={toggleUI}
      >
        {isOpen ? <HiMiniChevronDoubleRight /> : <BiBarChart />}
      </button>
      {/* indicators */}
      <div className="value-indicators">
        {/*  */}

        {/*  */}
        {channelsArr.map((channel, index) => {
          return (
            <div
              className={`indicator ${index === 0 && 'first-indicator'}`}
              key={index}
            >
              <div className="value-indicator-container">
                <div
                  className={`value-indicator ${
                    index === 0 && 'first-indicator'
                  }`}
                  style={{ height: `${calculateVisualValue(channel)}%` }}
                ></div>
                <span className="indicator-Value">{channel.toFixed(2)}</span>
              </div>
              <span className="indicator-name">
                {index === 0 && 'Trans-X'}
                {index === 1 && 'Trans-Y'}
                {index === 2 && 'Trans-Z'}
                {index === 3 && 'Rot-X'}
                {index === 4 && 'Rot-Y'}
                {index === 5 && 'Rot-Z'}
                {/* {index === 0 && 'translation_x'}
              {index === 1 && 'translation_y'}
              {index === 2 && 'translation_z'}
              {index === 3 && 'rotation_3d_x'}
              {index === 4 && 'rotation_3d_y'}
              {index === 5 && 'rotation_3d_z'} */}
              </span>
            </div>
          );
        })}
        {/* other channels */}

        {channels.includes('strength_schedule') && (
          <div className="indicator">
            <div className="value-indicator-container ">
              <div
                className="value-indicator "
                style={{ height: `${strength * 100}%` }}
              ></div>
              <span className="indicator-Value">
                {parseFloat(strength).toFixed(2)}
              </span>
            </div>
            <span className="indicator-name">Strength</span>
          </div>
        )}

        {channels.includes('fov_schedule') && (
          <div className="indicator">
            <div className="value-indicator-container ">
              <div
                className="value-indicator "
                style={{ height: `${fov}%` }}
              ></div>
              <span className="indicator-Value">
                {parseFloat(fov).toFixed(2)}
              </span>
            </div>
            <span className="indicator-name">FOV</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValueIndicators;
