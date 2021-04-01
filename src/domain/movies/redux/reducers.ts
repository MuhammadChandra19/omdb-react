import { Reducer } from "@app/utils/redux/reducer";
import { Dict, SingleReducer } from "@app/utils/types";
import { IMovie } from "../interfaces";
import { MoviesState } from "./states";

export class MoviesReducer extends Reducer<MoviesState> {
  constructor() {
    super({
      movieList: [],
      movieDetail: {} as IMovie
    })
  }

  public setMovieList(state: MoviesState, list: Array<IMovie>): MoviesState {
    return {
      ...state,
      movieList: [
        ...state.movieList,
        ...list
      ]
    }
  }

  public setMovieDetail(state: MoviesState, movieDetail: IMovie): MoviesState {
    return {
      ...state,
      movieDetail
    }
  }

  get actions(): Dict<SingleReducer<MoviesState>> {
    return {
      [SET_MOVIE_LIST]: this.setMovieList,
      [SET_MOVIE_DETAIL]: this.setMovieDetail
    };
  }

}