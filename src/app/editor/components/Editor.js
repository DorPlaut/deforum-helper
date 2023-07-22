'use client';
import React, { useState } from 'react';
import Timeline from './Timeline';
import ZoomFader from './ZoomFader';

const Editor = ({ data }) => {
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
  return (
    <div className="editor">
      {/* control panel */}
      <div className="editor-control-panel">
        <ZoomFader zoom={zoom} setZoom={setZoom} />
        <div className="control-buttons">
          <button className="btn" onClick={() => console.log(data)}>
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
              </div>
            );
          })}
        </div>
        <div className="frames">
          {channels.map((channelName, index) => {
            return (
              <div key={index} onClick={() => setSelectedChannel(channelName)}>
                <Timeline
                  data={data}
                  selected={channelName === selectedChannel}
                  first={index === 0}
                  zoom={zoom}
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
