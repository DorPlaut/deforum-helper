'use client';
import { useFramesStore } from '@/store/framesStore';
import formatArrayToString from '@/utils/formatArrayToString';
import formatStringToArray from '@/utils/formatStringToArray';
import React, { useEffect, useState } from 'react';
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineCopy,
  AiOutlineFunction,
} from 'react-icons/ai';
import { ImPaste } from 'react-icons/im';
import { LiaCopy, LiaPasteSolid } from 'react-icons/lia';

const Channel = ({ channelName, selectedChannel, setSelectedChannel }) => {
  // data
  const {
    frameCount,
    transX,
    transY,
    transZ,
    rotX,
    rotY,
    rotZ,
    setTransX,
    setTransY,
    setTransZ,
    setRotX,
    setRotY,
    setRotZ,
  } = useFramesStore((state) => state);

  // dynamic css
  const [heightOpen, setHeightOpen] = useState('15rem');
  const [heightClose, setHeightClose] = useState('5rem');
  // get css var value
  useEffect(() => {
    if (document) {
      setHeightOpen(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--channelHeightOpen'
        )
      );
      setHeightClose(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--channelHeightClose'
        )
      );
    }
  }, []);

  // regex

  const regexPattern = /^(\d+:\(-?\d+(\.\d+)?\),\s*)*\d+:\(-?\d+(\.\d+)?\)$/;

  // handle reading math formulas:

  // formating string:
  function formatString(inputString) {
    const formatedString = inputString.replace(/\s+/g, ' ').trim();
    const formattedNumbers = formatedString.replace(
      /(-?\d+\.\d{2})/g,
      (match) => {
        const number = parseFloat(match);
        return number;
      }
    );

    return formattedNumbers;
  }

  //  calculating

  function evaluateFormula(formula) {
    let result = {};
    for (let i = 0; i <= frameCount; i++) {
      let value = eval(
        formula
          .replace(/t/g, i)
          .replace(/sin/g, 'Math.sin')
          .replace(/cos/g, 'Math.cos')
          .replace(/pi/g, 'Math.PI')
      );

      result[i] = value.toFixed(2);
    }

    let output = '';
    for (const key in result) {
      output += `${key}:(${result[key]}), `;
    }

    return output.slice(0, -2);
  }

  return (
    <div
      className="channel"
      style={{
        height: channelName === selectedChannel ? heightOpen : heightClose,
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
                navigator.clipboard.writeText(formatArrayToString(transX));
              if (channelName === 'Translation Y')
                navigator.clipboard.writeText(formatArrayToString(transY));
              if (channelName === 'Translation Z')
                navigator.clipboard.writeText(formatArrayToString(transZ));
              if (channelName === 'Rotation X')
                navigator.clipboard.writeText(formatArrayToString(rotX));
              if (channelName === 'Rotation Y')
                navigator.clipboard.writeText(formatArrayToString(rotY));
              if (channelName === 'Rotation Z')
                navigator.clipboard.writeText(formatArrayToString(rotZ));
            }}
          >
            <LiaCopy />
          </button>
          <button
            title="Paste frames values - values should be structured as Deforum values. example: 0:(0), 30:(9.6), 55:(8.6), 100:(7), 105:(-5), 120:(2.59)"
            className="btn paste-btn"
            onClick={() => {
              navigator.clipboard.readText().then((text) => {
                const formatedString = formatString(text);
                if (!regexPattern.test(formatedString)) {
                  alert('Invalid value');
                  return;
                }

                if (channelName === 'Translation X')
                  setTransX(formatStringToArray(formatedString, frameCount));
                if (channelName === 'Translation Y')
                  setTransY(formatStringToArray(formatedString, frameCount));
                if (channelName === 'Translation Z')
                  setTransZ(formatStringToArray(formatedString, frameCount));
                if (channelName === 'Rotation X')
                  setRotX(formatStringToArray(formatedString, frameCount));
                if (channelName === 'Rotation Y')
                  setRotY(formatStringToArray(formatedString, frameCount));
                if (channelName === 'Rotation Z')
                  setRotZ(formatStringToArray(formatedString, frameCount));
              });
            }}
          >
            <LiaPasteSolid />
          </button>
          {/* formula! */}
          <button
            title="Paste math formula - Math should be entered without frame count. For example: ((10 * cos((120 / 60 * 3.141 * (t + 0) / 24))**1 + 0.00))"
            className="btn formula-btn"
            onClick={() => {
              navigator.clipboard.readText().then((text) => {
                const stringValues = evaluateFormula(text);

                if (channelName === 'Translation X')
                  setTransX(formatStringToArray(stringValues, frameCount));
                if (channelName === 'Translation Y')
                  setTransY(formatStringToArray(stringValues, frameCount));
                if (channelName === 'Translation Z')
                  setTransZ(formatStringToArray(stringValues, frameCount));
                if (channelName === 'Rotation X')
                  setRotX(formatStringToArray(stringValues, frameCount));
                if (channelName === 'Rotation Y')
                  setRotY(formatStringToArray(stringValues, frameCount));
                if (channelName === 'Rotation Z')
                  setRotZ(formatStringToArray(stringValues, frameCount));

                //
              });
            }}
          >
            <AiOutlineFunction />
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
};

export default Channel;
