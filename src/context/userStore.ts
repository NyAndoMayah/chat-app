import create from 'zustand';
import { UserWithDetails } from '../types/api/UserApiTypes';
type State = [user: UserWithDetails];
type Action = {
  setUser: (user: UserWithDetails) => void;
};

interface UserState {
  user: UserWithDetails;
  setUser: (user: UserWithDetails) => void;
}
const useUser = create<UserState>()((set) => ({
  user: {
    id: null,
    email: '',
    name: '',
    bio: '',
    googleId: '',
    status: false,
    token: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
    image: '',
  },
  setUser: (user: UserWithDetails) => set(() => ({ user: user })),
}));
export default useUser;
