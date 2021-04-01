import { BaseService } from "@app/domain/common/services/base.service";
import { baseApi } from '@app/utils/api/baseApi'
import { ISearchMovieParams, IMovieList, IMovie } from "../interfaces";

const API_KEY: string = 'faf7e5bb'

class MoviesService extends BaseService {
  private api: <T>(data: any) => Promise<T>
  constructor() {
    super()
    this.api = baseApi().makeRequest
  }

  public async getMovieList(query: ISearchMovieParams): Promise<void> {
    try {
      this.setLoading(SET_MOVIE_LIST, true)
      const { search } = await this.api<IMovieList>({ apikey: API_KEY, ...query })
      this.dispatch(SET_MOVIE_LIST, search)
      this.setLoading(SET_MOVIE_LIST, false)
    } catch (e) {
      throw e
    }
  }

  public async getMovieDetails(title: string): Promise<void> {
    try {
      this.setLoading(SET_MOVIE_DETAIL, true)
      const movie = await this.api<IMovie>({ apikey: API_KEY, t: title })
      this.dispatch(SET_MOVIE_DETAIL, movie)
      this.setLoading(SET_MOVIE_DETAIL, false)
    } catch (e) {
      throw e
    }
  }


}

export const movieService = new MoviesService()
