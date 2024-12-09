interface ICookieOption {
  httpOnly?: boolean | undefined
  secure?: boolean | undefined
  domain?: string | undefined
  expires?: number | Date | undefined
  maxAge?: number | undefined
  sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined
  path?: string | undefined
  priority?: 'low' | 'medium' | 'high' | undefined
}

interface ISetCookieOption extends ICookieOption {
  name: string
  value: string
}
