
export interface IntLogin {
  username: string,
  password: string,
  role: string
}

export interface Authlogin {
  token: string | null,
  userId: string | null,
}
