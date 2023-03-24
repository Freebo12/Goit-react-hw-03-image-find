import { Component } from 'react';
import { Toaster } from 'react-hot-toast';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { SectionApp } from './App.styled';
import { Modal } from './Modal/Modal';
import { GlobalStyle } from './GlobalStyle/GlobalStyle';

export class App extends Component {
  state = {
    textSearch: '',
    open: true,
    selectedImage: null,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.KeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.KeyDown);
  }

  handleSubmit = textSearch => {
    this.setState({ textSearch });
  };

  selectImage = imageUrl => {
    this.setState({ selectedImage: imageUrl });
  };

  KeyDown = e => {
    if (e.code === 'Escape') {
      this.setState({ selectedImage: null });
    }
  };

  BackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.setState({ selectedImage: null });
    }
  };

  render() {
    const { textSearch } = this.state;
    return (
      <SectionApp>
        <GlobalStyle />
        <Toaster
          toastOptions={{
            duration: 1500,
            position: 'top-right',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }}
        />
        <SearchBar onSearch={this.handleSubmit} />
        <ImageGallery
          value={this.state.textSearch}
          onZoom={this.selectImage}
          textSearch={textSearch}
        />
        {this.state.selectedImage && (
          <Modal img={this.state.selectedImage} onClose={this.BackdropClick} />
        )}
      </SectionApp>
    );
  }
}
