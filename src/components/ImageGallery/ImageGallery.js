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
    const { page, imagesOnPage } = this.state;

    const prevName = prevProps.textSearch.trim();
    const nextName = this.props.textSearch.trim();

    const prevPage = prevState.page;
    const newPage = this.state.page;
    if (prevName !== nextName) {
      this.setState({ status: 'pending' });
      this.setState({ page: 1 });

      getImage(nextName, page, imagesOnPage)
        .then(response => response.json())
        .then(image => {
          this.setState({
            image: [...image.hits],
            status: 'resolved',
          });
        })
        .catch(
          (error => console.log(error), this.setState({ status: 'pending' }))
        );
    }
    if (prevPage !== newPage && newPage !== '') {
      getImage(nextName, page, imagesOnPage)
        .then(response => response.json())
        .then(image => {
          this.setState(prevState => ({
            image: [...prevState.image, ...image.hits],
            status: 'resolved',
          }));
        })

        .catch(
          (error => console.log(error), this.setState({ status: 'pending' }))
        );
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
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
