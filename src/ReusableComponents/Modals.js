import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Modals = ({
  show,
  title,
  message,
  primaryButtonLabel,
  primaryButtonVariant,
  onPrimaryButtonClick,
  secondaryButtonLabel,
  secondaryButtonVariant,
  onSecondaryButtonClick,
  closeButtonLabel,
  onCloseButtonClick,
  ...rest
}) => {
  return (
    <Modal show={show} onHide={onCloseButtonClick} {...rest}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        {secondaryButtonLabel && (
          <Button variant={secondaryButtonVariant} onClick={onSecondaryButtonClick}>
            {secondaryButtonLabel}
          </Button>
        )}
        {primaryButtonLabel && (
          <Button variant={primaryButtonVariant} onClick={onPrimaryButtonClick}>
            {primaryButtonLabel}
          </Button>
        )}
        {closeButtonLabel && (
          <Button variant="secondary" onClick={onCloseButtonClick}>
            {closeButtonLabel}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Modals;
