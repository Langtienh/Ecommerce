import { User } from './entity/user'

export interface RegisterReponse {
  user: User
  refreshToken: string
  accessToken: string
}

export interface LoginReponse extends RegisterReponse {}
