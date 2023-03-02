import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/BookDetail.css';

const BookDetail = ({ match }) => {
  const [book, setBook] = useState(null);
  const {id} = useParams()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/perpustakaan/api/v1/book/${id}`
        );
        console.log(response.data.data)
        setBook(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(id)
    fetchBook();
  }, [id]);

  if(!book){
    return(
        <div colSpan="7" className="text-center">
        <Spinner animation="border" variant="primary" />
        </div>
    );
  }

  return (
    <Card className="card">
      <Card.Img className="card_img" variant="top" src={book[0].image_s}/>
      <Card.Body>
        <Card.Title>{book[0].title}</Card.Title>
        <Card.Text>
          Author: {book[0].author} <br />
          Publisher: {book[0].publisher} <br />
          Publication year: {book[0].publication_year} <br />
          ISBN: {book[0].isbn} <br />
        </Card.Text>
        <div className="buttons">
            <Button className="back" href="/book" variant="primary">Back</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookDetail;
