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
    transZ,
    setTransZ,
    rotX,
    setRotX,
    rotY,
    setRotY,
    rotZ,
    setRotZ,
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
          <button
            className="btn"
            onClick={() => {
              console.log({
                fps: fps,
                translation_x: formatArrayToString(transX),
                translation_y: formatArrayToString(transY),
                translation_z: formatArrayToString(transZ),
                rotation_3d_x: formatArrayToString(rotX),
                rotation_3d_y: formatArrayToString(rotY),
                rotation_3d_z: formatArrayToString(rotZ),
              });
            }}
          >
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
                style={{
                  height: channelName === selectedChannel ? '8rem' : '2rem',
                }}
              >
                <span
                  onClick={() => {
                    setSelectedChannel(channelName);
                  }}
                >
                  {channelName}
                </span>

                {channelName === selectedChannel && (
                  <>
                    <button
                      className="btn copy-btn"
                      onClick={() => {
                        if (channelName === 'Translation X')
                          console.log(formatArrayToString(transX));
                        if (channelName === 'Translation Y')
                          console.log(formatArrayToString(transY));
                        if (channelName === 'Translation Z')
                          console.log(formatArrayToString(transZ));
                        if (channelName === 'Rotation X')
                          console.log(formatArrayToString(rotX));
                        if (channelName === 'Rotation Y')
                          console.log(formatArrayToString(rotY));
                        if (channelName === 'Rotation Z')
                          console.log(formatArrayToString(rotZ));
                      }}
                    >
                      Copy string
                    </button>
                    <button
                      className="btn copy-btn"
                      onClick={() => {
                        setSelectedChannel('');
                      }}
                    >
                      Minimize
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
