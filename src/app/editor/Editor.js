'use client';
import React, { useState } from 'react';
import Timeline from './timeline/Timeline';
import ControlPanel from './control-panel/ControlPanel';
import Channel from './Channel';
import Link from 'next/link';

const Editor = () => {
  // ## CHANNELS ##
  // set the channels you want to edit
  const channels = [
    'Translation X',
    'Translation Y',
    'Translation Z',
    'Rotation X',
    'Rotation Y',
    'Rotation Z',
  ];
  //   local state for ui
  const [selectedChannel, setSelectedChannel] = useState('');
  const [zoom, setZoom] = useState(50);

  return (
    <div className="editor">
      {/* control panel */}
      <ControlPanel zoom={zoom} setZoom={setZoom} />
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
              <Channel
                key={index}
                channelName={channelName}
                selectedChannel={selectedChannel}
                setSelectedChannel={setSelectedChannel}
              />
            );
          })}
        </div>

        {/* timelines */}
        <div className="frames">
          {channels.map((channelName, index) => {
            return (
              <div key={index}>
                <Timeline
                  selected={channelName === selectedChannel}
                  setSelectedChannel={setSelectedChannel}
                  channelName={channelName}
                  first={index === 0}
                  zoom={zoom}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Link href={'/livedemo'}>experimental live view with 3d</Link>
    </div>
  );
};

export default Editor;
