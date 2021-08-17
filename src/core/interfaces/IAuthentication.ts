export interface IValidatorLoginRequest {
  login: string;
  password: string;
}

export interface IDBAuthenticationLogin {
  login: string;
  password: string;
  secret: string;
}
