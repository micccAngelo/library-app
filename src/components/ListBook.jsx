import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ListBook.css';

function ListBook() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
        const updatedBooks = response.data.data.data_per_page.map(book => ({
          ...book,
          loading: false
        }));
        setBooks(updatedBooks);
        setTotalPages(response.data.data.total_page);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDetailsClick = (id) => {
    navigate(`/book/${id}`);
  };

  const addToCart = (id) => {
    const user_id = localStorage.getItem('user_id');
    const updatedBooks = books.map(book => {
      if (book.id === id) {
        return {
          ...book,
          loading: true
        };
      }
      return book;
    });
    setBooks(updatedBooks);
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}/perpustakaan/api/v1/cart`,
      {
        "user_id": user_id,
        "book_id": id,
      }
    ).then(() => {
      setShowModal(true);
    }).finally(() =>{
      const updatedBooks = books.map(book => {
        if (book.id === id) {
          return {
            ...book,
            loading: false
          };
        }
        return book;
      });
      setBooks(updatedBooks);
      setShowModal(true);
    });
  };
  
  
  const handleAddToCartClick = (id) => {
    addToCart(id)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
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
                  <td><img className='book_image' src={book.image_s} alt={book.title}/></td>
                  <td>{book.author}</td>
                  <td>{book.publication_year}</td>
                  <td>{book.stok}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleDetailsClick(book.id)}>Details</Button>
                    {' '}
                    <Button variant="success" onClick={() => handleAddToCartClick(book.id)} disabled={book.stok === 0 || book.loading}>
                      {book.loading && <Spinner animation="border" size="sm" />}
                      {!book.loading && 'Add to cart'}
                    </Button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Item has been added to cart.
        </Modal.Body>
      </Modal>
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
