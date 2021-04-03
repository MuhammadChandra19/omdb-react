import { IMovie, IMovieDetail, ISearchMovieParams } from "../interfaces";

export interface MoviesState {
  movieList: Array<IMovie>
  movieDetail: IMovieDetail
  movieSearchParams: ISearchMovieParams
  total: number
}