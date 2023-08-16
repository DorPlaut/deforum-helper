const formatStringToArray = (string, frameCount) => {
  const formattedArray = string.split(',').map((item) => {
    const innerArraay = item.trim().split(':');
    const frame = parseInt(innerArraay[0]);
    const value = parseFloat(
      innerArraay[1].slice(1, innerArraay[1].length - 1)
    );
    return [frame, value, true];
  });
  //
  const newArr = [];
  for (let i = 0; i <= frameCount; i++) {
    const frameData = formattedArray.find((frame) => frame[0] === i);
    if (frameData) {
      newArr.push(frameData);
    } else {
      newArr.push([i, 0]);
    }
  }

  return newArr;
};
export default formatStringToArray;
