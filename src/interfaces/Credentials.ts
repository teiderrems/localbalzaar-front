export interface Credentials {
  email?:string | null;
  password?:string | null;
}

export interface LoginResponse{
  access_token:string;
  refresh_token:string;
}
