import PropTypes from 'prop-types';

const ImageGalleryItem = ({ items, onClick}) => {
  const elements = items.map(({ id, webformatURL, largeImageURL, tag }) => {
    
  return (
    <li key ={id} onClick={() => onClick({ largeImageURL, tag })} className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tag} />
    </li>
  );
})
return elements;
}
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
