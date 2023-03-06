import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Buttons from '../ReusableComponents/Buttons';
import Modals from '../ReusableComponents/Modals';
import GetBooksAPI from '../APIService/GetBookAPI';
import PostToCartAPI from '../APIService/PostToCartAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ListBook.css';
import Loadings from '../ReusableComponents/Loadings';

function ListBook() {
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

  const ButtonAddToCart = (props) => {
    const [loading, setLoading] = useState(false);
  
    const addToCart = (id) => {
      setLoading(true);
      const user_id = localStorage.getItem('user_id');
    
      PostToCartAPI(user_id, id)
      .then((success) => {
        if (success) {
          setShowModal(true);
        } else {
          setModalFail(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setModalFail(true);
        setLoading(false);
      });
    };    
    
    return (
      <Buttons
        className="add"
        variant="success"
        onClick={() => addToCart(props.book.id)}
        disabled={props.book.stok === 0 || loading}
        label={loading ? <Loadings variant="danger" /> : 'Add to cart'}
      />
    );
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
              <td colSpan="7" style={{ textAlign: 'center' }}>
                <Loadings variant="danger" />
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
                    <Buttons className='detail' variant='primary' label='Details' onClick={() => handleDetailsClick(book.id)}/>
                    <ButtonAddToCart book={book}/>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </Table>
      <Modals
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Success!"
        message="Item has been added to cart."
      />
      <Modals
        show={modalFail}
        onHide={() => setModalFail(false)}
        title="Failed!"
        message="Item is already in cart."
      />
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
