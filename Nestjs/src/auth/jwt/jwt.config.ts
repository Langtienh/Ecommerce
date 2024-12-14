import { TOKEN_TYPE } from '../entities/token.entity'

export const CONFIG_TOKEN: Record<TOKEN_TYPE, { secret: string; expiresIn: string }> = {
  access: {
    secret: 'JWT_ACCESS_TOKEN_SECRET',
    expiresIn: 'JWT_ACCESS_TOKEN_EXPIRES'
  },
  refresh: {
    secret: 'JWT_REFRESH_TOKEN_SECRET',
    expiresIn: 'JWT_REFRESH_TOKEN_EXPIRES'
  },
  verify_email: {
    secret: 'JWT_VERIFY_EMAIL_SECRET',
    expiresIn: 'JWT_VERIFY_EMAIL_EXPIRES'
  },
  reset_password: {
    secret: 'JWT_FORGOT_PASSWORD_SECRET',
    expiresIn: 'JWT_FORGOT_PASSWORD_EXPIRES'
  }
}
