import React from 'react';
import Button from 'react-bootstrap/Button';

const Buttons = ({ variant, label, onClick, href, type, disabled, className }) => {
  return (
    <Button variant={variant} onClick={onClick} href={href} type={type} disabled={disabled} className={className}>
      {label}
    </Button>
  );
};

export default Buttons;
