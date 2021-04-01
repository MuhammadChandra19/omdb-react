export type SingleReducer<T> = (state: T, payload?: any) => T
export type Dict<T> = Record<string, T>

export type BaseParams = {
  apiKey: string
}