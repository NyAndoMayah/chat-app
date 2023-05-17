import Layout from '@/components/Layout';
import { Box, Button, Card, TextField } from '@mui/material';
import Image from 'next/image';
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
  const onSubmit: SubmitHandler<InputValues> = (data) => {
    window.localStorage.setItem('user_infos', JSON.stringify(data));
    router.push('/chat').catch((error) => console.log(error));
  };
  const CommonInput = ({
    placeholder,
    label,
    registerField,
    type,
  }: CommonInputProps) => {
    return (
      <TextField
        style={{ backgroundColor: 'white', margin: '0.5vw' }}
        type={type}
        size="small"
        placeholder={placeholder}
        label={label}
        {...register(registerField, { required: true })}
      />
    );
  };
  return (
    <Layout>
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
              <CommonInput
                type="text"
                placeholder="Your email"
                label="Email"
                registerField="email"
              />
              <CommonInput
                type="password"
                placeholder="Your password"
                label="Password"
                registerField="password"
              />
              <Button
                style={{
                  margin: '0.5vw',
                  backgroundColor: '#72289B',
                  color: 'white',
                }}
                type="submit"
              >
                Login
              </Button>
            </Box>
          </Card>
        </Box>
      </form>
    </Layout>
  );
}
