import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import { useGlobal } from 'context/GlobalContext';

export default function BackDropNotification() {
  const [open, setOpen] = React.useState(false);
  const {showBackdrop} = useGlobal();
  const handleClose = () => {
    setOpen(false);
    console.log("BackDrop notification off");

  };
  useEffect(() => {
    setOpen(showBackdrop);
    console.log("BackDrop notification triggered");
  }, []); // 


  return (
    <div>
    
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}