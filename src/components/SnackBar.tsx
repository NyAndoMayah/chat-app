import { Alert } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
type SnackBarProps = {
  message: string;
  open: boolean;
};
const SnackBar = (props: SnackBarProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const { message, open } = props;
  const handleClose = (e: Event | SyntheticEvent<any, Event>) => {
    e.preventDefault();
    setIsOpened(open);
  };

  return (
    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
      {message}
    </Alert>
  );
};
export default SnackBar;
