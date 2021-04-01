import axios from 'axios';
export const baseApi = () => {
  const makeRequest = async function <T>(url: string): Promise<T> {
    const resultFetch = await axios.get(url)
    if (resultFetch.status === 200) {
      return resultFetch as unknown as T
    }
    return Promise.reject()
  }

  return {
    makeRequest
  }
}
