import { CommonState } from '@app/domain/common/redux/states';
import { IMovie, ISearchMovieParams } from '@app/domain/movies/interfaces';
import { movieService } from '@app/domain/movies/services';
import { AppState } from '@app/utils/redux/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Input, Button } from 'antd';
import { SET_MOVIE_LIST, SET_SEARCH_FIELD_VISIBILITY } from '@app/domain/movies/redux/actions';
import Spinner from '../common/components/Spinner';
const { Meta } = Card;
const { Search } = Input;


interface IMoveListPage {
  movieList: Array<IMovie>
  common: CommonState
  searchParams: ISearchMovieParams
  totalData: number
}

const MovieList = () => {
  const { common, movieList, searchParams, totalData } = useSelector<AppState, IMoveListPage>(state => ({
    common: state.common,
    movieList: state.moviesState.movieList,
    searchParams: state.moviesState.movieSearchParams,
    totalData: state.moviesState.total
  }))

  const showButtonNextPage = () => {
    return movieList?.length < totalData
      && <Button
        style={{ margin: '10 auto' }}
        loading={common.loading[SET_MOVIE_LIST]}
        type="primary"
        onClick={() => movieService.getMovieList({ ...searchParams, page: searchParams.page += 1 })}
      >
        load more
      </Button>
  }

  useEffect(() => {
    console.log(movieList.length < 1)
  }, [common])
  return (
    <div>
      {
        movieList.length < 1 || (common.visible[SET_SEARCH_FIELD_VISIBILITY] || false)
          ? (<Search onSearch={(val) => movieService.getMovieList({ ...searchParams, s: val })} style={{ width: '100%', margin: '10px auto' }} />) : null
      }
      {
        common.loading[SET_MOVIE_LIST] && (
          <Spinner />
        )
      }
      {
        movieList.length > 0 && (
          <Row gutter={8}>
            {
              movieList.map((movie, idx) => (
                <Col span={12} style={{ marginBottom: 10 }} key={idx}>
                  <Card
                    hoverable
                    style={{ width: '100%' }}
                    cover={<img alt={movie.title} src={movie.poster} style={{ height: 300 }} />}
                  >
                    <Meta
                      title={movie.title}
                      description={movie.year}
                    />
                  </Card>
                </Col>
              ))
            }
          </Row>
        )
      }
      {showButtonNextPage()}
    </div>
  );
};

export default MovieList;