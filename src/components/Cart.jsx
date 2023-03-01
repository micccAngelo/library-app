import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/perpustakaan/api/v1/cart`
        );
        setCartItems(response.data.data);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const handleRemoveFromCartClick = async (userId, bookId) => {
    try {
      await axios.delete(
        `/perpustakaan/api/v1/cart?user_id=${userId}&book_id=${bookId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className='title'>Cart</h1>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Image</th>
              <th>Author</th>
              <th>Published year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td><img className='book_image' src={item.image_s}/></td>
                  <td>{item.author}</td>
                  <td>{item.publication_year}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveFromCartClick(item.id)}>Remove</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No items in cart</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Cart;
