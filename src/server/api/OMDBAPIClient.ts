import fetch, { Response } from 'node-fetch';

import { OMDBSearchResponseBody } from '../../types/OIMDBAPI';
import { OIMDBAPI_KEY, OMDBAPI_ENDPOINT } from '../env';

type ClientResponse = {
  res?: Response;
  body?: OMDBSearchResponseBody;
  error?: Error;
  status: number;
};

export async function request(query: string, options?: object): Promise<ClientResponse> {
  if (query.trim().length === 0) {
    return { status: 200 };
  }

  const res = await fetch(`${OMDBAPI_ENDPOINT}?apikey=${OIMDBAPI_KEY}&${query}`, options);

  try {
    const body = await res.json();
    return { res, body, status: 200 };
  } catch (error) {
    return { res, error, status: 422 };
  }
}

export const getMovieByID = (id: string) => {
  return request(`i=${id}`);
}

export const getMoviesByTitle = (query: string) => {
  return request(`s=${query}`);
}
