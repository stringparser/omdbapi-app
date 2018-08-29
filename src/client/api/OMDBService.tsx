import { OMDBSearchResponseBody, OMDBItemByID } from '../../types/OIMDBAPI';
import { getMovieByIdRoute, getMoviesByTitleRoute, putMovieRoute } from './routes';

import MovieItem from '../models/MovieItem';

function mapToMovieItem(body: OMDBItemByID): MovieItem {
  return  {
    title: body.Title,
    genre: (body.Genre || '').split(','),
    imdbID: body.imdbID,
    actors: (body.Actors || '').split(','),
    studio: body.Production,
    ratings: body.Ratings.map(el => [el.Source, el.Value]),
    director: (body.Director || '').split(','),
    releaseDate: body.Released
      ? new Date(body.Released).toISOString().slice(0, 10)
      : undefined,
    shortSynopsis: body.Plot,
  };
}

type GetMovieByIDResponse = {
  res: Response;
  body?: MovieItem;
  error?: Error;
};

export async function getMovieByID(id: string): Promise<GetMovieByIDResponse> {
  const res = await fetch(getMovieByIdRoute(id));

  try {
    const body: OMDBItemByID = await res.json();
    return { res, body: mapToMovieItem(body) };
  } catch (error) {
    return { res, error };
  }
}

type SearchResponse = {
  res: Response;
  body?: OMDBSearchResponseBody;
  error?: Error;
};

export async function getMoviesByTitle(query: string): Promise<SearchResponse> {
  const res = await fetch(getMoviesByTitleRoute(query));

  try {
    const body: OMDBSearchResponseBody = await res.json();
    return { res, body };
  } catch(error) {
    return { res, error };
  }
}

export async function putMovie(movieItem: MovieItem) {
  try {
    const res = await fetch(putMovieRoute(), {
      method: 'PUT',
      body: JSON.stringify(movieItem),
    });
    const body = await res.json();
    return { res, body };
  } catch(error) {
    return { error };
  }
}
