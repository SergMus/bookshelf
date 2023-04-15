export interface IUser {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

export interface IUserEndponit {
  data: IUser;
}
