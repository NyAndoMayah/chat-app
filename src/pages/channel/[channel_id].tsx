import { Box, Card, Drawer, Typography } from '@mui/material';
import axios from 'axios';
import UserLayout from '../../components/UserLayout/UserLayout';

const ChannelInfo = ({ infos }: any) => {
  return <></>;
};
const ChannelContent = ({ channelData }: any) => {
  return (
    <Card>
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              position: 'absolute',
              top: '50px',
            },
          }}
          open
        >
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4">{channelData.name}</Typography>
            <Typography variant="h6">TYpe</Typography>
            <Typography>{channelData.type}</Typography>
            <Typography variant="h6">Owner</Typography>
            <Typography>{channelData.owner.name}</Typography>
          </Box>
        </Drawer>
      </Box>
    </Card>
  );
};
const ChannelLayout = ({ channelData }: any) => {
  return (
    <UserLayout
      mainElements={<ChannelContent channelData={channelData} />}
    ></UserLayout>
  );
};
export async function getStaticPaths() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_URL}/channels`
  );
  const ids = res.data.channels.map((channel: any) => {
    params: {
      channel_id: '' + channel?.id;
    }
  });
  console.log(ids);
  return { ids, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_URL}/channels/${params.id}`
  );
  const channelData = res.data.channel;
  return {
    props: {
      channelData,
    },
  };
}
export default ChannelLayout;
