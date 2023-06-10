import { Channel } from '@/types/api/ChannelApiTypes';
import create from 'zustand';

type State = [channel: Channel];
type Action = {
  setchannel: (channel: Channel) => void;
};

interface channelState {
  channel: Channel;
  setchannel: (channel: Channel) => void;
}
const useChannel = create<channelState>()((set) => ({
  channel: {
    channelId: null,
    channelName: '',
    channelOwnerId: null,
    channelOwner: null,
    updatedAt: '',
    createdAt: '',
  },

  setchannel: (channel: Channel) => set(() => ({ channel: channel })),
}));
export default useChannel;
