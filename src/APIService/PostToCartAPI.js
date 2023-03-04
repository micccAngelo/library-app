import BaseURL from '../API/BaseURL';

export const PostToCartAPI = async (user_id, book_id) => {
  try {
    await BaseURL.post(
      `/perpustakaan/api/v1/cart`,
      {
        "user_id": user_id,
        "book_id": book_id,
      }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default PostToCartAPI;

