import axios from 'axios';

const KEY = '27177277-8253913f2182577fd0bf27e94';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const key = ({ q, page }) => {
  axios.defaults.params = {
    q,
    page,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
    key: KEY,
   
  };
  return axios.get().then(({ data }) => {
   
    return data;
  });
};