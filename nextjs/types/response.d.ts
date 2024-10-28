interface LoginReponse {
  user: User
  refreshToken: string
  accessToken: string
}

interface RegisterReponse extends LoginReponse {
  verifyEmailToken: string
}

interface ForgotPasswordReponse {
  token: string
}
