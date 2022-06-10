import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items, onClick }) => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem  items={items} onClick={onClick} />
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
