import { LoggedUser } from './UserApiTypes';

export type CreateChannel = {
  channelName: string | null;
  channelType: string | null;
  channelMembers: number[] | null;
};
export type Channel = {
  channelId: number | null;
  channelName: string | null;
  channelOwnerId: number | null;
  channelOwner: LoggedUser | null;
  updatedAt: string | null;
  createdAt: string | null;
};
