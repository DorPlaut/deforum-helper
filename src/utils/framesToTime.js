// frames to time (minutes and seconds)
const framesToTime = (fps, frameNumber) => {
  const totalSeconds = Math.floor(frameNumber / fps);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((frameNumber % fps) * (1000 / fps));

  // Format the time values with leading zeros if needed
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMilliseconds = String(milliseconds).padStart(3, '0');

  return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
};

export default framesToTime;
