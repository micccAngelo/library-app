import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Loadings from '../ReusableComponents/Loadings';
import GetDetailAPI from '../APIService/GetDetailAPI';
import '../styles/BookDetail.css';
import Buttons from '../ReusableComponents/Buttons';

const BookDetail = ({ match }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const bookData = await GetDetailAPI(id);
        setBook(bookData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
    };
  }
    fetchBook();
  }, [id]);

  if (loading) { 
    return (
      <Loadings variant="danger" />
    );
  }

  return (
    <div>
      {book ? (
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
      ) : (
        <div className='bookunavailable' style={{ textAlign: 'center' }}>
          <h1>There is no book with that ID</h1>
        </div>
      )}
    </div>
  );
  
};

export default BookDetail;
