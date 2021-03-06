import { CommonState } from '@app/domain/common/redux/states';
import { IMovie, ISearchMovieParams } from '@app/domain/movies/interfaces';
import { movieService } from '@app/domain/movies/services';
import { AppState, history } from '@app/utils/redux/store';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Input } from 'antd';
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

  const stateRefParams = useRef<ISearchMovieParams>()
  stateRefParams.current = searchParams //keep reference from closed callback

  const handleScroll = () => {
    var lastCard = document.querySelector('div.ant-row > .ant-col:last-child')
    if (lastCard !== null && lastCard instanceof HTMLElement) {
      var lastCardOffset = lastCard.offsetTop + lastCard.clientHeight;
      var pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastCardOffset) {
        movieService.getMovieList(stateRefParams.current.s)
      }
    }

  }
  useEffect(() => {
    window.addEventListener('scroll', () => {
      handleScroll()
    })
  }, [])
  return (
    <div>
      {
        movieList.length < 1 || (common.visible[SET_SEARCH_FIELD_VISIBILITY] || false)
          ? (
            <Search
              onSearch={(val) => movieService.getMovieList(val)}
              style={{ width: '100%', margin: '10px auto' }}
              data-testid="search-movie"
            />
          ) : null
      }
      {
        common.loading[SET_MOVIE_LIST] && searchParams.page < 2 && (
          <Spinner />
        )
      }
      {
        movieList.length > 0 && (
          <div>
            <Row gutter={8} style={{ marginBottom: 5 }}>
              {
                movieList.map((movie, idx) => (
                  <Col span={12} style={{ marginBottom: 10 }} key={idx}>
                    <Card
                      data-testid={`movie-idx-${idx}`}
                      hoverable
                      onClick={() => history.push(`details/${movie.title}`)}
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
            {
              common.loading[SET_MOVIE_LIST] && searchParams.page > 1 && movieList.length < totalData && (
                <Spinner />
              )
            }
          </div>
        )
      }
      {/* {showButtonNextPage()} */}
    </div>
  );
};

export default MovieList;