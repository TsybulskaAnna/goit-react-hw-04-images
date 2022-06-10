import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

const Modal = ({ children, onClose }) => {
  const click = useCallback(
    e => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const esc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', esc);

    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  return createPortal(
    <div onClick={click} className="Overlay">
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
