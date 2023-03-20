import PropTypes from 'prop-types';
import { ImgItem, ListImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, onZoom }) => {
  return image.map(img => {
    return (
      <ImgItem key={img.id}>
        <ListImg
          key={img.id}
          src={img.webformatURL}
          alt={img.webformatURL}
          onClick={() => {
            onZoom(img.largeImageURL);
          }}
        />
      </ImgItem>
    );
  });
};

ImageGalleryItem.propTypes = {
  image: PropTypes.array.isRequired,
};
