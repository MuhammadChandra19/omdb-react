import { IMovie } from "../interfaces";

export interface MoviesState {
  movieList: Array<IMovie>
  movieDetail: IMovie
}