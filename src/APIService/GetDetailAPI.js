import BaseURL from '../API/BaseURL';

export const GetDetailAPI = async (id) => {
  try {
    const response = await BaseURL.get(`/perpustakaan/api/v1/book/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default GetDetailAPI;