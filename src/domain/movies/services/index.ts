import { BaseService } from "@app/domain/common/services/base.service";
import { baseApi } from '@app/utils/api/baseApi'
import { history } from "@app/utils/redux/store";
import { IMovieList, IMovie, ISearchMovieParams } from "../interfaces";
import { SET_IS_VIEW_MOVIE_DETAIL, SET_MOVIE_DETAIL, SET_MOVIE_LIST, SET_MOVIE_SEARCH, SET_SEARCH_FIELD_VISIBILITY, SET_TOTAL } from "../redux/actions";

const API_KEY: string = 'faf7e5bb'

class MoviesService extends BaseService {
  private api: <T>(data: any) => Promise<T>
  constructor() {
    super()
    this.api = baseApi().makeRequest
  }

  public async getMovieList(title?: string): Promise<void> {
    try {

      const { moviesState: { movieList, movieSearchParams } } = this.getState()
      const sameTitle = movieSearchParams.s === title
      const makeParams: ISearchMovieParams = {
        page: sameTitle ? movieSearchParams.page += 1 : 1,
        s: sameTitle ? movieSearchParams.s : title
      }
      this.setLoading(SET_MOVIE_LIST, true)
      const { search, totalResults } = await this.api<IMovieList>({ apikey: API_KEY, ...makeParams })
      this.dispatch(SET_TOTAL, parseInt(totalResults))


      // const sameTitle = movieSearchParams.s === makeParams.s

      this.dispatch(SET_MOVIE_LIST, sameTitle ? [...movieList, ...search] : search)
      this.dispatch(SET_MOVIE_SEARCH, makeParams)

    } catch (e) {
      throw e
    } finally {
      this.setLoading(SET_MOVIE_LIST, false)
    }
  }

  public async getMovieDetails(title: string): Promise<void> {
    try {
      this.dispatch(SET_MOVIE_DETAIL, {})
      this.setVisible(SET_IS_VIEW_MOVIE_DETAIL, true)
      this.setLoading(SET_MOVIE_DETAIL, true)
      const movie = await this.api<IMovie>({ t: title, apikey: API_KEY })
      this.dispatch(SET_MOVIE_DETAIL, movie)

    } catch (e) {
      throw e
    } finally {
      this.setLoading(SET_MOVIE_DETAIL, false)
    }
  }

  public setSearchFieldVisibility(isVisible: boolean): void {
    this.setVisible(SET_SEARCH_FIELD_VISIBILITY, isVisible)
  }

  public goBackToMovieList(): void {
    this.setVisible(SET_IS_VIEW_MOVIE_DETAIL, false)
    history.goBack()
  }


}

export const movieService = new MoviesService()
