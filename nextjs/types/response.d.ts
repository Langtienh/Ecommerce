import { User } from './entity/user'

export interface LoginReponse {
  user: User
  refreshToken: string
  accessToken: string
}

export interface RegisterReponse extends LoginReponse {
  verifyEmailToken: string
}

export interface ForgotPasswordReponse {
  token: string
}
