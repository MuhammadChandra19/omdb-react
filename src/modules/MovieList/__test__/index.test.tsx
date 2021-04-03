
import { history } from '@app/utils/redux/store';
import { render, cleanup, fireEvent, waitFor } from '@app/utils/test/test-utils';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import React from 'react';
// import { debug } from 'webpack';

import MovieList from '../index'

const server = setupServer(
  rest.get('http://www.omdbapi.com?s=batman', (req, res, ctx) => {
    return res(ctx.json({
      "Search": [
        {
          "Title": "Casey at the Bat",
          "Year": "1946",
          "imdbID": "tt0038399",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMTU1MTc5MDg3OV5BMl5BanBnXkFtZTcwMDI1NTQzMQ@@._V1_SX300.jpg"
        },
        {
          "Title": "Classic Albums: Meat Loaf - Bat Out of Hell",
          "Year": "1999",
          "imdbID": "tt0235298",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMTg0OTI5NzAxNV5BMl5BanBnXkFtZTcwMzE2MTAzMQ@@._V1_SX300.jpg"
        },
        {
          "Title": "The Bat Man of Shanghai",
          "Year": "2012",
          "imdbID": "tt2273962",
          "Type": "series",
          "Poster": "https://m.media-amazon.com/images/M/MV5BNDNhYmFjZGQtNjE3ZC00N2VmLWI0MWItODkxMmE2MWNiM2M5XkEyXkFqcGdeQXVyNzU1OTYxNzU@._V1_SX300.jpg"
        },
        {
          "Title": "The Golden Bat",
          "Year": "1966",
          "imdbID": "tt0167320",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BNWJhZDRjZTctMGU5MC00OGMzLThiZTYtNjllZmUwNzNjOWM1XkEyXkFqcGdeQXVyMjExMzEyNTM@._V1_SX300.jpg"
        },
        {
          "Title": "The Sea Bat",
          "Year": "1930",
          "imdbID": "tt0021345",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BM2JmYjU3ODYtZWFhOS00ZWFhLWIwMWQtMWZmYTgyM2MwNjUxXkEyXkFqcGdeQXVyNDAzOTcxOTE@._V1_SX300.jpg"
        },
        {
          "Title": "Meat Loaf: Bat Out of Hell II - Picture Show",
          "Year": "1994",
          "imdbID": "tt0364980",
          "Type": "movie",
          "Poster": "N/A"
        },
        {
          "Title": "Crimson Bat, the Blind Swordswoman",
          "Year": "1969",
          "imdbID": "tt0165379",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BNzE5OWU1ZTctZjk5Zi00MTE3LThkZWEtMzBiZDBjODU1ODhhXkEyXkFqcGdeQXVyNjUzNzQ4NDQ@._V1_SX300.jpg"
        },
        {
          "Title": "Legend of the Bat",
          "Year": "1978",
          "imdbID": "tt0079454",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMTJjMjA1ZDAtZmVmNC00YmNhLThkODItNDI0NzM3YWM4YjI1XkEyXkFqcGdeQXVyMjcwNDczMjY@._V1_SX300.jpg"
        },
        {
          "Title": "Bat sei ching mai",
          "Year": "2001",
          "imdbID": "tt0306522",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMTIzMzIwOTk2OF5BMl5BanBnXkFtZTcwNzMzMjAyMQ@@._V1_SX300.jpg"
        },
        {
          "Title": "Bat Without Wings",
          "Year": "1980",
          "imdbID": "tt0080420",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BZjFhNzlhMDctM2VkYy00OTA2LWEzN2MtZjYwZWUzZThiMWYwXkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_SX300.jpg"
        }
      ],
      "totalResults": "192",
      "Response": "True"
    }))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => { },
      removeListener: () => { }
    };
  }
});

afterEach(cleanup)
describe('should MovieList', () => {


  test('should render correctly', async () => {
    const { getByTestId, getAllByLabelText } = render(<MovieList />)
    const search = getAllByLabelText('search')
    const input = getByTestId('search-movie')
    await fireEvent.change(input, { target: { value: 'batman' } })
    await fireEvent.click(search[0])
    await waitFor(async () => {
      history.push = jest.fn()
      const movieCard = getByTestId('movie-idx-0')
      await fireEvent.click(movieCard)
      expect(history.push).toHaveBeenCalledWith('details/Casey at the Bat')
    })
  })


})
