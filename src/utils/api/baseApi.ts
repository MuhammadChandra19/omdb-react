import axios from 'axios';
import { toCamelCase, toQueryString } from './converter';
export const baseApi = () => {
  const _baseRequest = async function <T>(url: string): Promise<T> {
    const resultFetch = await axios.get(url)
    if (resultFetch.status === 200) {
      return resultFetch.data as unknown as T
    }
    return Promise.reject()
  }

  const makeRequest = async function <T>(data: any = {}): Promise<T> {
    let queryString = toQueryString(data)
    let obj = await _baseRequest('http://www.omdbapi.com' + queryString);
    return toCamelCase(obj)
  }

  return {
    makeRequest
  }
}
