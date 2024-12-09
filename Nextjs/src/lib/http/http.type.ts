export interface ResponsePayload {
  message: string
  statusCode: number
}

export class Response {
  message: string
  statusCode: number
  constructor(payload: ResponsePayload) {
    this.message = payload.message
    this.statusCode = payload.statusCode
  }
}

export interface ResponseSuccessPayload<T> extends ResponsePayload {
  data: T
}

export class ResponseSuccess<T> extends Response {
  data: T
  constructor(payload: ResponseSuccessPayload<T>) {
    super(payload)
    this.data = payload.data
  }
}

export interface ResponseErrorPayload extends ResponsePayload {
  error: string
}

export class ResponseError extends Error {
  error: string
  statusCode: number
  constructor(payload: ResponseErrorPayload) {
    super(payload.message)
    this.error = payload.error
    this.statusCode = payload.statusCode
  }
}

export interface EntityErrorPayload extends ResponseErrorPayload {
  constraints: Record<string, string>
}

export class EntityError extends ResponseError {
  constraints: Record<string, string>
  constructor(payload: EntityErrorPayload) {
    super(payload)
    this.constraints = payload.constraints
  }
}

export interface CustomRequestInit extends RequestInit {
  baseUrl?: string
}
