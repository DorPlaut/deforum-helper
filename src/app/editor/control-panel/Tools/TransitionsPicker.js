import { useFramesStore } from '@/store/framesStore';
import React, { useState } from 'react';
import {
  TbEaseIn,
  TbEaseInOut,
  TbEaseOut,
  TbMinusVertical,
} from 'react-icons/tb';

const TransitionsPicker = () => {
  // global state
  const { transitionMode, setTrantisonMode } = useFramesStore((state) => state);
  // local state
  const [isSelecting, setIsSelecting] = useState(false);
  return (
    <div className="transitions-picker-container">
      <button
        title="Transition mode"
        className="btn block-btn transitions-btn unclickable-btn"
        onClick={() => {
          alert('Transition modes are not available yet. Check again soon');
        }}
        // onClick={() => {
        //   setIsSelecting(!isSelecting);
        // }}
      >
        {transitionMode === 'linear' && (
          <TbMinusVertical style={{ rotate: '45deg', scale: '1.15' }} />
        )}
        {transitionMode === 'ease-in' && <TbEaseIn />}
        {transitionMode === 'ease-out' && <TbEaseOut />}
        {transitionMode === 'ease-in-out' && <TbEaseInOut />}
      </button>
      {isSelecting && (
        <div className="transitions-picker">
          <button
            title="Linear"
            className="btn block-btn transitions-btn transition"
            onClick={() => {
              setTrantisonMode('linear');
              setIsSelecting(false);
            }}
          >
            <TbMinusVertical style={{ rotate: '45deg', scale: '1.15' }} />
          </button>
          <button
            title="Ease in"
            className="btn block-btn transitions-btn transition"
            onClick={() => {
              setTrantisonMode('ease-in');
              setIsSelecting(false);
            }}
          >
            <TbEaseIn />
          </button>
          <button
            title="Ease out"
            className="btn block-btn transitions-btn transition"
            onClick={() => {
              setTrantisonMode('ease-out');
              setIsSelecting(false);
            }}
          >
            <TbEaseOut />
          </button>
          <button
            title="Ease in out"
            className="btn block-btn transitions-btn transition"
            onClick={() => {
              setTrantisonMode('ease-in-out');

              setIsSelecting(false);
            }}
          >
            <TbEaseInOut />
          </button>
        </div>
      )}
    </div>
  );
};

export default TransitionsPicker;
