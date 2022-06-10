import { useState, useEffect } from 'react';
import '../styles/styles.scss';

import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import LoadMoreBtn from './Button/Button';
import Modal from './Modal/Modal';
import Err from './Error/Err';

import { key } from 'key/api';

const App = () => {
  const [image, setImages] = useState({
    isLoading: false,
    error: null,
    data: [],
  });
  const [modal, setModal] = useState({
    modalBody: {},
    isModalOpen: false,
  });

  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');

  /*  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setImages] = useState([]); */

  const onSubmit = input => {
    setImages(prev => ({ ...prev, data: [] }));
    setQ(input);
    setPage(1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const imageSearch = ({ q, page }) => {
    setImages(prevState => ({ ...prevState, isLoading: true, error: null }));

    key({ q, page })
      .then(data => {
        if (!data.hits.length && q) {
          throw new Error('По вашему запросу ничего не найдено');
        }

        setImages(prev => ({
          ...prev,
          data: [...prev.data, ...data.hits],
          isLoading: false,
        }));
        setTotal(data.totalHits);
      })
      .catch(err => {
        console.log(err);
        setImages(prev => ({ ...prev, error: err, isLoading: false }));
      });
  };

  const loadMoreBtn = () => {
    setPage(page => page + 1);
  };

  useEffect(() => {
    if (!q) {
      return;
    }
    imageSearch({ q, page });
  }, [q, page]);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [page]);

  const showModal = modalBody => {
    setModal({
      isModalOpen: true,
      modalBody,
    });
  };

  const closeModal = () => {
    setModal(prevState => {
      return { ...prevState, isModalOpen: false };
    });
  };

  const { modalBody, isModalOpen } = modal;

  const showLoadMoreBtn = total > image.data.length && image.data.length > 0;
  const { error, isLoading, data } = image;
  return (
    <>
      <SearchBar onSubmit={onSubmit} />

      {error && <Err message={error.message} />}

      {isLoading && <Loader />}

      <ImageGallery items={data} onClick={showModal} />

      {!error && showLoadMoreBtn && <LoadMoreBtn handleClick={loadMoreBtn} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <img src={modalBody.largeImageURL} alt={modalBody.tag} width="800" />
        </Modal>
      )}
    </>
  );
};
export default App;
