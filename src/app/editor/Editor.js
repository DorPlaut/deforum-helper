'use client';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import Timeline from './timeline/Timeline';
import ControlPanel from './control-panel/Tools/ToolsPanel';
import Channel from './Channel';
import Link from 'next/link';
import Loading from '../loading';
import { useFramesStore } from '@/store/framesStore';
import { usePageStore } from '@/store/pageStore';
import Rullers from './timeline/Rullers';

const Editor = () => {
  // global state
  const {
    channels,
    transX,
    frameCount,
    VisibleChannels,
    SetVisibleChannels,
    selectedChannel,
    setSelectedChannel,
  } = useFramesStore((state) => state);
  const { isLoading } = usePageStore((state) => state);

  //   local state for ui
  const [zoom, setZoom] = useState(50);

  // buffer - elements ref to chack if they are on screen at any given time
  const editroRef = useRef();
  // channel width from editor ref
  const RullerRef = useRef();

  return (
    <div className="editor">
      {/* control panel */}
      <ControlPanel zoom={zoom} setZoom={setZoom} />
      {isLoading ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
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
                return <Channel key={index} channelName={channelName} />;
              })}
            </div>

            {/* timelines */}

            <div className="frames" ref={editroRef}>
              {channels.map((channelName, index) => {
                const isHidden = VisibleChannels.indexOf(channelName) === -1;
                return (
                  <div key={index} className="timelines-container">
                    {index === 0 && (
                      <Rullers
                        zoom={zoom}
                        frames={transX}
                        RullerRef={RullerRef}
                      />
                    )}
                    {isHidden ? (
                      <div
                        key={index}
                        className="timeLine hidden-timeline"
                        style={{
                          height: '2rem',
                          width:
                            RullerRef.current && RullerRef.current.scrollWidth,
                        }}
                      ></div>
                    ) : (
                      <div key={index}>
                        <Timeline
                          RullerRef={RullerRef}
                          editroRef={editroRef}
                          selected={channelName === selectedChannel}
                          channelName={channelName}
                          first={index === 0}
                          zoom={zoom}
                        />
                      </div>
                    )}
                  </div>
                );

                // isHidden ? (

                // ) : (

                // );
              })}
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default Editor;
