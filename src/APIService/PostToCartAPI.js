import BaseURL from '../API/BaseURL';

export const PostToCartAPI = async (user_id, book_id) => {
  try {
    const response = await BaseURL.post(
      `/perpustakaan/api/v1/cart`,
      {
        "user_id": user_id,
        "book_id": book_id,
      }
    );
    const { data } = response;
    if (data.status && data.code === 200) {
      return true;
    } else {
      throw new Error(data.message || "Failed to add book to cart");
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default PostToCartAPI;
