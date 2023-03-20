import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryListStyle } from './GalleryList.styled';

export const GalleryList = ({ image, onZoom }) => {
  return (
    <GalleryListStyle>
      <ImageGalleryItem image={image} onZoom={onZoom} />
    </GalleryListStyle>
  );
};
GalleryList.propTypes = {
  image: PropTypes.array.isRequired,
  onZoom: PropTypes.func.isRequired,
};
