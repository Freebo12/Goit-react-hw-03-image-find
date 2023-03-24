import { Component } from 'react';
import { getImage } from 'services/getImage';

import { Loader } from 'components/Loader/Loader';
import { BtnLoadMore } from 'components/Button/Button';
import { GalleryList } from '../GalleryList/GalleryList';

export class ImageGallery extends Component {
  state = {
    image: [],
    page: 1,
    error: '',
    status: 'idle',
    searcImage: '',
    imagesOnPage: '',
  };

  componentDidUpdate(prevProps, prevState) {

    const prevName = prevProps.textSearch.trim();
    const nextName = this.props.textSearch.trim();

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });
      this.setState({ page: 1 });
      this.setState({ image: null });

      getImage(nextName, 1)
        .then(response => response.json())
        .then(image => {
          if (image.hits.length !== 0) {
            return this.setState({
              image: [...image.hits],
              status: 'resolved',
              page: 1,
            });
          }
        })
        .catch(
          (error => console.log(error), this.setState({ status: 'pending' }))
        );
    }
  }

  handleLoadMore = (prevState, prevProps) => {
    getImage(this.props.value, this.state.page + 1)
      .then(resp => resp.json())
      .then(image => {
        console.log(image.hits);
        if (image.length !== 0) {
          this.setState(prev => ({
            page: this.state.page + 1,
            image: [...this.state.image, ...image.hits],
          }));
        }
      });
  };

  render() {
    const { status, image,} = this.state;
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
