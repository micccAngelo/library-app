import BaseURL from '../API/BaseURL';

export const GetDetailAPI = async (id) => {
  try {
    const response = await BaseURL.get(`/perpustakaan/api/v1/book/${id}`);
    const { data } = response;
    if (data.status && data.message === 'Success') {
      return data.data;
    } else {
      return Promise.reject();
    }
  } catch (error) {
    return Promise.reject();
  }
};

export default GetDetailAPI;
