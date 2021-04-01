import { camelCase } from 'change-case'

export function toQueryString(queryParams: any): string {
  let querystring = ''
  if (queryParams) {
    querystring = `?${Object.keys(queryParams).map((key, i) => `&${key}=${queryParams[key]}`).join('')}`
  }
  return querystring
}

export function toCamelCase<T extends any>(obj: any): T {
  if (typeof obj != 'object') {
    return obj
  }
  if (Array.isArray(obj)) {
    let arr = obj as Array<any>
    return arr.map((item: any) => toCamelCase(item)) as any
  } else {
    let newObj: any = {}
    Object.keys(obj).forEach(key => {
      let value = obj[key]
      let newKey = camelCase(key)
      let newVal = value && toCamelCase(obj[key])
      newObj[newKey] = newVal
    })
    return newObj
  }
}
