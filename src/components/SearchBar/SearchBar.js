import { Component } from 'react';
import PropTypes from 'prop-types';

import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-hot-toast';

import {
  Searchbar,
  SearchForm,
  SearchInput,
  SearchBtn,
} from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  hadleSubmit = evt => {
    evt.preventDefault();
    if (!this.state.value !== '') {
      this.props.onSearch(this.state.value);
      this.setState({ value: '' });
      console.log(this.state.value);
    } else {
      return toast.error('Write something', {});
    }
  };

  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.hadleSubmit}>
          <SearchBtn type="submit">
            <FcSearch size="25px" />
          </SearchBtn>
          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

// export const Searchbar = ({ onAddnewQueryName }) => {
//   const hendleSubmit = (value, { resetForm }) => {
//     if (value.queryName.trim() !== '') {
//       console.log({ ...value });
//       onAddnewQueryName({ ...value });
//       resetForm();
//     } else {
//       toast.error('Please enter a valid image title...');
//     }
//   };
