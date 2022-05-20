export enum UserType {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface AppUser {
  id: string;
  username: string;
  picture?: string;
  email: string;
  type: UserType;
  isUserVerified: boolean;
  isEnabled: boolean;
}
