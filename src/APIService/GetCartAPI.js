import BaseURL from '../API/BaseURL';

export const GetCartAPI = async () => {
  try {
    const user_id = localStorage.getItem('user_id')
    const response = await BaseURL.get(
      `/perpustakaan/api/v1/cart`,{
        params: {
          "user_id" : user_id,
        },
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export default GetCartAPI;