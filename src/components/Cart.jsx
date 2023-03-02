import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Cart.css';

function Cart({match}) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const {id} = useParams()

  useEffect(() => {
    setLoading(true);
    const fetchCartItems = async () => {
      try {
        const user_id = localStorage.getItem('user_id')
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/perpustakaan/api/v1/cart`,{
            params: {
              "user_id" : user_id,
            },
          }
        );
        console.log(response.data.data)
        setCartItems(response.data.data);

      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [id]);

  const deleteCartItem = async (user_id, book_id) => {
    try {
      const user_id = localStorage.getItem('user_id')
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/perpustakaan/api/v1/cart?user_id=${user_id}&book_id=${book_id}`
      );
      console.log(response.data)
      const newCartItems = cartItems.filter(item => item.id !== book_id);
      setCartItems(newCartItems);
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
                    <Button variant="danger" onClick={() => deleteCartItem(item.user_id, item.id)}>Remove</Button>
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
