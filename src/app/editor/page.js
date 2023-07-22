import React from 'react';
import Timeline from '@/components/Timeline';
import axios from 'axios';
import Editor from '@/components/Editor';
// import getTimeline from '@/utils/getTimeline';

const page = () => {
  // fetch data
  // const data = await getTimeline();

  return (
    <div>
      <Editor data={{ fps: 12, frameCount: 800 }} />
    </div>
  );
};

export default page;
