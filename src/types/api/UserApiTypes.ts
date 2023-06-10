export type CreateUser = {
  email: string;
  password: string;
  name: string;
  bio: string | null;
};
export type UserWithDetails = {
  status: boolean;
  id: number | null;
  email: string;
  name: string;
  bio: string | null;
  updatedAt: string | null;
  createdAt: string;
  deletedAt: string | null;
  googleId: string;
  token: string;
  image: string | null;
};
export type LoggedUser = {
  id: number | null;
  email: string;
  name: string;
};
