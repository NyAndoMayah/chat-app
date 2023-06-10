import useUser from '@/context/userStore';
import { Box, Button, Card, Modal, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import UserLayout from '../components/UserLayout/UserLayout';

type UserWithDetails = {
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
  currentPassword: string | null;
  password: string | null;
  newPassword: string | null;
  confirmPassword: string | null;
  oldPassword: string | null;
};

const EditProfileForm = ({ setOpen, user }: any) => {
  const { register, handleSubmit } = useForm<UserWithDetails>();
  const { setUser } = useUser();
  const onSubmit: SubmitHandler<UserWithDetails> = (data) => {
    async function updateUser(data: UserWithDetails) {
      if (data.confirmPassword != data.newPassword) {
        alert("Passwords don't correspond, please verify your passwords");
        return;
      } else {
        data.oldPassword = data.currentPassword;
        data.newPassword == ''
          ? (data.password = data.currentPassword)
          : (data.password = data.newPassword);

        try {
          const newUser = {
            id: user.id,
            email: data.email,
            name: data.name,
            bio: data.bio,
            googleId: user.googleId,
            status: user.status,
            token: user.token,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
            image: user.image,
          };
          const headers = {
            Authorization: `Bearer ${window.localStorage.getItem(
              'user_token'
            )}`,
          };
          const response = await axios.put(
            `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_URL}/user`,
            data,
            { headers }
          );
          setUser(newUser);
          setOpen(false);
        } catch (error) {
          console.error(error);
        }
      }
    }
    updateUser(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" component="h2">
        Update your profile
      </Typography>
      <input type="text" defaultValue={user.name} {...register('name')} />
      <input type="email" defaultValue={user.email} {...register('email')} />
      <input
        defaultValue={user.password}
        type="password"
        {...register('currentPassword')}
      />
      <input type="password" {...register('newPassword')} />
      <input type="password" {...register('confirmPassword')} />
      <textarea defaultValue={user.bio} {...register('bio')} />
      <button className="updateProfileButton" type="submit">
        Update Profile
      </button>
    </form>
  );
};
const ProfileModal = ({ open, setOpen, user }: any) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <EditProfileForm user={user} setOpen={setOpen} />
      </Box>
    </Modal>
  );
};
const ProfileContent = () => {
  const { user } = useUser();
  console.log(user);
  const options: any = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const [date, setDate] = useState(
    new Date(user.createdAt).toLocaleDateString(undefined, options)
  );
  const [open, setOpen] = useState(false);
  return (
    <div>
      {open && <ProfileModal open={open} setOpen={setOpen} user={user} />}
      <Card style={{ padding: '2vw' }}>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '15px',
          }}
        >
          <Box
            style={{
              width: '200px',
              height: '200px',
              overflow: 'hidden',
              borderRadius: '5px',
            }}
          >
            <Image
              src="/images/profile.png"
              height={200}
              width={200}
              alt="Profile picture"
            />
          </Box>
          <Box display="flex" flexDirection="column" margin="15px">
            <Typography variant="h3" component="div">
              {user.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {user.bio}
            </Typography>
          </Box>
        </Box>
        <Box style={{ margin: '15px' }}>
          <Typography sx={{ mb: 0.25 }} color="text.secondary">
            Email
          </Typography>
          <Typography sx={{ mb: 1.5 }}>{user.email}</Typography>
          <Typography sx={{ mb: 0.75 }} color="text.secondary">
            Member since
          </Typography>
          <Typography sx={{ mb: 0.25 }}>{date}</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            style={{
              float: 'right',
              backgroundColor: 'black',
              color: ' white',
              width: '200px',
            }}
            onClick={() => setOpen(true)}
          >
            Edit profile
          </Button>
        </Box>
      </Card>
    </div>
  );
};
export default function Profile() {
  return <UserLayout mainElements={<ProfileContent />} />;
}
