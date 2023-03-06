import BaseURL from '../API/BaseURL';

export const PostToCartAPI = async (user_id, book_id, setModalFail, setShowModal) => {
  try {
    const response = await BaseURL.post(
      `/perpustakaan/api/v1/cart`,
      {
        "user_id": user_id,
        "book_id": book_id,
      }
    );
    const { data } = response;
    console.log(data)
    if (data.status === true && data.code === 200) {
      if (data.message === 'Data cart Created') {
        setShowModal(true);
        return true;
      } else {
        setModalFail(true);
        throw new Error(data.message || "Failed to add book to cart");
      }
    } 
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default PostToCartAPI;
