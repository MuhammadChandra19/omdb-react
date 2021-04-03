
import { history } from '@app/utils/redux/store';
import { render, cleanup, fireEvent, waitFor } from '@app/utils/test/test-utils';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import React from 'react';
// import { debug } from 'webpack';

import MovieList from '../index'
import { searchMovieList } from './data';

const server = setupServer(
  rest.get('http://www.omdbapi.com?s=batman', (req, res, ctx) => {
    return res(ctx.json(searchMovieList))
  }))

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn()
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
