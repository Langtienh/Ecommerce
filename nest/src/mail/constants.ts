interface otpData {
  subject: string
  description: string
}

export enum OTP_TYPE {
  restorePassword = 'restorePassword',
  verifyEmail = 'verifyEmail'
}

export const OTP_MESSAGE: Record<OTP_TYPE, otpData> = {
  restorePassword: {
    subject: 'Khôi phục mật khẩu ✔',
    description:
      'Bạn đang đăng nhập vào hệ thống của Lăng Tiến Ecommerce. Sử dụng mã OTP bên dưới để kích hoạt khôi phục mật khẩu. Mã OTP chỉ có hiệu lực trong 15 phút.'
  },
  verifyEmail: {
    subject: 'Xác thực tài khoản ✔',
    description:
      'Bạn đang đăng ký tài khoản trên hệ thống của Lăng Tiến Ecommerce. Sử dụng mã OTP bên dưới để xác thực email. Mã OTP chỉ có hiệu lực trong 15 phút.'
  }
}
