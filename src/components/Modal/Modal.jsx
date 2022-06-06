import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

const Modal = ({ modalItem, closeModal }) => {
 

  const click = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };
 

  useEffect(() => {
    const esc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', esc);


    return () => window.removeEventListener('keydown', esc);
  }, [closeModal]);

  const { largeImageURL, tags } = modalItem;

  return createPortal(
    <div onClick={click} className="Overlay">
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
