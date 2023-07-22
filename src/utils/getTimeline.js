import axios from 'axios';

const getTimeline = async () => {
  const url = process.env.NEXT_PUBLIC_URL;
  const res = await axios.get(`${url}/api/timeline`);
  return res.data;
};

export default getTimeline;
