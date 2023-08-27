'use state';
import { useAudioStore } from '@/store/audioStore';
import { useFramesStore } from '@/store/framesStore';
import React, { useEffect, useRef, useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import WaveSurfer from 'wavesurfer.js';

const AddAudioBtn = () => {
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
  const { channels, addChannel, removeChannel } = useFramesStore(
    (state) => state
  );

  // handle upload file
  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    // Create an audio element to get duration
    const audioElement = new Audio();
    audioElement.src = URL.createObjectURL(file);
    // // Wait for the audio to load and get its duration
    audioElement.addEventListener('loadedmetadata', () => {
      setSelectedAudio(file);
      setAudioLength(audioElement.duration);
    });
  };

  // add channels when theres audio
  useEffect(() => {
    if (selectedAudio && channels.includes('audio') === false)
      addChannel('audio');
    if (!selectedAudio) removeChannel('audio');
  }, [selectedAudio]);

  return (
    <>
      <button
        title="Upload audio track"
        className="btn block-btn add-audio-btn"
        onClick={() => {
          document.getElementById('audio-input').click();
        }}
      >
        <BsMusicNoteBeamed />
      </button>
      <input
        type="file"
        accept="audio/*"
        id="audio-input"
        className="invisible"
        onChange={handleAudioChange}
      />
    </>
  );
};

export default AddAudioBtn;
