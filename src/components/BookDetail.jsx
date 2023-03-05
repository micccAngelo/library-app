import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import GetDetailAPI from '../APIService/GetDetailAPI';
import '../styles/BookDetail.css';
import Buttons from '../ReusableComponents/Buttons';

const BookDetail = ({ match }) => {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      const bookData = await GetDetailAPI(id);
      setBook(bookData);
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return (
      <div colSpan='7' className='text-center'>
        <Spinner animation='border' variant='primary' />
      </div>
    );
  }

  return (
    <Card className='card'>
      <Card.Img className='card_img' variant='top' src={book[0].image_s} />
      <Card.Body>
        <Card.Title>{book[0].title}</Card.Title>
        <Card.Text>
          Author: {book[0].author} <br />
          Publisher: {book[0].publisher} <br />
          Publication year: {book[0].publication_year} <br />
          ISBN: {book[0].isbn} <br />
        </Card.Text>
        <div className='buttons'>
          <Buttons variant='primary' label='Back' href={'/'}/>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookDetail;
