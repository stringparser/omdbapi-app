export const putMovieRoute = () =>
  '/api/movies'
;

export const getMovieByIdRoute = (id: string = ':id') =>
  '/api/movies/' + id
;

export const getMoviesByTitleRoute = (query: string = '') =>
  `/api/search/movies${query ? `?q=${query}` : ''}`
;
