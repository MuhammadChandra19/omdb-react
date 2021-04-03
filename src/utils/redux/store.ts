import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
  ReducersMapObject,
  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History, createMemoryHistory } from 'history';
import { CommonState } from '@app/domain/common/redux/states';
import { CommonReducer } from '@app/domain/common/redux/reducers';
import { MoviesState } from '@app/domain/movies/redux/states';
import { MoviesReducer } from '@app/domain/movies/redux/reducers';

export interface AppState {
  common: CommonState
  moviesState: MoviesState
}


const logger: Middleware = () => (next) => (action) => {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    console.log(action);
  }
  return next(action);
};

export const rootReducer: ReducersMapObject<AppState, any> = {
  common: new CommonReducer().build(),
  moviesState: new MoviesReducer().build()
}

export function configureStore(): Store<AppState> {
  let middleware = applyMiddleware(logger);

  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    middleware = composeWithDevTools(middleware);
  }


  return createStore(
    combineReducers<AppState>(rootReducer),
    middleware,
  )
}

export const history: History = createMemoryHistory({ initialIndex: 0 });

export const AppStore = configureStore();
