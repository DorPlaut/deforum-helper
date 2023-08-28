import { useAudioStore } from '@/store/audioStore';
import { useFramesStore } from '@/store/framesStore';
import framesToTime from '@/utils/framesToTime';
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioChannel = ({ selected, RullerRef }) => {
  // Global state
  const {
    isPlaying,
    setIsPlaying,
    playAudio,
    pauseAudio,
    selectedAudio,
    setSelectedAudio,
  } = useAudioStore((state) => state);

  const {
    frameCount,
    fps,
    transX,
    hoverdFrame,
    selectedFrame,
    setselectedFrame,
  } = useFramesStore((state) => state);

  // create wave form visualization
  // wave form ref
  const waveformRef = useRef(null);
  // create the wave form
  const CreateWaveForm = () => {
    waveformRef.current = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#5dfff999',
      progressColor: '#3d5e5c80',
      cursorColor: 'darkRed',
      height: 'auto',
    });
  };
  useEffect(() => {
    CreateWaveForm();
  }, []);

  // create the wave form
  useEffect(() => {
    if (waveformRef.current && selectedAudio) {
      waveformRef.current.load(URL.createObjectURL(selectedAudio));
    }
  }, [selectedAudio]);

  // set position from frames ruller
  useEffect(() => {
    if (transX[selectedFrame]) {
      waveformRef.current.setTime(
        framesToTime(fps, transX[selectedFrame][0], true)
      );
    }
  }, [selectedFrame]);

  // controls

  useEffect(() => {
    if (waveformRef.current) {
      if (isPlaying) waveformRef.current.play();
      else waveformRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (waveformRef.current) {
      waveformRef.current.setOptions({ height: selected ? 250 : 80 });
    }
  }, [selected]);

  return (
    <div
      className="waveform-container"
      style={{
        width: RullerRef.current && RullerRef.current.scrollWidth,
      }}
    >
      <div id="waveform" className="waveform"></div>
    </div>
  );
};

export default AudioChannel;
