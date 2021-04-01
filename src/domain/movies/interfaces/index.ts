export interface IMovieList {
  search: Array<IMovie>
}

export interface IMovie {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
}

export interface IMovieDetail extends IMovie {
  rated: string
  released: string
  runtime: string
  genre: string
  director: string;
  writer: string;
  actors: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
  ratings: Array<IRatings>;
  metaScore: string;
  imdbRating: string;
  imdbVotes: string;
  dvd: string;
  boxOffice: string;
  production: string;
  webstite: string;
}

export interface IRatings {
  source: string;
  value: string;
}

export interface ISearchMovieParams {
  s: string;
  page: string
}