import { IMovie, ISearchMovieParams } from "../interfaces";

export interface MoviesState {
  movieList: Array<IMovie>
  movieDetail: IMovie
  movieSearchParams: ISearchMovieParams
  total: number
}