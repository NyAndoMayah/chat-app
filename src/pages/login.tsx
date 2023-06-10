import Layout from '@/components/Layout';
import useUser from '@/context/userStore';
import { Box, Card, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
type InputValues = {
  email: string;
  password: string;
};
type CommonInputProps = {
  placeholder: string;
  label: string;
  registerField: 'email' | 'password';
  type: 'password' | 'text';
};

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<InputValues>();
  const { user, setUser } = useUser();
  const onSubmit: SubmitHandler<InputValues> = (data) => {
    async function logIn(data: InputValues) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_URL}/users/login`,
          data
        );
        console.log(response.data);
        if (response.data.user.token) {
          window.localStorage.setItem('user_token', response.data.user.token);
          setUser(response.data.user);
        }
        router.push(`/profile`).catch((error) => console.log(error));
      } catch (error) {
        console.error(error);
        alert('Cannot login, check your informations');
      }
    }
    logIn(data);
  };

  const LoginForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%) translateX(-50%)',
            left: '50%',
          }}
        >
          <Card
            style={{
              display: 'flex',
              width: '300px',
              height: '350px',
              opacity: '0.8',
            }}
          >
            <Box
              m="auto"
              display="flex"
              justifyContent="space-around"
              flexDirection="column"
            >
              <Image
                src="/images/login.png"
                style={{
                  borderRadius: '9999px',
                  margin: 'auto',
                  marginBottom: '2vw',
                  display: 'flex',
                  alignItems: 'center',
                }}
                height={70}
                width={70}
                alt="Your avatar"
              />
              <input
                type="email"
                placeholder="Your email"
                {...register('email', { required: true })}
              />
              <input
                type="password"
                placeholder="Your password"
                {...register('password', { required: true })}
              />
              <button
                className="loginButton"
                type="submit"
                style={{
                  margin: '0.5vw',
                  backgroundColor: '#72289B',
                  color: 'white',
                }}
              >
                Login
              </button>
              <Typography m="auto">
                Not signed up? Try to <Link href="/sign-up">sign up</Link>
              </Typography>
            </Box>
          </Card>
        </Box>
      </form>
    );
  };

  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
}
