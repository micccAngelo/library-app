import React, { useState } from 'react';
import PostToCartAPI from '../APIService/PostToCartAPI';

function ButtonAddToCart(props) {
  const [loading, setLoading] = useState(false);

  const addToCart = (id) => {
    setLoading(true);
    const user_id = localStorage.getItem('user_id');
    return PostToCartAPI(user_id, id)
      .then(() => {
        setLoading(false);
        props.onAddToCartSuccess();
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleClick = () => {
    addToCart(props.id);
  };

  return (
    <button className="btn btn-primary" onClick={handleClick} disabled={loading}>
      {loading ? 'Loading...' : 'Add to cart'}
    </button>
  );
}

export default ButtonAddToCart;
