
import uuid from 'uuid/v4';

class MovieItem {
  nowtilusID?: string;
  imdbID?: string;
  title: string;
  shortSynopsis?: string;
  releaseDate: string;
  studio?: string;
  ratings?: string[][];
  actors?: string[];
  director?: string[];
  writer?: string[];
  genre?: string[];

  constructor() {
    this.nowtilusID = uuid();
  }

  static validate() {

  }
}

export default MovieItem;
