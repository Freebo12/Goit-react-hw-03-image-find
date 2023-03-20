import { Component } from 'react';
import { getImage } from 'services/getImage';
import PropTypes from 'prop-types';

import { Loader } from 'components/Loader/Loader';
import { BtnLoadMore } from 'components/Button/Button';
import { GalleryList } from '../GalleryList/GalleryList';

export class ImageGallery extends Component {
  state = {
    image: [],
    page: 1,
    error: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.value !== this.props.value ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'reject' });
      getImage(this.props.value, this.state.page)
        .then(response => response.json())
        .then(image => {
          this.setState({
            image: [...this.state.image, ...image.hits],
            status: 'resolved',
          });
        })
        .catch(
          (error => console.log(error), this.setState({ status: 'pending' }))
        );
    }
  }

  handleLoadMore = e => {
    this.setState(prev => ({ page: prev.page + 1 }));
    // if (this.status !== 'resolved') {
    //   console.log('test');
    //   window.scrollTo(0, 0);
    //    e.preventDefault();
    //    e.stopPropagation();
    // }
  };

  

  render() {
    const { status, image } = this.state;
    const { onZoom } = this.props;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved') {
      return (
        <>
          <GalleryList image={image} onZoom={onZoom} />
          <BtnLoadMore onLoadMore={this.handleLoadMore} />
        </>
      );
    }

    if (status === 'rejected') {
    }
  }
}

ImageGallery.prorTypes = {
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onZoom: PropTypes.func.isRequired,
};
