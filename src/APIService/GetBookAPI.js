import BaseURL from '../API/BaseURL';

export const GetBooksAPI = async (currentPage) => {
  try {
    const response = await BaseURL.get(
      `/perpustakaan/api/v1/book`,
      {
        params: {
          page: currentPage,
          limit: 20,
        },
      }
    );
    const updatedBooks = response.data.data.data_per_page.map(book => ({
      ...book,
      loading: false
    }));
    const totalPages = response.data.data.total_page;
    return { books: updatedBooks, totalPages };
  } catch (error) {
    console.log(error);
    return { books: [], totalPages: 0 };
  } 
};

export default GetBooksAPI;
