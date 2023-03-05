import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loadings = ({ variant = 'primary' }) => {
  return (
    <div className="text-center">
      <Spinner animation="border" variant={variant} />
    </div>
  );
};

export default Loadings;
