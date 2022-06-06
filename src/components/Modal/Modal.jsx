import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

const Modal = ({ modalItem, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', Esc);

    return () => window.removeEventListener('keydown', Esc);
  }, []);

  const Click = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };
  const Esc = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const { largeImageURL, tags } = modalItem;

  return createPortal(
    <div onClick={Click} className="Overlay">
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
