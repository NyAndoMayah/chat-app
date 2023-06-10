import useUser from '@/context/userStore';
import { Add, Group } from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type SidebarProps = {
  mainElement: React.ReactNode;
};
const drawerWidth = 240;
export default function Sidebar(props: SidebarProps) {
  const { user } = useUser();
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    async function getChannels() {
      const headers = {
        Authorization: `Bearer ${window.localStorage.getItem('user_token')}`,
      };

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_URL}/channels`,
        { headers }
      );
      setChannels(res.data.channels);
    }
    getChannels();
    console.log(channels);
  }, []);
  const drawer = (
    <div>
      <List
        sx={{
          width: drawerWidth,
          bgcolor: 'background.paper',
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItem key="Channels" disablePadding>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary="Channel" />
          <Link href="/channel/create">
            <ListItemIcon>
              <Add />
            </ListItemIcon>
          </Link>
        </ListItem>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{ width: drawerWidth, bgcolor: 'background.paper' }}
          >
            {channels.map((channel: any, index: number) => {
              return (
                <ListItemButton key={index}>
                  <Link href={`/channel/${channel.id}`}>
                    <ListItemText primary={channel.name} />
                  </Link>
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </List>
    </div>
  );
  const directMessages = () => {
    const router = useRouter();
    router.push(`/message/${user.id}`).catch((error) => console.log(error));
  };
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Toolbar />

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
          <Box sx={{ overflow: 'hidden' }}>
            {drawer} <Divider />
            <Button
              style={{
                backgroundColor: '#72289B',
                position: 'absolute',
                bottom: '60px',
                left: '20px',
                color: ' white',
                width: '200px',
              }}
              onClick={directMessages}
            >
              Direct Messages
            </Button>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            position: 'absolute',
            left: `${drawerWidth}px`,
          }}
        >
          {props.mainElement}
        </Box>
      </Box>
    </div>
  );
}
