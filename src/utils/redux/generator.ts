import { Dict, SingleReducer } from '../types';
import { Action } from './action'

export function reducerGenerators(initialState: any, reducer: Dict<SingleReducer<any>>) {
  return (state = initialState, action: Action) => {
    return reducer[action.type]
      ? reducer[action.type](state, action.payload)
      : state;
  }
}