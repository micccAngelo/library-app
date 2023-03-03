import BaseURL from '../API/BaseURL';

export const GetBookAPI = async (currentPage) => {
  try {
    const response = await BaseURL.get(`/perpustakaan/api/v1/book`, {
      params: {
        page: currentPage,
        limit: 20,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default GetBookAPI;
