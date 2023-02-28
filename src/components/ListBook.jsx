import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/ListBook.css';

function ListBook() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/perpustakaan/api/v1/book`,
          {
            params: {
              page: currentPage,
              limit: 20,
            },
          }
        );
        setBooks(response.data.data.data_per_page);
        setTotalPages(response.data.data.total_page);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    };
    fetchBooks();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDetailsClick = (bookId) => {
    
  };

  const handleAddToCartClick = (bookId) => {
    
  };

  const pageNumbersToShow = 5;
  const rangeStart = Math.max(currentPage - Math.floor(pageNumbersToShow / 2), 1);
  const rangeEnd = Math.min(rangeStart + pageNumbersToShow - 1, totalPages);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr className='table'>
            <th>No</th>
            <th className='title'>Title</th>
            <th>Image</th>
            <th className='author'>Author</th>
            <th className='publish_year'>Published year</th>
            <th className='stocks'>Stocks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center">
                <Spinner animation="border" variant="primary" />
              </td>
            </tr>
          ) : (
            books.length > 0 &&
              books.map((book, index) => (
                <tr key={book.id}>
                  <td>{(currentPage - 1) * 20 + index + 1}</td>
                  <td>{book.title}</td>
                  <td><img className='book_image' src={book.image_s}/></td>
                  <td>{book.author}</td>
                  <td>{book.publication_year}</td>
                  <td>{book.stok}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleDetailsClick(book.id)}>Details</Button>
                    {' '}
                    <Button variant="success" onClick={() => handleAddToCartClick(book.id)} disabled={book.stok === 0}>
                    Add to cart
                    </Button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </Table>
      <div className='pagination'>
      <Pagination className='mt-4'>
        {currentPage > 1 && (
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
          />
        )}

        {[...Array(totalPages).keys()].slice(rangeStart - 1, rangeEnd).map((pageNumber) => (
          <Pagination.Item
            key={pageNumber + 1}
            active={pageNumber + 1 === currentPage}
            onClick={() => handlePageChange(pageNumber + 1)}
          >
            {pageNumber + 1}
          </Pagination.Item>
        ))}

        {currentPage < totalPages && (
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
          />
        )}
      </Pagination>
      </div>
    </div>
  );
}

export default ListBook;
