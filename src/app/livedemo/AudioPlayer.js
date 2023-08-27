import { useAudioStore } from '@/store/audioStore';
import React from 'react';

const AudioPlayer = ({ audioRef }) => {
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
  return (
    selectedAudio && (
      <audio ref={audioRef} src={URL.createObjectURL(selectedAudio)}></audio>
    )
  );
};

export default AudioPlayer;
