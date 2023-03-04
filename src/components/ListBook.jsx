import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import GetBooksAPI from '../APIService/GetBookAPI';
import PostToCartAPI from '../APIService/PostToCartAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ListBook.css';
import BaseURL from '../API/BaseURL'

function ListBook({isLoggedIn}) {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalFail, setModalFail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      const { books, totalPages } = await GetBooksAPI(currentPage);
      setBooks(books);
      setTotalPages(totalPages);
      setLoading(false);
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
  
    const isBookInCart = updatedBooks.find(book => book.id === id)?.is_in_cart;
    if (isBookInCart) {
      setModalFail(true);
      setBooks(prevBooks => {
        const updatedBooks = prevBooks.map(book => {
          if (book.id === id) {
            return {
              ...book,
              loading: false
            };
          }
          return book;
        });
        return updatedBooks;
      });
      return;
    }
  
    return PostToCartAPI(user_id, id).then(() => {
      setShowModal(true);
      setBooks(prevBooks => {
        const updatedBooks = prevBooks.map(book => {
          if (book.id === id) {
            return {
              ...book,
              loading: false,
              is_in_cart: true
            };
          }
          return book;
        });
        return updatedBooks;
      });
    }).catch(error => {
      console.log(error);
    });
  };
  
  const user_id = localStorage.getItem("user_id")
  const handleAddToCartClick = (id) => {
    if(user_id){
      addToCart(id)
    }
    else{
      navigate('/login')
    }
  };
  
  const rangeStart = Math.max(currentPage - 2, 1);
  const rangeEnd = Math.min(rangeStart + 4, totalPages);
 
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
            <th className='action'>Action</th>
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
                    <Button className='detail' variant="primary" onClick={() => handleDetailsClick(book.id)}>Details</Button>
                    <Button className='add' variant="success" onClick={() => handleAddToCartClick(book.id)} disabled={book.stok === 0 || book.loading}>
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
      <Modal show={modalFail} onHide={() => setModalFail(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Failed!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Item is already in cart.
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
