import React from 'react';
import ZoomFader from './ZoomFader';
import { useFramesStore } from '@/store/framesStore';
import {
  AiOutlineCopy,
  AiOutlineDownload,
  AiOutlineUpload,
} from 'react-icons/ai';
import axios from 'axios';
import formatArrayToString from '@/utils/formatArrayToString';
import formatStringToArray from '@/utils/formatStringToArray';

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
  // download settings
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

  // upload settings
  const handleUpload = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.txt';
      input.onchange = (event) => {
        const file = event.target.files[0];
        // create a FileReader object
        const reader = new FileReader();
        //  handle data on load
        reader.onload = () => {
          const fileData = reader.result;
          const jsonData = JSON.parse(fileData);
          // frase needed data
          const {
            fps,
            max_frames,
            translation_x,
            translation_y,
            translation_z,
            rotation_3d_x,
            rotation_3d_y,
            rotation_3d_z,
          } = jsonData;
          // update the global state with the extracted data
          setFps(fps);
          setFrameCount(max_frames);
          setTransX(formatStringToArray(translation_x, frameCount));
          setTransY(formatStringToArray(translation_y, frameCount));
          setTransZ(formatStringToArray(translation_z, frameCount));
          setRotX(formatStringToArray(rotation_3d_x, frameCount));
          setRotY(formatStringToArray(rotation_3d_y, frameCount));
          setRotZ(formatStringToArray(rotation_3d_z, frameCount));
        };
        // Read the contents of the file as a text string
        reader.readAsText(file);
      };
      // Trigger the file input
      input.click();
    } catch (error) {
      console.error(error);
    }
  };
  //
  return (
    <div className="editor-control-panel">
      <ZoomFader zoom={zoom} setZoom={setZoom} />
      <div className="control-buttons">
        <button
          className="btn block-btn"
          onClick={async () => {
            handleUpload();
          }}
        >
          <AiOutlineUpload /> Upload settings
        </button>
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
