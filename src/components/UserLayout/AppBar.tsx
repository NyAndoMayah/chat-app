import { AccountCircle } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import bg from '../../../public/images/login.png';

export default function UserAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '50px',
        }}
      >
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            ChatBliss
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link href="/profile">
              <AccountCircle />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
