import BaseURL from '../API/BaseURL';

export const GetDetailAPI = async (id) => {
  try {
    const response = await BaseURL.get(`/perpustakaan/api/v1/book/${id}`);
    const { data } = response;
    if (data.status && data.message === 'Success') {
      return data.data;
    } else {
      console.log("Failed to get book detail");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default GetDetailAPI;
