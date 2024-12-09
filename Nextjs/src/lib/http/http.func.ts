import envConfig from '@/config/envConfig'
import {
  CustomRequestInit,
  EntityError,
  EntityErrorPayload,
  ResponseError,
  ResponseErrorPayload,
  ResponsePayload,
  ResponseSuccessPayload
} from './http.type'

const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  option?: CustomRequestInit
) => {
  const body = option?.body ? JSON.stringify(option.body) : undefined

  const baseHeaders = {
    'Content-Type': 'application/json'
  }
  const baseUrl = option?.baseUrl !== undefined ? option?.baseUrl : envConfig.NEXT_PUBLIC_API_URL

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  const res = await fetch(fullUrl, {
    method,
    body,
    headers: {
      ...baseHeaders,
      ...option?.headers
    }
  })
  const payload: ResponsePayload = await res.json()
  if (!res.ok) {
    if (res.status === 422) throw new EntityError(payload as EntityErrorPayload)
    throw new ResponseError(payload as ResponseErrorPayload)
  }
  return payload as ResponseSuccessPayload<T>
}

export type NoBody = Omit<CustomRequestInit, 'body'>
export const http = {
  get: <T>(url: string, option?: NoBody) => request<T>('GET', url, option),
  post: <T>(url: string, body: any, option?: NoBody) =>
    request<T>('POST', url, { ...option, body }),
  put: <T>(url: string, body: any, option?: NoBody) => request<T>('PUT', url, { ...option, body }),
  patch: <T>(url: string, body: any, option?: NoBody) =>
    request<T>('PATCH', url, { ...option, body }),
  delete: <T>(url: string, option?: NoBody) => request<T>('DELETE', url, option)
}
