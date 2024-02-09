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

  interface ISocketEmitArgs<T extends {}> {
    event: string;
    data?: T;
  }

  interface ISocketData<T extends {}> {
    code: int;
    message: string;
    errors: object;
    data: T;
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

  type TCommunityStatus = 'active' | 'inactive';
  interface ICommunity {
    id: string;
    owner_id: string;
    title: string;
    description: string;
    status: TCommunityStatus;
    created_at: string;
    updated_at: string;
    owner?: IUserShort;
    users?: IUserShort[];
    events?: IEvent[];
  }

  type TEventStatus = 'pending' | 'started' | 'finished';
  interface IEvent {
    id: string;
    community_id: string;
    title: string;
    description: string;
    duration: number;
    status: TEventStatus;
    start_at: string;
    created_at: string;
    updated_at: string;
    community?: ICommunity;
  }

  type TRoomMode = 'private' | 'public';
  type TRoomAccess = 'owner' | 'member';

  interface IRoom {
    id: string;
    owner_id: string;
    title: string;
    description: string;
    mode: TRoomMode;
    access: TRoomAccess;
    created_at: string;
    updated_at: string;
    users?: IUserShort[];
    messages?: IMessage[];
  }

  type TMessageType = 'text' | 'link' | 'image' | 'video' | 'file';

  interface IMessage {
    id: string;
    room_id: string;
    content: string;
    type: TMessageType;
    created_at: string;
    updated_at: string;
    user: IUserShort;
  }
}
