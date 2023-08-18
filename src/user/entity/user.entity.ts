export enum USER_ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
  ROOT = 'ROOT',
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: number;
  role: USER_ROLE;
}
