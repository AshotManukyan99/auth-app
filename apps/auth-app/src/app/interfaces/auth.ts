export interface RegisterPostData {
  email: string;
  password: string;
}

export interface User extends RegisterPostData {
  id?: string;
}
