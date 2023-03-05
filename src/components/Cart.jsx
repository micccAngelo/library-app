import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Buttons from '../ReusableComponents/Buttons';
import Spinner from 'react-bootstrap/Spinner';
import Modals from '../ReusableComponents/Modals';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteAPI from '../APIService/deleteAPI';
import '../styles/Cart.css';
import GetCartAPI from '../APIService/GetCartAPI';

function Cart({match}) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    GetCartAPI().then(data => {
      setCartItems(data);
      setLoading(false);
    });
  }, []);

  const deleteCartItem = async (user_id, book_id, item) => {
    const success = await DeleteAPI(book_id);
    if (success) {
      const newCartItems = cartItems.filter(item => item.id !== book_id);
      setCartItems(newCartItems);
      setShowModal(true);
      GetCartAPI().then(data => {
        setCartItems(data);
        setLoading(false);
      });
    }
  };
  
  return (
    <div className='cart'>
      <h1 className='cartTitle'>Cart</h1>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {cartItems && cartItems.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className='no'>No</th>
                  <th className='title'>Title</th>
                  <th className='image'>Image</th>
                  <th className='author'>Author</th>
                  <th className='year'>Published year</th>
                  <th className='action'>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td><img className='book_image' alt={item.title} src={item.image_s}/></td>
                    <td>{item.author}</td>
                    <td>{item.publication_year}</td>
                    <td>
                      <Buttons variant='danger' label='Delete' onClick={() => deleteCartItem(item.user_id, item.id)}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center">
              No items in cart
            </div>
          )}
        </>
      )}
      <Modals
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Success!"
        message="Item has been deleted from cart."
      />
    </div>
  );  
}

export default Cart;
