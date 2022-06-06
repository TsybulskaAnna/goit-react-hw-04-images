import PropTypes from 'prop-types';
import { useModalContext } from '../../contex/ModalProvider'

const ImageGalleryItem = ({ item }) => {
  const openModal = useModalContext();

  const { tags, webformatURL } = item;
  return (
    <li onClick={() => openModal(item)} className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
