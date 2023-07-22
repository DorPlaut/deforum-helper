import React from 'react';
import Timeline from './Timeline';
import axios from 'axios';
import Editor from './Editor';

const getTimeline = async () => {
  const url = process.env.NEXT_PUBLIC_URL;
  const res = await axios.get(`${url}/api/timeline`);
  return res.data;
};

const page = async () => {
  // fetch data
  const data = await getTimeline();

  return (
    <div>
      <Editor data={data} />
    </div>
  );
};

export default page;
