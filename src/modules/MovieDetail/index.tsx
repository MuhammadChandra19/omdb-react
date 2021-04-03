import { CommonState } from '@app/domain/common/redux/states';
import { IMovieDetail } from '@app/domain/movies/interfaces';
import { SET_MOVIE_DETAIL } from '@app/domain/movies/redux/actions';
import { AppState } from '@app/utils/redux/store';
// import { Rate } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../common/components/Spinner';
import { RouteComponentProps } from 'react-router';
import { movieService } from '@app/domain/movies/services';
import './moviedetail.scss'
import { StarTwoTone } from '@ant-design/icons';
import { Empty } from 'antd';

interface Props extends RouteComponentProps<{ imdbId: string }> { }

interface IMovieDetailPage {
  movieDetail: IMovieDetail
  common: CommonState
}
const MovieDetail: React.FC<Props> = (props) => {
  const { movieDetail, common } = useSelector<AppState, IMovieDetailPage>(state => ({
    movieDetail: state.moviesState.movieDetail,
    common: state.common
  }))

  useEffect(() => {
    const id = props.match.params.imdbId
    movieService.getMovieDetails(id)
  }, [])

  return (
    <div className="movie-details">
      {
        common.loading[SET_MOVIE_DETAIL] && <Spinner />
      }
      {
        Object.keys(movieDetail).length > 0 && (
          <React.Fragment>
            <div className="movie-details--poster" style={{ backgroundImage: `url(${movieDetail.poster})` }}>
              <div className="movie-details--poster-title">
                <div>
                  <h2 style={{ margin: 'auto 0px' }}>{movieDetail.title}</h2>
                </div>
                <div style={{ display: 'flex' }}>
                  <StarTwoTone twoToneColor="#E4BC22" style={{ margin: 'auto' }} />
                  <h1 style={{ margin: 'auto' }}>{movieDetail.imdbRating}</h1>
                </div>
              </div>
              <div className="movie-details--poster-plot">
                <h4 >{movieDetail.plot}</h4>
              </div>
            </div>
            <div className="movie-details--info">
              <span>{movieDetail.rated} <b>|</b> {movieDetail.runtime} <b>|</b> {movieDetail.genre}</span>
              <h4><b>Director:</b> {movieDetail.director}</h4>
              <h4><b>Writer:</b> {movieDetail.writer}</h4>
              <h4><b>Actors:</b> {movieDetail.actors}</h4>
            </div>
          </React.Fragment>
        )
      }
      {
        !common.loading[SET_MOVIE_DETAIL] && Object.keys(movieDetail).length === 0 && (<Empty />)
      }
    </div>
  );
};

export default MovieDetail;