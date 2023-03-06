import BaseURL from '../API/BaseURL';

export const DeleteAPI = async (book_id) => {
  const user_id = localStorage.getItem('user_id');
  try {
    const response = await BaseURL.delete(
      `/perpustakaan/api/v1/cart?user_id=${user_id}&book_id=${book_id}`
    );
    const { data } = response;
    if (data.status && data.message === 'Success') {
      console.log(data.message);
      return true;
    } else {
      console.log(data.message || "Failed to delete book from cart");
    }
  } catch (error) {
    console.log(error);
    console.log("Failed to delete book from cart");
  }
};

export default DeleteAPI;
