import axios from 'axios';

export const createCamping = async (token: string, data: any) => {
  return await axios.post('http://localhost:5000/api/camping', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listCamping = async () => await axios.get('http://localhost:5000/api/camping');