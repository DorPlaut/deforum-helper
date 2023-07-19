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
      <ZoomFader zoom={zoom} setZoom={setZoom} />
      <div className="timeline-container">
        <div className="channels">
          {channels.map((channelName, index) => {
            return (
              <div
                key={index}
                className="channel"
                onClick={() => setSelectedChannel(channelName)}
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
