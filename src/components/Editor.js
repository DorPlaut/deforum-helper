'use client';
import React, { useState } from 'react';
import Timeline from './Timeline';
import ZoomFader from './ZoomFader';
import { useFramesStore } from '@/store/framesStore';

const Editor = () => {
  // data
  const {
    fps,
    frameCount,
    setFps,
    setFrameCount,
    transX,
    setTransX,
    transY,
    setTransY,
    transD,
    setTransD,
    rotX,
    setRotX,
    rotY,
    setRotY,
    rotD,
    setRotD,
  } = useFramesStore((state) => state);
  // set channels
  const channels = [
    'Translation X',
    'Translation Y',
    'Translation Z',
    'Rotation X',
    'Rotation Y',
    'Rotation Z',
  ];
  //   local state
  const [selectedChannel, setSelectedChannel] = useState('');
  //   view zoom
  const [zoom, setZoom] = useState(50);

  //
  // crate json settings
  // format strings
  const formatArrayToString = (arrays) => {
    const filteredArrays = arrays.filter((array) => array.length === 3);

    const formattedStrings = filteredArrays.map((array) => {
      const [firstValue, secondValue] = array;
      return `${firstValue}:(${secondValue})`;
    });
    return formattedStrings.join(', ');
  };
  return (
    <div className="editor">
      {/* control panel */}
      <div className="editor-control-panel">
        <ZoomFader zoom={zoom} setZoom={setZoom} />
        <div className="control-buttons">
          <button className="btn" onClick={() => {}}>
            Download settings
          </button>
        </div>
      </div>
      <div className="timeline-container">
        <div className="channels">
          {/* rullers */}
          <div
            className="channel"
            style={{
              height: '2rem',
            }}
          >
            frame/time
          </div>
          {/* channels */}
          {channels.map((channelName, index) => {
            return (
              <div
                key={index}
                className="channel"
                onClick={() => {
                  if (selectedChannel === channelName) {
                    setSelectedChannel('');
                  } else setSelectedChannel(channelName);
                }}
                style={{
                  height: channelName === selectedChannel ? '8rem' : '2rem',
                }}
              >
                {channelName}
                {channelName === selectedChannel && (
                  <>
                    <button
                      className="btn copy-btn"
                      onClick={() => {
                        console.log(formatArrayToString(transX));
                      }}
                    >
                      Copy string
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="frames">
          {channels.map((channelName, index) => {
            return (
              <div key={index} onClick={() => setSelectedChannel(channelName)}>
                <Timeline
                  fps={fps}
                  frameCount={frameCount}
                  selected={channelName === selectedChannel}
                  channelName={channelName}
                  first={index === 0}
                  zoom={zoom}
                  formatArrayToString={formatArrayToString}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Editor;
