import { FormErrors } from '@mantine/form';
import { SetStateAction } from 'react';

export declare global {
  declare module '*.png' {
    const value: any;
    export = value;
  }

  type MakeRequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

  interface ICallRequestResponse {
    message: string;
    errors: SetStateAction<FormErrors>;
    data: object;
    success: boolean;
    unprocessable: boolean;
    internalError: boolean;
  }

  interface ITokens {
    access_token: string;
    refresh_token: string;
    expires_at: string;
  }

  interface IUser {
    id: string;
    email: string;
    name: string;
    created_at: string;
    updated_at: string;
  }

  interface IUserShort {
    id: string;
    email: string;
    name: string;
  }

  interface ICommunity {
    id: string;
    owner_id: string;
    title: string;
    description: string;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
    owner?: IUserShort;
    users?: IUserShort[];
  }
}
