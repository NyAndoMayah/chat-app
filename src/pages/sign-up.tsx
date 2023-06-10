import Layout from '@/components/Layout';
import useUser from '@/context/userStore';
import { Box, Card, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

type InputValues = {
  name: string;
  bio: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function registrationForm() {
  const { setUser } = useUser();
  const router = useRouter();
  const { register, handleSubmit } = useForm<InputValues>();
  const onSubmit: SubmitHandler<InputValues> = (data) => {
    async function signUp(data: InputValues) {
      try {
        data.bio = '';
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_URL}/users`,
          data
        );
        console.log(response.data);
        if (response.data.token) {
          window.localStorage.setItem('user_token', response.data.user.token);
          setUser(response.data.user);
        }
        const logged = await axios.post(
          `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_URL}/users/login`,
          data
        );
        window.localStorage.setItem('user_token', logged.data.user.token);
        router.push(`/profile`).catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }
    signUp(data);
  };
  return (
    <Layout>
      <Box
        style={{
          position: 'absolute',
          left: '39%',
          width: '65vw',
          height: '100vh',
          backgroundColor: 'black',
          opacity: '0.8',
        }}
      ></Box>
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-45%) translateX(90%)',
          left: '50%',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/woman-smile.png"
          alt="Your avatar"
          width={394}
          height={592}
        />
      </Box>
      <Box
        style={{
          position: 'absolute',
          margin: 'auto',
          top: '50%',
          transform: 'translateY(-50%) translateX(-25%)',
          left: '50%',
          height: '70vh',
          width: '37vw',
          color: 'white',
          padding: '2vw',
        }}
      >
        <Typography variant="h3">ChatBliss</Typography>
        <Typography variant="h6">
          Experience the Bliss of Communication with ChatBliss!
          <br />
          Are you ready to discover a whole new level of joy in your
          conversations? Look no further than ChatBliss, the ultimate chat app
          designed to revolutionize your communication experience. Say goodbye
          to mundane chats and embrace a world of vibrant and engaging
          interactions.
        </Typography>
      </Box>
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%) translateX(-150%)',
          left: '50%',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card
            style={{
              display: 'flex',
              width: '400px',
              height: '450px',
              opacity: '0.8',
            }}
          >
            <Box
              m="auto"
              display="flex"
              justifyContent="space-around"
              flexDirection="column"
            >
              <Typography variant="h4" m="auto">
                Sign Up
              </Typography>
              <input
                type="text"
                style={{ backgroundColor: 'white', margin: '0.5vw' }}
                placeholder="Your username"
                {...register('name', { required: true })}
              />
              <input
                type="email"
                style={{ backgroundColor: 'white', margin: '0.5vw' }}
                placeholder="Your email"
                {...register('email', { required: true })}
              />
              <input
                type="password"
                style={{ backgroundColor: 'white', margin: '0.5vw' }}
                placeholder="Your password"
                {...register('password', { required: true })}
              />
              <input
                type="password"
                style={{ backgroundColor: 'white', margin: '0.5vw' }}
                placeholder="Confirm your password"
                {...register('confirmPassword', { required: true })}
              />
              <button
                className="registerButton"
                style={{
                  margin: '0.5vw',
                  backgroundColor: '#72289B',
                  color: 'white',
                }}
                type="submit"
              >
                Register
              </button>
              <Typography m="auto">
                Already signed up? Try to <Link href="/login">login</Link>
              </Typography>
            </Box>
          </Card>
        </form>
      </Box>
    </Layout>
  );
}
