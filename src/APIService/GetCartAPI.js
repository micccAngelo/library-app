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
    
    if (response.status === 200 && response.data.message === "Success") {
      console.log(response.data.data);
      return response.data.data;
    } else {
      throw new Error("Failed to get cart items");
    }
  } catch (error) {
    console.log(error);
  }
};

export default GetCartAPI;
