export interface BaseReponse {
  message: string;
  statusCode: number;
}

export interface ReponseSuccess<T> extends BaseReponse {
  data: T;
}

export interface ReponseError extends BaseReponse {
  error: string;
}

export interface RegisterReponse {
  user: User;
  refreshToken: string;
  accessToken: string;
}
