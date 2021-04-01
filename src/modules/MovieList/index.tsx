import { movieService } from '@app/domain/movies/services';
import React, { useEffect } from 'react';

const MovieList = () => {

  useEffect(() => {
    movieService.getMovieList({ page: 1, s: 'batman' })
  }, [])
  return (
    <div>
      ini movie list
    </div>
  );
};

export default MovieList;