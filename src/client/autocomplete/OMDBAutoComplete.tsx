import styled from 'styled-components';
import { Component } from 'react';

import Input from '../components/form/Input';
import MovieItem from '../models/MovieItem';
import { zIndex } from '../components/theme';
import { InputProps } from '../components/form/Input';
import { OMDBMovieItem } from '../../types/OIMDBAPI';
import { getMovieByID, getMoviesByTitle } from '../api/OMDBService';

const AutoComplete = styled.div`
  position: relative;
  z-index: ${zIndex.dropdown};
`;

const AutoCompleteList = styled.ul`
  top: 100%;
  left: 0;
  right: 0;
  position: absolute;

  margin: -1px 0 0 0;
  padding: 0;
  list-style-type: none;
`;

const AutoCompleteListItem = styled.li`
  cursor: pointer;

  margin: 0;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 0.5rem 1rem;
  background-color: white;

  &:not(:last-child) {
    border-bottom: none;
  }

  &:hover {
    color: white;
    background-color: grey;
  }
`;

type Props = InputProps & {
  onSelectItem: (item: MovieItem) => void;
};

type State = {
  results?: OMDBMovieItem[];
  inputValue?: string;
};

class OMDBAutoComplete extends Component<Props, State> {
  state: State = {
    results: [],
    inputValue: '',
  };

  private timer: number;

  onChange = (ev: React.SyntheticEvent<HTMLInputElement>) => {
    const inputValue = ev.currentTarget.value;

    this.setState({ inputValue });

    clearTimeout(this.timer);

    this.timer = window.setTimeout(async () => {
      const results = await getMoviesByTitle(inputValue);

      this.setState({
        results: results.body.Search,
      });
    }, 500);
  }

  onClickItem = (el: OMDBMovieItem) => async () => {
    const response = await getMovieByID(el.imdbID);
    const movieItem = response.body;

    this.props.onSelectItem(movieItem);

    this.setState({
      results: [],
      inputValue: movieItem.title,
    });
  }

  render() {
    const { onSelect, ...props } = this.props;
    const { results = [], inputValue } = this.state;

    return (
      <AutoComplete>
        <Input {...props}
          type="text"
          value={inputValue}
          onChange={this.onChange}
        />
        <AutoCompleteList>
          {results.map((el, index) =>
            <AutoCompleteListItem
              key={index}
              onClick={this.onClickItem(el)}
            >
              {el.Year} - {el.Title}
            </AutoCompleteListItem>
          )}
        </AutoCompleteList>
      </AutoComplete>
    )
  }
}

export default OMDBAutoComplete;
