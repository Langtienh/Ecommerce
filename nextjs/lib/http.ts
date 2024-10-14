import envConfig from '@/config'

export interface ReponsePayload {
  message: string
  statusCode: number
}

export class Reponse {
  message: string
  statusCode: number
  constructor(payload: ReponsePayload) {
    this.message = payload.message
    this.statusCode = payload.statusCode
  }
}

export interface ReponseSuccessPayload<T> extends ReponsePayload {
  data: T
}

export class ReponseSuccess<T> extends Reponse {
  data: T
  constructor(payload: ReponseSuccessPayload<T>) {
    super(payload)
    this.data = payload.data
  }
}

export interface ReponseErrorPayload extends ReponsePayload {
  error: string
}

export class ReponseError extends Error {
  error: string
  statusCode: number
  constructor(payload: ReponseErrorPayload) {
    super(payload.message)
    this.error = payload.error
    this.statusCode = payload.statusCode
  }
}

export interface EntityErrorPayload extends ReponseErrorPayload {
  constraints: Record<string, string>
}

export class EntityError extends ReponseError {
  constraints: Record<string, string>
  constructor(payload: EntityErrorPayload) {
    super(payload)
    this.constraints = payload.constraints
  }
}

interface CustomRequestInit extends RequestInit {
  baseUrl?: string
}

const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  option?: CustomRequestInit
) => {
  const body = option?.body ? JSON.stringify(option.body) : undefined

  const baseHeaders = {
    'Content-Type': 'application/json'
  }
  const baseUrl = option?.baseUrl || envConfig.NEXT_PUBLIC_API_URL

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  const res = await fetch(fullUrl, {
    method,
    body,
    headers: {
      ...baseHeaders,
      ...option?.headers
    }
  })
  const payload: ReponsePayload = await res.json()
  if (!res.ok) {
    if (res.status === 422) throw new EntityError(payload as EntityErrorPayload)
    throw new ReponseError(payload as ReponseErrorPayload)
  }
  return payload as ReponseSuccessPayload<T>
}

type NoBody = Omit<CustomRequestInit, 'body'>
const http = {
  get: <T>(url: string, option?: NoBody) => request<T>('GET', url, option),
  post: <T>(url: string, body: any, option?: NoBody) => request<T>('POST', url, { ...option, body }),
  put: <T>(url: string, body: any, option?: NoBody) => request<T>('PUT', url, { ...option, body }),
  patch: <T>(url: string, body: any, option?: NoBody) => request<T>('PATCH', url, { ...option, body }),
  delete: <T>(url: string, option?: NoBody) => request<T>('DELETE', url, option)
}

export default http
