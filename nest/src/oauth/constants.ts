export interface OauthGoogleUser {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
}

export interface OauthGithubUser {
  id: number
  avatar_url: string
  name: string
  email: string
}

export interface OauthGithubGetTokenResponse {
  access_token: string
  token_type: string
  scope: string
}
