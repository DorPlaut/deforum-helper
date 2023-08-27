import { useAudioStore } from '@/store/audioStore';
import React from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { LiaCopy, LiaPasteSolid } from 'react-icons/lia';

const AudioChannelControls = ({ setSelectedChannel, channelName }) => {
  // Global state
  const {
    isPlaying,
    setIsPlaying,
    playAudio,
    pauseAudio,
    selectedAudio,
    setSelectedAudio,
  } = useAudioStore((state) => state);
  return (
    <div className="audio-channel-controls">
      <button title="Play" className="btn copy-btn" onClick={playAudio}>
        <BsFillPlayFill />
      </button>
      <button title="Pause" className="btn paste-btn" onClick={pauseAudio}>
        <BsFillPauseFill />
      </button>
    </div>
  );
};

export default AudioChannelControls;
