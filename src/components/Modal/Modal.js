import PropTypes from 'prop-types';
import { OverLayModal, ModalImg } from './Modal.styled';

export const Modal = ({ img, onClose }) => {
  return (
    <OverLayModal onClick={onClose}>
      <ModalImg className="modal">
        <img src={img} alt="img" />
      </ModalImg>
    </OverLayModal>
  );
};

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
