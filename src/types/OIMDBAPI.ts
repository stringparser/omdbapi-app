import {
  OMDBGetByIdResponseBodyMock,
  OMDBSearchResponseBodyMock,
  OMDBSearchItemResponseBodyMock
} from '../mocks/OMDB';

export type OMDBItemByID = typeof OMDBGetByIdResponseBodyMock;
export type OMDBMovieItem = typeof OMDBSearchItemResponseBodyMock;
export type OMDBSearchResponseBody = typeof OMDBSearchResponseBodyMock;
