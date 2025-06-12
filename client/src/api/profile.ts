import axios from 'axios';

export const upsertProfile = async (token: string, data: any) => {
  return await axios.post('http://localhost:5000/api/profile', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProfile = async (token: string) => {
  return await axios.get('http://localhost:5000/api/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
