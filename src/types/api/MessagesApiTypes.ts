import { LoggedUser } from './UserApiTypes';

export type MessageWithDetails = {
  id: number | null;
  createdAt: string;
  updatedAt: string;
  sender: LoggedUser;
  senderId: number | null;
  channelId: number | null;
  recipientId: number | null;
  content: string;
};
export type CreateMessage = {
  senderId: number | null;
  channelId: number | null;
  recipientId: number | null;
  content: string;
};
