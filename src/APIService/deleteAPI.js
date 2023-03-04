import BaseURL from '../API/BaseURL';

export const DeleteAPI = async (book_id) => {
  const user_id = localStorage.getItem('user_id')
  try {
    const response = await BaseURL.delete(
      `/perpustakaan/api/v1/cart?user_id=${user_id}&book_id=${book_id}`
    );
    console.log(response.data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default DeleteAPI;
