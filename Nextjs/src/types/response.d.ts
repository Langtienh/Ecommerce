interface LoginResponse {
  user: User
  refreshToken: string
  accessToken: string
}

interface RegisterResponse extends LoginResponse {
  verifyEmailToken: string
}

interface ForgotPasswordResponse {
  forgotPasswordToken: string
}
