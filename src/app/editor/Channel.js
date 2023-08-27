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
import AudioChannelControls from './AudioChannelControls';
import { BiHide, BiShow } from 'react-icons/bi';

const Channel = ({
  channelName,
  selectedChannel,
  setSelectedChannel,

}) => {
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
    fov,
    setFov,
    strength,
    setStrength,
    near,
    setNear,
    far,
    setFar,
    fov_schedule,
    setFov_schedule,
    strength_schedule,
    setStrength_schedule,
    near_schedule,
    setNear_schedule,
    far_schedule,
    setFar_schedule,VisibleChannels,
    SetVisibleChannels
  } = useFramesStore((state) => state);

  const isVisible = VisibleChannels.includes(channelName);

  // dynamic css
  const [heightOpen, setHeightOpen] = useState('15rem');
  const [heightMinimize, setHeightMinimize] = useState('5rem');
  const [heightClose, setHeightClose] = useState('5rem');
  // get css var value
  useEffect(() => {
    if (document) {
      setHeightOpen(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--channelHeightOpen'
        )
      );
      setHeightMinimize(
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
          .replace(/tan/g, 'Math.tan')
          .replace(/arcsin/g, 'Math.asin')
          .replace(/arccos/g, 'Math.acos')
          .replace(/arctan/g, 'Math.atan')
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
    <>
      {isVisible ? (
        <div
          className="channel"
          style={{
            height:
              channelName === selectedChannel ? heightOpen : heightMinimize,
          }}
        >
          <span>{channelName}</span>
          {/* hide btn */}
          <button
            title="Hide channel"
            className="btn hide-btn"
            onClick={() => {
              if (isVisible) {
                SetVisibleChannels(
                  VisibleChannels.filter((item) => item !== channelName)
                );
              } else if (!isVisible) {
                SetVisibleChannels([...VisibleChannels, channelName]);
              }
            }}
          >
            <BiHide />
          </button>

          {channelName === selectedChannel ? (
            <>
              {channelName === 'audio' ? (
                <AudioChannelControls
                  setSelectedChannel={setSelectedChannel}
                  channelName={channelName}
                />
              ) : (
                <>
                  <button
                    title="Copy to clipboard"
                    className="btn copy-btn"
                    onClick={() => {
                      if (channelName === 'translation_x')
                        navigator.clipboard.writeText(
                          formatArrayToString(transX)
                        );
                      if (channelName === 'translation_y')
                        navigator.clipboard.writeText(
                          formatArrayToString(transY)
                        );
                      if (channelName === 'translation_z')
                        navigator.clipboard.writeText(
                          formatArrayToString(transZ)
                        );
                      if (channelName === 'rotation_3d_x')
                        navigator.clipboard.writeText(
                          formatArrayToString(rotX)
                        );
                      if (channelName === 'rotation_3d_y')
                        navigator.clipboard.writeText(
                          formatArrayToString(rotY)
                        );
                      if (channelName === 'rotation_3d_z')
                        navigator.clipboard.writeText(
                          formatArrayToString(rotZ)
                        );
                      //
                      if (channelName === 'fov_schedule')
                        navigator.clipboard.writeText(
                          formatArrayToString(fov_schedule)
                        );
                      if (channelName === 'strength_schedule')
                        navigator.clipboard.writeText(
                          formatArrayToString(strength_schedule)
                        );
                      if (channelName === 'near_schedule')
                        navigator.clipboard.writeText(
                          formatArrayToString(near_schedule)
                        );
                      if (channelName === 'far_schedule')
                        navigator.clipboard.writeText(
                          formatArrayToString(far_schedule)
                        );
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

                        if (channelName === 'translation_x')
                          setTransX(
                            formatStringToArray(formatedString, frameCount)
                          );
                        if (channelName === 'translation_y')
                          setTransY(
                            formatStringToArray(formatedString, frameCount)
                          );
                        if (channelName === 'translation_z')
                          setTransZ(
                            formatStringToArray(formatedString, frameCount)
                          );
                        if (channelName === 'rotation_3d_x')
                          setRotX(
                            formatStringToArray(formatedString, frameCount)
                          );
                        if (channelName === 'rotation_3d_y')
                          setRotY(
                            formatStringToArray(formatedString, frameCount)
                          );
                        if (channelName === 'rotation_3d_z')
                          setRotZ(
                            formatStringToArray(formatedString, frameCount)
                          );
                        //
                        if (channelName === 'fov_schedule')
                          setFov_schedule(
                            formatStringToArray(formatedString, frameCount)
                          );
                        if (channelName === 'strength_schedule')
                          setStrength_schedule(
                            formatStringToArray(formatedString, frameCount)
                          );
                        if (channelName === 'near_schedule')
                          setNear_schedule(
                            formatStringToArray(formatedString, frameCount)
                          );
                        if (channelName === 'far_schedule')
                          setFar_schedule(
                            formatStringToArray(formatedString, frameCount)
                          );
                        //
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

                        if (channelName === 'translation_x')
                          setTransX(
                            formatStringToArray(stringValues, frameCount)
                          );
                        if (channelName === 'translation_y')
                          setTransY(
                            formatStringToArray(stringValues, frameCount)
                          );
                        if (channelName === 'translation_z')
                          setTransZ(
                            formatStringToArray(stringValues, frameCount)
                          );
                        if (channelName === 'rotation_3d_x')
                          setRotX(
                            formatStringToArray(stringValues, frameCount)
                          );
                        if (channelName === 'rotation_3d_y')
                          setRotY(
                            formatStringToArray(stringValues, frameCount)
                          );
                        if (channelName === 'rotation_3d_z')
                          setRotZ(
                            formatStringToArray(stringValues, frameCount)
                          );

                        //
                      });
                    }}
                  >
                    <AiOutlineFunction />
                  </button>
                </>
              )}

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
            <>
              <button
                title="Expand"
                className="btn minimize-btn"
                onClick={() => {
                  setSelectedChannel(channelName);
                }}
              >
                <AiFillCaretDown />
              </button>
            </>
          )}
        </div>
      ) : (
        <div
          className="channel"
          style={{
            height: '2rem',
          }}
        >
          <span>{channelName}</span>
          {/* hide btn */}
          <button
            title="Hide"
            className="btn hide-btn"
            onClick={() => {
              if (isVisible) {
                SetVisibleChannels(
                  VisibleChannels.filter((item) => item !== channelName)
                );
              } else if (!isVisible) {
                SetVisibleChannels([...VisibleChannels, channelName]);
              }
            }}
          >
            <BiShow />
          </button>
        </div>
      )}
    </>
  );
};

export default Channel;
