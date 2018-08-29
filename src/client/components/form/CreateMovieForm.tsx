import camelCaseKeys from 'camelcase-keys';
import formDataToObject from 'form-serialize';
import { Component, createRef, RefObject } from 'react';

import Input from './Input';
import Button from '../../button/Button';
import MovieItem from '../../models/MovieItem';
import FlexLayout from '../layout/FlexLayout';
import OMDBAutoComplete from '../../autocomplete/OMDBAutoComplete';
import { putMovie } from '../../api/OMDBService';

type State = {
  error?: Error;
  values: MovieItem;
};

class CreateMovieForm extends Component<{}, State> {
  private form: RefObject<HTMLFormElement>;

  getInitialState() {
    return {
      values: new MovieItem(),
    };
  }

  constructor(props: object, context: object) {
    super(props, context);

    this.form = createRef<HTMLFormElement>();
    this.state = this.getInitialState();
  }

  onSubmit = (ev: React.SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formEl = this.form.current;
    const isValid = formEl.checkValidity();

    if (isValid) {
      const formData: MovieItem = camelCaseKeys(formDataToObject(formEl, { hash: true }));

      putMovie(formData)
        .then(() => this.setState({ values: new MovieItem() }))
        .catch((error) => this.setState({ error }));

    }
  }

  onSelectTitle = (item: MovieItem) => {
    this.setState({
      values: {
        ...this.state.values,
        ...item
      }
    });
  }

  render() {
    const { values } = this.state;

    return (
      <form
        ref={this.form}
        onSubmit={this.onSubmit}
        acceptCharset="UTF-8"
      >
        <OMDBAutoComplete
          name="title"
          label="Title"
          value={values.title}
          required={true}
          placeholder="Search a movie title"
          onSelectItem={this.onSelectTitle}
        />

        <FlexLayout>
          <Input
            name="imdb-id"
            label="IMDB ID"
            disabled={true}
            defaultValue={values.imdbID}
          />
          <Input
            name="nowtilus-id"
            label="Nowtilus ID"
            disabled={true}
            defaultValue={values.nowtilusID}
          />
        </FlexLayout>

        <FlexLayout>
          <Input
            name="genre"
            label="Genre"
            defaultValue={values.genre}
          />
          <Input
            type="date"
            name="release-date"
            label="Release date"
            required={true}
            defaultValue={values.releaseDate}
          />
        </FlexLayout>

        <FlexLayout>
          <Input
            name="director"
            label="Director"
            defaultValue={values.director}
          />
          <Input
            name="studio"
            label="Studio"
            defaultValue={values.studio}
          />
        </FlexLayout>

        <Input
          name="short-synopsis"
          label="Short Synopsis"
          defaultValue={values.shortSynopsis}
        />

        <Input
          name="writer"
          label="Writer"
          defaultValue={values.writer}
        />

        <Input
          name="actors"
          label="Actors"
          defaultValue={values.actors}
        />

        <h3>Ratings</h3>
        {(values.ratings || []).map((el, index) => {
          return (
            <FlexLayout key={index}>
              <Input
                name={`ratings[${index + 1}][0]`}
                label="Source"
                defaultValue={el[0] || ''}
              />
              <Input
                name={`ratings[${index + 1}][1]`}
                label="Value"
                defaultValue={el[1] || ''}
              />
            </FlexLayout>
          )
        })}

        <FlexLayout>
          <Input
            name={`ratings[0][0]`}
            label="Ratings source"
            defaultValue={values.ratings && values.ratings[0] && values.ratings[0][0] || ''}
          />
          <Input
            name={`ratings[0][1]`}
            label="Ratings value"
            defaultValue={values.ratings && values.ratings[0] && values.ratings[0][1] || ''}
          />
        </FlexLayout>

        <FlexLayout>
          <Button type="submit">
            Save
          </Button>
        </FlexLayout>
      </form>
    )
  }
}

export default CreateMovieForm;
