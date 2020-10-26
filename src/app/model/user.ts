import { UserAttribute } from './user-attribute';

export class User {
  username: string;
  email: string;
  password: string;
  accountState: AccountState;
  userAttributes: UserAttribute[];
}

export enum AccountState {
  Activating = 0,
  Active = 1,
  Locked = 2
}
