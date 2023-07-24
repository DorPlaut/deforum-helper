import React from 'react';
import ZoomFader from './ZoomFader';
import { useFramesStore } from '@/store/framesStore';
import { AiOutlineCopy, AiOutlineDownload } from 'react-icons/ai';
import axios from 'axios';
import formatArrayToString from '@/utils/formatArrayToString';

const ControlPanel = ({ zoom, setZoom }) => {
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
  //
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
  );
};

export default ControlPanel;
