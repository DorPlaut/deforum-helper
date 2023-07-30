'use client';
import { useFramesStore } from '@/store/framesStore';
import formatArrayToString from '@/utils/formatArrayToString';
import React, { useEffect, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp, AiOutlineCopy } from 'react-icons/ai';

const Channel = ({ channelName, selectedChannel, setSelectedChannel }) => {
  // data
  const { transX, transY, transZ, rotX, rotY, rotZ } = useFramesStore(
    (state) => state
  );

  // dynamic css
  const [heightOpen, setHeightOpen] = useState('5rem');
  const [heightClose, setHeightClose] = useState('12rem');
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
            <AiOutlineCopy />
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
