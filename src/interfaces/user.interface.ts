
export enum USER_ROLE {
    ADMIN = 'ADMIN',
    USER = 'USER',
    ROOT = 'ROOT',
  }

export interface IUser {
    id_d:number;
    name: string;
    email: string;
    phone: string;
    role: USER_ROLE;
    password: string
}