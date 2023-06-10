import UserLayout from '@/components/UserLayout/UserLayout';
import { Box, Card, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MultiSelect } from 'react-multi-select-component';
const MultipleInputBox = () => {
  const { register, handleSubmit } = useForm();
  const [options, setOptions] = useState([]);
  const [members, setMembers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getUsers() {
      try {
        const headers = {
          Authorization: `Bearer ${window.localStorage.getItem('user_token')}`,
        };
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_URL}/users`,
          { headers }
        );
        setOptions(
          res.data.users.map((user: any) => {
            return { value: user?.id, label: user?.name };
          })
        );
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, []);
  const onSubmit = async (data: any) => {
    console.log(members);
    const newChannel = {
      name: data.channelName,
      type: data.type,
      members: members.map((member: any) => member?.value),
    };
    const headers = {
      Authorization: `Bearer ${window.localStorage.getItem('user_token')}`,
    };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_URL}/channel`,
      newChannel,
      { headers }
    );
    router.push(`/channel/${'' + res.data.channel.id}`);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <Typography>Name</Typography>
      <input
        type="text"
        placeholder="Name of your channel"
        {...register('channelName', { required: true })}
        style={{ margin: '10px 0' }}
      />
      <Typography>Type</Typography>
      <select
        {...register('type', { required: true })}
        style={{ margin: '10px 0' }}
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <Typography>Members</Typography>
      <MultiSelect
        options={options}
        value={members}
        onChange={setMembers}
        labelledBy="Select member(s)..."
      />
      <button style={{ margin: '10px 0' }} className="createChannelButton">
        Create Channel
      </button>
    </form>
  );
};
const EditChannelForm = () => {
  return (
    <div>
      <Card
        style={{
          padding: '2vw',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h5" color="inherit" component="div">
          Create channel
        </Typography>
        <Box
          style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}
        >
          <MultipleInputBox />
        </Box>
      </Card>
    </div>
  );
};
export default function CreateChannel() {
  return <UserLayout mainElements={<EditChannelForm />} />;
}
