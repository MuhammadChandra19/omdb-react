import { Dict, SingleReducer } from '../types'
import { reducerGenerators } from './generator'

export abstract class Reducer<T> {
  public readonly initialState: T

  constructor(state: T) {
    this.initialState = state
  }

  public build(): any {
    return reducerGenerators(this.initialState, this.actions)
  }

  public abstract get actions(): Dict<SingleReducer<T>>
}
