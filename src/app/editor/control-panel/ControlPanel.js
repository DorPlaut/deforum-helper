import React from 'react';
import ZoomFader from './ZoomFader';
import { useFramesStore } from '@/store/framesStore';
import {
  AiOutlineCopy,
  AiOutlineDownload,
  AiOutlineUpload,
} from 'react-icons/ai';
import { BiCube, BiRefresh } from 'react-icons/bi';
import axios from 'axios';
import formatArrayToString from '@/utils/formatArrayToString';
import formatStringToArray from '@/utils/formatStringToArray';
import Link from 'next/link';
import { BsFillTrash3Fill } from 'react-icons/bs';

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
          // updated translation and rotation values only after fps and framecount updated
          const transXArray = formatStringToArray(translation_x, max_frames);
          const transYArray = formatStringToArray(translation_y, max_frames);
          const transZArray = formatStringToArray(translation_z, max_frames);
          const rotXArray = formatStringToArray(rotation_3d_x, max_frames);
          const rotYArray = formatStringToArray(rotation_3d_y, max_frames);
          const rotZArray = formatStringToArray(rotation_3d_z, max_frames);

          setTransX(transXArray);
          setTransY(transYArray);
          setTransZ(transZArray);
          setRotX(rotXArray);
          setRotY(rotYArray);
          setRotZ(rotZArray);
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
      <div className="control-buttons">
        <ZoomFader zoom={zoom} setZoom={setZoom} />
        <Link
          className="btn block-btn btn-3d "
          href={'/livedemo'}
          title="Live view your timeline animation"
        >
          <span>3D</span>
          <BiCube />
        </Link>
        <button
          title="Start over"
          className="btn block-btn reset-btn"
          onClick={() => {
            window.location.reload(false);
          }}
        >
          <BiRefresh />
        </button>
      </div>

      <div className="control-buttons">
        <button
          className="btn block-btn"
          title="Upload settings from .txt. must match stable defusion deforum setting file format"
          onClick={async () => {
            handleUpload();
          }}
        >
          <AiOutlineUpload /> Upload settings
        </button>
        <button
          className="btn block-btn"
          title="Download settings as .txt file. can bu loaded to stable defusion deforum through  Automatic1111"
          onClick={async () => {
            handleDownload();
          }}
        >
          <AiOutlineDownload /> Download settings
        </button>
        <button
          className="btn block-btn"
          title="Copy settings to clipboard. can be pasted to stable defusion deforum settings file"
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
