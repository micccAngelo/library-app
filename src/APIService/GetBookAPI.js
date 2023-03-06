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
    const { data } = response;
    if (data.status && data.message === 'Success') {
      const updatedBooks = data.data.data_per_page.map(book => ({
        ...book,
        loading: false
      }));
      const totalPages = data.data.total_page;
      return { books: updatedBooks, totalPages };
    } else {
      return Promise.resolve();
    }
  } catch (error) {
    console.log(error);
  } 
};

export default GetBooksAPI;
