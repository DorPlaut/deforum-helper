'use client';
import { useFramesStore } from '@/store/framesStore';
import formatArrayToString from '@/utils/formatArrayToString';
import formatStringToArray from '@/utils/formatStringToArray';
import React, { useEffect, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp, AiOutlineCopy } from 'react-icons/ai';
import { ImPaste } from 'react-icons/im';
import { LiaCopy, LiaPasteSolid } from 'react-icons/lia';

const Channel = ({ channelName, selectedChannel, setSelectedChannel }) => {
  // data
  const {
    frameCount,
    transX,
    transY,
    transZ,
    rotX,
    rotY,
    rotZ,
    setTransX,
    setTransY,
    setTransZ,
    setRotX,
    setRotY,
    setRotZ,
  } = useFramesStore((state) => state);

  // dynamic css
  const [heightOpen, setHeightOpen] = useState('15rem');
  const [heightClose, setHeightClose] = useState('5rem');
  // get css var value
  useEffect(() => {
    if (document) {
      setHeightOpen(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--channelHeightOpen'
        )
      );
      setHeightClose(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--channelHeightClose'
        )
      );
    }
  }, []);

  // regex

  const regexPattern = /^(\d+:\(-?\d+(\.\d+)?\),\s*)*\d+:\(-?\d+(\.\d+)?\)$/;

  return (
    <div
      className="channel"
      style={{
        height: channelName === selectedChannel ? heightOpen : heightClose,
      }}
    >
      <span>{channelName}</span>

      {channelName === selectedChannel ? (
        <>
          <button
            title="Copy to clipboard"
            className="btn copy-btn"
            onClick={() => {
              if (channelName === 'Translation X')
                navigator.clipboard.writeText(formatArrayToString(transX));
              if (channelName === 'Translation Y')
                navigator.clipboard.writeText(formatArrayToString(transY));
              if (channelName === 'Translation Z')
                navigator.clipboard.writeText(formatArrayToString(transZ));
              if (channelName === 'Rotation X')
                navigator.clipboard.writeText(formatArrayToString(rotX));
              if (channelName === 'Rotation Y')
                navigator.clipboard.writeText(formatArrayToString(rotY));
              if (channelName === 'Rotation Z')
                navigator.clipboard.writeText(formatArrayToString(rotZ));
            }}
          >
            <LiaCopy />
          </button>
          <button
            title="Paste from clipboard"
            className="btn paste-btn"
            onClick={() => {
              navigator.clipboard.readText().then((text) => {
                if (!regexPattern.test(text)) {
                  alert('Invalid value');
                  return;
                }

                //
                if (channelName === 'Translation X')
                  setTransX(formatStringToArray(text, frameCount));
                if (channelName === 'Translation Y')
                  setTransY(formatStringToArray(text, frameCount));
                if (channelName === 'Translation Z')
                  setTransZ(formatStringToArray(text, frameCount));
                if (channelName === 'Rotation X')
                  setRotX(formatStringToArray(text, frameCount));
                if (channelName === 'Rotation Y')
                  setRotY(formatStringToArray(text, frameCount));
                if (channelName === 'Rotation Z')
                  setRotZ(formatStringToArray(text, frameCount));
              });
            }}
          >
            <LiaPasteSolid />
          </button>
          <button
            title="Minimize"
            className="btn minimize-btn"
            onClick={() => {
              setSelectedChannel('');
            }}
          >
            <AiFillCaretUp />
          </button>
        </>
      ) : (
        <button
          title="Expand"
          className="btn minimize-btn"
          onClick={() => {
            setSelectedChannel(channelName);
          }}
        >
          <AiFillCaretDown />
        </button>
      )}
    </div>
  );
};

export default Channel;
