import React from 'react';

const Loading = () => {
  return (
    <div className="loading">
      <span>Loading...</span>
      <div className="cube-container">
        <div className="cube">
          <div className="cube-face-1"></div>
          <div className="cube-face-2"></div>
          <div className="cube-face-3"></div>
          <div className="cube-face-4"></div>
          <div className="cube-face-5"></div>
          <div className="cube-face-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
