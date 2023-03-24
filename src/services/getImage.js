import PropTypes from 'prop-types';

export const getImage = (searchText, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '33175218-249cfa9e0adbf794a9bfb1ae0';

  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchText}&image_type=photo&per_page=12&page=${page}`
  );
};

getImage.propTypes = {
  searchText: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};
