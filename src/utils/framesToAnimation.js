import framesToTime from './framesToTime';

const framesToAnimation = (
  fps,
  frameCount,
  transX,
  transY,
  transZ,
  rotX,
  rotY,
  rotZ
) => {
  // filter arrays to get only active frams
  // let translationX = transX.filter((frame, index) => frame.length === 3);
  // let translationY = transY.filter((frame, index) => frame.length === 3);
  // let translationZ = transZ.filter((frame, index) => frame.length === 3);
  // let rotationX = rotX.filter((frame, index) => frame.length === 3);
  // let rotationY = rotY.filter((frame, index) => frame.length === 3);
  // let rotationZ = rotZ.filter((frame, index) => frame.length === 3);
  let translationX = transX;
  let translationY = transY;
  let translationZ = transZ;
  let rotationX = rotX;
  let rotationY = rotY;
  let rotationZ = rotZ;

  // Find the maximum length among all the arrays
  const maxLength = Math.max(
    translationX.length,
    translationY.length,
    translationZ.length,
    rotationX.length,
    rotationY.length,
    rotationZ.length
  );

  // Function to pad an array with the last value until it reaches the desired length
  const padArray = (arr, length) => {
    if (arr.length >= length) return arr;
    const lastValue = arr[arr.length - 1];
    const padding = new Array(length - arr.length).fill(lastValue);
    return arr.concat(padding);
  };

  // Pad all the arrays to the maximum length
  translationX = padArray(translationX, maxLength);
  translationY = padArray(translationY, maxLength);
  translationZ = padArray(translationZ, maxLength);
  rotationX = padArray(rotationX, maxLength);
  rotationY = padArray(rotationY, maxLength);
  rotationZ = padArray(rotationZ, maxLength);

  // convert time to integer
  const timeToTenthSeconds = (timeStamp) => {
    const [minutes, seconds, milliseconds] = timeStamp.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds + milliseconds / 1000;
    const roundedSeconds = Math.round(totalSeconds * 10) / 10;
    return roundedSeconds;
  };
  const length = timeToTenthSeconds(framesToTime(fps, frameCount));

  //

  // get middle frame value
  const interpolateValue = (previous, current, next) => {
    const [prevFrame, prevValue] = previous;
    const [currentFrame, currentValue] = current;
    const [nextFrame, nextValue] = next;
    // Calculate the percentage distance between the previous and next frames
    const totalFrames = nextFrame - prevFrame;
    const framesPassed = currentFrame - prevFrame;
    const progress = framesPassed / totalFrames;
    // Interpolate the numeric value based on the progress
    const interpolatedValue = prevValue + (nextValue - prevValue) * progress;
    return interpolatedValue;
  };

  //
  //

  // converts inner arreys
  // const convertArray = (arr) => {
  //   const newArr = arr.map((inner, index) => {
  //     const frameTime = timeToTenthSeconds(framesToTime(fps, inner[0]));
  //     return [frameTime, inner[1]];
  //   });
  //   return newArr;
  // };

  // find next anchor frame
  const findAnchor = (index, direction, frames) => {
    let newIndex;
    if (direction === 'next') newIndex = index + 1;
    if (direction === 'prev') newIndex = index - 1;
    if (newIndex < frames.length) {
      if (frames[newIndex].length === 3) {
        return frames[newIndex];
      } else {
        return findAnchor(newIndex, direction, frames);
      }
    }
    return null;
  };
  // populate values on non anchor frames
  const populateNonAnchorFrames = (arr) => {
    const newArr = arr.map((frame, index) => {
      const frameTime = timeToTenthSeconds(framesToTime(fps, frame[0]));
      const isAnchor = frame.length === 3;
      if (isAnchor) {
        return [frameTime, frame[1]];
      } else {
        const nextAnchorFrame = findAnchor(index, 'next', arr);
        const previousAnchorFrame = findAnchor(index, 'prev', arr);
        if (previousAnchorFrame && frame && nextAnchorFrame) {
          return [
            frameTime,
            interpolateValue(previousAnchorFrame, frame, nextAnchorFrame),
          ];
        } else if (previousAnchorFrame && frame && !nextAnchorFrame) {
          return [frameTime, previousAnchorFrame[1]];
        } else {
          return [frameTime, 0];
        }
      }
    });
    return newArr;
  };
  const animationSettings = {
    fps: fps,
    frameCount: frameCount,
    animationLength: length,
    translationX: populateNonAnchorFrames(translationX),
    translationY: populateNonAnchorFrames(translationY),
    translationZ: populateNonAnchorFrames(translationZ),
    rotationX: populateNonAnchorFrames(rotationX),
    rotationY: populateNonAnchorFrames(rotationY),
    rotationZ: populateNonAnchorFrames(rotationZ),
  };
  // const animationSettings = {
  //   fps: fps,
  //   frameCount: frameCount,
  //   animationLength: length,
  //   translationX: convertArray(translationX),
  //   translationY: convertArray(translationY),
  //   translationZ: convertArray(translationZ),
  //   rotationX: convertArray(rotationX),
  //   rotationY: convertArray(rotationY),
  //   rotationZ: convertArray(rotationZ),
  // };
  // console.log(animationSettings);

  return animationSettings;
};
export default framesToAnimation;
