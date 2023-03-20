import PropTypes from 'prop-types';
import { BtnLoad } from './Button.styled';

export const BtnLoadMore = ({ onLoadMore }) => {
  return (
    <BtnLoad type="button" onClick={onLoadMore}>
      LoadMore
    </BtnLoad>
  );
};

BtnLoadMore.propTypes = { onLoadMore: PropTypes.func.isRequired };
