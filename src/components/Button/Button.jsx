import PropTypes from 'prop-types';

const LoadMoreBtn = ({ handleClick }) => {
    return (
      <button onClick={handleClick} className="Button" type="button">
        Load more
      </button>
    );
  };
  
  export default LoadMoreBtn;
  LoadMoreBtn.propTypes = {
    handleClick: PropTypes.func.isRequired,
  };