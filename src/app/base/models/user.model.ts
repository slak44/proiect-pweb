export enum UserType {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: number;
  username: string;
  picture?: string;
  email: string;
  type: UserType;
  isUserVerified: boolean;
  isEnabled: boolean;
}
