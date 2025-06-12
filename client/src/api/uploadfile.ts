import axios from 'axios';

export const uploadImage = async (token: string, form: any) => {
  return await axios.post(
    'http://localhost:5000/api/cloudinary',
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
