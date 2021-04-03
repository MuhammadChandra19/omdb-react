import { Reducer } from "@app/utils/redux/reducer";
import { Dict, SingleReducer } from "@app/utils/types";
import { IMovie, IMovieDetail, ISearchMovieParams } from "../interfaces";
import { MoviesState } from "./states";
import { SET_MOVIE_LIST, SET_MOVIE_DETAIL, SET_MOVIE_SEARCH, SET_TOTAL } from './actions'

export class MoviesReducer extends Reducer<MoviesState> {
  constructor() {
    super({
      movieList: [],
      movieDetail: {} as IMovieDetail,
      movieSearchParams: {
        s: '',
        page: 0
      },
      total: 0,
    })
  }

  public setMovieList(state: MoviesState, movieList: Array<IMovie>): MoviesState {
    return {
      ...state,
      movieList: movieList
    }
  }

  public setMovieDetail(state: MoviesState, movieDetail: IMovieDetail): MoviesState {
    return {
      ...state,
      movieDetail
    }
  }

  public setMovieSearchParams(state: MoviesState, movieSearchParams: ISearchMovieParams): MoviesState {
    return {
      ...state,
      movieSearchParams
    }
  }

  public setTotals(state: MoviesState, total: number): MoviesState {
    return {
      ...state,
      total
    }
  }

  get actions(): Dict<SingleReducer<MoviesState>> {
    return {
      [SET_MOVIE_LIST]: this.setMovieList,
      [SET_MOVIE_DETAIL]: this.setMovieDetail,
      [SET_MOVIE_SEARCH]: this.setMovieSearchParams,
      [SET_TOTAL]: this.setTotals,
    };
  }

}