import { useState, useEffect } from 'react';
import '../styles/styles.scss';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import LoadMoreBtn from './Button/Button';
/* import Modal from './Modal/Modal'; */
import Err from './Error/Err';
import ModalProvider from 'contex/ModalProvider';

import { key } from 'key/api';

const App = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = input => {
    setData([]);
    setQ(input);
    setPage(1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const imageSearch = ({ q, page }) => {
    setIsLoading(true);

    key({ q, page })
      .then(data => {
        if (!data.hits.length && q) {
          throw new Error('По вашему запросу ничего не найдено');
        }
        setData(prev => [...prev, ...data.hits]);
        setTotal(data.totalHits);
      })
      .catch(err => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loadMoreBtn = () => {
    setPage(page => page + 1);
  };

  useEffect(() => {
    imageSearch({ q, page });
  }, [page, q]);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  });

  const showLoadMoreBtn = total > data.length && data.length > 0;
  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {error && <Err message={error.message} />}
      {isLoading && <Loader />}
      {!error && (
        <ModalProvider>
          <ImageGallery items={data} />
          {showLoadMoreBtn && <LoadMoreBtn handleClick={loadMoreBtn} />}
        </ModalProvider>
      )}
    </>
  );
};
export default App;
