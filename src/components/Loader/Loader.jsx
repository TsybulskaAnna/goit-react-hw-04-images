import { BarLoader } from 'react-spinner-animated';

const Loader = () => {
  return (
    <BarLoader
      text={'Loading...'}
      center={true}
      width={'150px'}
      height={'150px'}
    />
  );
};

export default Loader;
