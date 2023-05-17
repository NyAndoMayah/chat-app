import Layout from '@/components/Layout';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

type InputValues = {
  username: string;
  bio: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type CommonInputProps = {
  placeholder: string;
  label: string;
  registerField: 'email' | 'password' | 'username' | 'bio' | 'confirmPassword';
};
export default function SignUp() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<InputValues>();
  const onSubmit: SubmitHandler<InputValues> = (data) => {
    window.localStorage.setItem('user_infos', JSON.stringify(data));
    router.push('/chat').catch((error) => console.log(error));
  };
  const CommonInput = ({
    placeholder,
    label,
    registerField,
  }: CommonInputProps) => {
    return (
      <TextField
        style={{ backgroundColor: 'white', margin: '0.5vw' }}
        type="text"
        size="small"
        placeholder={placeholder}
        label={label}
        {...register(registerField, { required: true })}
      />
    );
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
        <Typography variant="h3" style={{}}>
          ChatBliss
        </Typography>
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

              <CommonInput
                placeholder="Your username"
                label="Username"
                registerField="username"
              />
              <CommonInput
                placeholder="Your email"
                label="Email"
                registerField="email"
              />
              <CommonInput
                placeholder="Your password"
                label="Password"
                registerField="password"
              />
              <CommonInput
                placeholder="Confirm your password"
                label="Confirm"
                registerField="confirmPassword"
              />
              <Button
                style={{
                  margin: '0.5vw',
                  backgroundColor: '#72289B',
                  color: 'white',
                }}
                type="submit"
              >
                Submit
              </Button>
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
