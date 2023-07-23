'use client';
import React, { useState } from 'react';
import Timeline from './Timeline';
import ZoomFader from './ZoomFader';
import { useFramesStore } from '@/store/framesStore';
import formatArrayToString from '@/utils/formatArrayToString';
import {
  AiFillCaretUp,
  AiOutlineCopy,
  AiFillCaretDown,
  AiOutlineDownload,
} from 'react-icons/ai';
import { GrCopy } from 'react-icons/gr';
import axios from 'axios';

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

  const handleDownload = async () => {
    try {
      const response = await axios.post(
        '/api/download/settings.txt',
        {
          fps: fps,
          max_frames: frameCount,
          animation_mode: '3D',
          border: 'wrap',
          translation_x: formatArrayToString(transX),
          translation_y: formatArrayToString(transY),
          translation_z: formatArrayToString(transZ),
          rotation_3d_x: formatArrayToString(rotX),
          rotation_3d_y: formatArrayToString(rotY),
          rotation_3d_z: formatArrayToString(rotZ),
        },
        {
          responseType: 'blob', // This ensures that the response is treated as a file
        }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'text/plain' });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'settings.txt');
      document.body.appendChild(link);
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="editor">
      {/* control panel */}
      <div className="editor-control-panel">
        <ZoomFader zoom={zoom} setZoom={setZoom} />
        <div className="control-buttons">
          <button
            className="btn block-btn"
            onClick={async () => {
              handleDownload();
            }}
          >
            <AiOutlineDownload /> Download settings
          </button>
          <button
            className="btn block-btn"
            onClick={() => {
              navigator.clipboard.writeText(`{
                fps: ${fps},
                max_frames: ${frameCount},
                animation_mode: '3D',
                border: 'wrap',
                translation_x: ${formatArrayToString(transX)},
                translation_y: ${formatArrayToString(transY)},
                translation_z: ${formatArrayToString(transZ)},
                rotation_3d_x: ${formatArrayToString(rotX)},
                rotation_3d_y: ${formatArrayToString(rotY)},
                rotation_3d_z: ${formatArrayToString(rotZ)},
              }`);
            }}
          >
            <AiOutlineCopy /> Copy settings
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
                <span>{channelName}</span>

                {channelName === selectedChannel ? (
                  <>
                    <button
                      title="Copy to clipboard"
                      className="btn copy-btn"
                      onClick={() => {
                        if (channelName === 'Translation X')
                          navigator.clipboard.writeText(
                            formatArrayToString(transX)
                          );
                        if (channelName === 'Translation Y')
                          navigator.clipboard.writeText(
                            formatArrayToString(transY)
                          );
                        if (channelName === 'Translation Z')
                          navigator.clipboard.writeText(
                            formatArrayToString(transZ)
                          );
                        if (channelName === 'Rotation X')
                          navigator.clipboard.writeText(
                            formatArrayToString(rotX)
                          );
                        if (channelName === 'Rotation Y')
                          navigator.clipboard.writeText(
                            formatArrayToString(rotY)
                          );
                        if (channelName === 'Rotation Z')
                          navigator.clipboard.writeText(
                            formatArrayToString(rotZ)
                          );
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
          })}
        </div>
        <div className="frames">
          {channels.map((channelName, index) => {
            return (
              <div key={index} onClick={() => setSelectedChannel(channelName)}>
                <Timeline
                  selected={channelName === selectedChannel}
                  channelName={channelName}
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
