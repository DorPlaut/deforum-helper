'use client';
import React, { Suspense, useRef, useState } from 'react';
import Timeline from './timeline/Timeline';
import ControlPanel from './control-panel/Tools/ToolsPanel';
import Channel from './Channel';
import Link from 'next/link';
import Loading from '../loading';
import { useFramesStore } from '@/store/framesStore';

const Editor = () => {
  // global state
  const { channels } = useFramesStore((state) => state);

  //   local state for ui
  const [selectedChannel, setSelectedChannel] = useState('');
  const [zoom, setZoom] = useState(50);

  // buffer - elemts ref to chack if they are on screen at any given time
  const editroRef = useRef();

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
        <div className="frames" ref={editroRef}>
          <Suspense fallback={<Loading />}>
            {channels.map((channelName, index) => {
              return (
                <div key={index}>
                  <Timeline
                    editroRef={editroRef}
                    selected={channelName === selectedChannel}
                    setSelectedChannel={setSelectedChannel}
                    channelName={channelName}
                    first={index === 0}
                    zoom={zoom}
                  />
                </div>
              );
            })}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Editor;
