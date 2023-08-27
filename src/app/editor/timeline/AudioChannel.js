import { useAudioStore } from '@/store/audioStore';
import { useFramesStore } from '@/store/framesStore';
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioChannel = ({ zoom, selected, editroRef ,RullerRef}) => {
  // Global state
  const {
    isPlaying,
    setIsPlaying,
    playAudio,
    pauseAudio,
    selectedAudio,
    setSelectedAudio,
  } = useAudioStore((state) => state);

  const { frameCount } = useFramesStore((state) => state);

  // channel width from editor ref
  // const [channelWidth, setChannelWidth] = useState('100%');
  // useEffect(() => {
  //   if (editroRef.current) {
  //     setChannelWidth(editroRef.current.children[0].scrollWidth);
  //   }
  // }, [frameCount, zoom]);

  // create wave form visualization
  // wave form ref
  const waveformRef = useRef(null);
  // create the wave form
  const CreateWaveForm = () => {
    waveformRef.current = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#3498db',
      progressColor: '#2980b9',
      cursorColor: 'red',
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

  // controls

  useEffect(() => {
    if (waveformRef.current) waveformRef.current.playPause();
  }, [isPlaying]);

  return (
    <div
      className="waveform-container"
      style={{
        width: RullerRef.current && RullerRef.current.scrollWidth,
      }}
    >
      <div
        id="waveform"
        className="waveform"
        style={{
          transform: selected
            ? `scaleY(3.4) translateY(3.45rem)`
            : `scaleY(1) translateY(-1.5rem)`,
        }}
      ></div>
    </div>
  );
};

export default AudioChannel;
